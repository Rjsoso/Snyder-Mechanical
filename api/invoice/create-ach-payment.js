import Stripe from 'stripe';
import { createClient } from '@sanity/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Create ACH payment: STRIPE_SECRET_KEY is not configured');
    return res.status(503).json({ error: 'Payment service is temporarily unavailable. Please try again later.' });
  }

  try {
    const { invoiceId, accountNumber, routingNumber, accountType, accountHolder, amount: requestedAmount } = req.body;
    
    // Validate required fields
    if (!invoiceId || !accountNumber || !routingNumber || !accountType || !accountHolder) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate routing number (must be 9 digits)
    if (!/^\d{9}$/.test(routingNumber)) {
      return res.status(400).json({ error: 'Invalid routing number. Must be 9 digits.' });
    }
    
    // Validate account number (4-17 digits)
    if (!/^\d{4,17}$/.test(accountNumber)) {
      return res.status(400).json({ error: 'Invalid account number.' });
    }
    
    // Get invoice from Sanity
    const invoice = await sanityClient.fetch(
      `*[_type == "invoice" && _id == $invoiceId][0]{
        _id,
        invoiceNumber,
        customerName,
        customerEmail,
        amount,
        status
      }`,
      { invoiceId }
    );
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Check if invoice is already paid
    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Invoice is already paid' });
    }
    
    // Create Stripe customer
    const customer = await stripe.customers.create({
      name: accountHolder,
      email: invoice.customerEmail,
      metadata: {
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
      },
    });
    
    // Use requested amount (with fees) if provided, otherwise use invoice amount
    const chargeAmount = requestedAmount || Math.round(invoice.amount * 100);

    // Create and confirm Payment Intent for ACH in one step
    // Stripe automatically verifies test routing numbers
    const confirmedIntent = await stripe.paymentIntents.create({
      amount: chargeAmount, // Amount in cents (may include processing fee)
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['us_bank_account'],
      payment_method_data: {
        type: 'us_bank_account',
        us_bank_account: {
          account_number: accountNumber,
          routing_number: routingNumber,
          account_holder_type: 'individual',
          account_type: accountType,
        },
        billing_details: {
          name: accountHolder,
          email: invoice.customerEmail,
        },
      },
      metadata: {
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        originalAmount: Math.round(invoice.amount * 100),
        totalAmount: chargeAmount
      },
      // Confirm immediately (required when using mandate_data)
      confirm: true,
      // ACH requires mandate acceptance
      mandate_data: {
        customer_acceptance: {
          type: 'online',
          online: {
            ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            user_agent: req.headers['user-agent'],
          },
        },
      },
    });
    
    // Update invoice status to "processing"
    await sanityClient
      .patch(invoiceId)
      .set({
        status: 'processing',
        paymentMethod: 'ach',
        stripePaymentIntentId: confirmedIntent.id,
        achProcessingStatus: 'processing',
      })
      .commit();
    
    console.log(`ACH payment initiated for invoice ${invoice.invoiceNumber}`);
    
    return res.status(200).json({
      success: true,
      paymentIntent: {
        id: confirmedIntent.id,
        status: confirmedIntent.status,
      },
      message: 'ACH payment initiated. Processing will take 3-5 business days.',
    });
    
  } catch (error) {
    console.error('ACH payment error:', error);
    
    // Return user-friendly error messages
    let errorMessage = 'Failed to process ACH payment';
    
    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = error.message || 'Invalid payment information';
    } else if (error.code === 'routing_number_invalid') {
      errorMessage = 'Invalid routing number';
    } else if (error.code === 'account_number_invalid') {
      errorMessage = 'Invalid account number';
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
