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

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.processing':
        // ACH payment initiated and processing
        const processingIntent = event.data.object;
        const processingInvoiceId = processingIntent.metadata.invoiceId;
        
        if (processingInvoiceId) {
          const isACH = processingIntent.payment_method_types.includes('us_bank_account');
          
          if (isACH) {
            await sanityClient
              .patch(processingInvoiceId)
              .set({ 
                status: 'processing',
                achProcessingStatus: 'processing'
              })
              .commit();
            
            console.log(`ACH payment processing for invoice ${processingInvoiceId}`);
          }
        }
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Get invoice ID from metadata
        const invoiceId = paymentIntent.metadata.invoiceId;
        
        if (invoiceId) {
          const isACH = paymentIntent.payment_method_types.includes('us_bank_account');
          
          // Update invoice status in Sanity
          const updateData = {
            status: 'paid',
            paidAt: new Date().toISOString(),
            stripePaymentIntentId: paymentIntent.id
          };
          
          // Add ACH-specific status if applicable
          if (isACH) {
            updateData.achProcessingStatus = 'completed';
          }
          
          await sanityClient
            .patch(invoiceId)
            .set(updateData)
            .commit();
          
          console.log(`Invoice ${invoiceId} marked as paid (${isACH ? 'ACH' : 'Card'})`);

          // Sync payment back to ComputerEase (non-blocking)
          try {
            await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/sync/update-computerease-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                invoiceId,
                paymentIntentId: paymentIntent.id,
              }),
            });
          } catch (syncError) {
            // Log but don't fail webhook if sync fails
            console.error('Failed to sync payment to ComputerEase:', syncError);
          }
        }
        break;

      case 'payment_intent.payment_failed':
        // Handle payment failures (especially important for ACH)
        const failedIntent = event.data.object;
        const failedInvoiceId = failedIntent.metadata.invoiceId;
        
        if (failedInvoiceId) {
          const isACH = failedIntent.payment_method_types.includes('us_bank_account');
          const failureReason = failedIntent.last_payment_error?.message || 'Unknown error';
          
          const updateData = {
            status: 'unpaid'
          };
          
          // Add ACH-specific failure info
          if (isACH) {
            updateData.achProcessingStatus = 'failed';
            updateData.paymentFailureReason = failureReason;
          }
          
          await sanityClient
            .patch(failedInvoiceId)
            .set(updateData)
            .commit();
          
          console.error(`Payment failed for invoice ${failedInvoiceId}: ${failureReason}`);
          
          // TODO: Send email notification to customer about failed payment
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
