import { createClient } from '@sanity/client';
import Stripe from 'stripe';
import { sendPaymentConfirmationEmail } from '../utils/sendEmail.js';

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
    console.error('Confirm payment: STRIPE_SECRET_KEY is not configured');
    return res.status(503).json({ error: 'Payment service is temporarily unavailable. Please try again later.' });
  }

  try {
    const { invoiceId, paymentIntentId } = req.body;

    // Validate inputs
    if (!invoiceId || !paymentIntentId) {
      return res.status(400).json({ 
        error: 'Invoice ID and Payment Intent ID are required' 
      });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment succeeded
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ 
        error: 'Payment has not been completed yet',
        status: paymentIntent.status
      });
    }

    // Update invoice in Sanity
    const updatedInvoice = await sanityClient
      .patch(invoiceId)
      .set({ 
        status: 'paid',
        paidAt: new Date().toISOString(),
        stripePaymentIntentId: paymentIntentId
      })
      .commit();

    // Send confirmation email (non-blocking)
    try {
      await sendPaymentConfirmationEmail({
        customerEmail: updatedInvoice.customerEmail,
        customerName: updatedInvoice.customerName,
        invoiceNumber: updatedInvoice.invoiceNumber,
        amount: updatedInvoice.amount,
        paidAt: updatedInvoice.paidAt,
        paymentIntentId: paymentIntentId,
      });
    } catch (emailError) {
      // Log but don't fail payment confirmation if email fails
      console.error('Failed to send confirmation email:', emailError);
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      invoice: {
        invoiceNumber: updatedInvoice.invoiceNumber,
        amount: updatedInvoice.amount,
        paidAt: updatedInvoice.paidAt
      }
    });

  } catch (error) {
    console.error('Confirm payment error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while confirming the payment. Please contact support.' 
    });
  }
}
