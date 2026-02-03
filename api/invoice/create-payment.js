import { createClient } from '@sanity/client';
import Stripe from 'stripe';

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

  try {
    const { invoiceId, amount: requestedAmount } = req.body;

    // Validate input
    if (!invoiceId) {
      return res.status(400).json({ 
        error: 'Invoice ID is required' 
      });
    }

    // Fetch invoice from Sanity
    const query = `*[_type == "invoice" && _id == $invoiceId][0]{
      _id,
      invoiceNumber,
      customerName,
      customerEmail,
      amount,
      status,
      stripePaymentIntentId
    }`;

    const invoice = await sanityClient.fetch(query, { invoiceId });

    // Check if invoice exists
    if (!invoice) {
      return res.status(404).json({ 
        error: 'Invoice not found' 
      });
    }

    // Check if already paid
    if (invoice.status === 'paid') {
      return res.status(400).json({ 
        error: 'This invoice has already been paid' 
      });
    }

    // If payment intent already exists, return it
    if (invoice.stripePaymentIntentId) {
      try {
        const existingPaymentIntent = await stripe.paymentIntents.retrieve(
          invoice.stripePaymentIntentId
        );
        
        if (existingPaymentIntent.status !== 'succeeded') {
          return res.status(200).json({
            clientSecret: existingPaymentIntent.client_secret,
            paymentIntentId: existingPaymentIntent.id
          });
        }
      } catch (error) {
        // If payment intent not found, create a new one
        console.log('Existing payment intent not found, creating new one');
      }
    }

    // Use requested amount (with fees) if provided, otherwise use invoice amount
    const chargeAmount = requestedAmount || Math.round(invoice.amount * 100);

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: chargeAmount, // Amount in cents (may include processing fee)
      currency: 'usd',
      metadata: {
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customerName,
        customerEmail: invoice.customerEmail,
        originalAmount: Math.round(invoice.amount * 100),
        totalAmount: chargeAmount
      },
      receipt_email: invoice.customerEmail,
      description: `Payment for Invoice ${invoice.invoiceNumber}`
    });

    // Store payment intent ID in Sanity
    await sanityClient
      .patch(invoice._id)
      .set({ stripePaymentIntentId: paymentIntent.id })
      .commit();

    // Return client secret
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Create payment error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while creating the payment. Please try again.' 
    });
  }
}
