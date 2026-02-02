import { createClient } from '@sanity/client';
import computerEaseConfig from './computerease-config.js';

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

/**
 * Update payment status in ComputerEase via API
 */
async function updateComputerEaseAPI(invoiceData) {
  const { baseUrl, username, password, apiKey } = computerEaseConfig.api;

  try {
    // Build authentication header
    const authHeader = apiKey 
      ? { 'Authorization': `Bearer ${apiKey}` }
      : { 'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}` };

    // Update invoice in ComputerEase
    // Note: Actual endpoint may vary - check ComputerEase API docs
    const response = await fetch(`${baseUrl}/invoices/${invoiceData.computerEaseInvoiceId}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({
        paymentDate: invoiceData.paidAt,
        amount: invoiceData.amount,
        paymentMethod: 'Credit Card - Online',
        reference: invoiceData.stripePaymentIntentId,
        notes: `Paid online via website - Stripe Payment Intent: ${invoiceData.stripePaymentIntentId}`
      }),
      timeout: computerEaseConfig.api.timeout,
    });

    if (!response.ok) {
      throw new Error(`ComputerEase API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating ComputerEase:', error);
    throw error;
  }
}

/**
 * Main handler - Update ComputerEase after payment
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { invoiceId, paymentIntentId } = req.body;

    if (!invoiceId || !paymentIntentId) {
      return res.status(400).json({ 
        error: 'Invoice ID and Payment Intent ID are required' 
      });
    }

    // Get invoice from Sanity
    const invoice = await sanityClient.fetch(
      `*[_type == "invoice" && _id == $invoiceId][0]{
        _id,
        invoiceNumber,
        customerName,
        amount,
        computerEaseInvoiceId,
        stripePaymentIntentId,
        paidAt,
        syncedFromComputerEase
      }`,
      { invoiceId }
    );

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Skip if not synced from ComputerEase
    if (!invoice.syncedFromComputerEase) {
      return res.status(200).json({ 
        message: 'Invoice not from ComputerEase, no sync needed',
        skipped: true 
      });
    }

    // Skip if no ComputerEase ID
    if (!invoice.computerEaseInvoiceId) {
      return res.status(200).json({ 
        message: 'No ComputerEase invoice ID, cannot sync',
        skipped: true 
      });
    }

    // Check if API is configured
    if (!computerEaseConfig.api.baseUrl) {
      console.warn('ComputerEase API not configured, payment not synced back');
      return res.status(200).json({ 
        message: 'API not configured, sync skipped',
        warning: true 
      });
    }

    // Update ComputerEase
    await updateComputerEaseAPI(invoice);

    // Mark as synced in Sanity
    await sanityClient
      .patch(invoiceId)
      .set({ 
        syncedBackToComputerEase: true,
        lastSyncDate: new Date().toISOString()
      })
      .commit();

    return res.status(200).json({
      success: true,
      message: 'Payment synced to ComputerEase',
      invoiceNumber: invoice.invoiceNumber,
    });

  } catch (error) {
    console.error('Payment sync error:', error);
    
    // Don't fail the payment if sync fails - log and continue
    return res.status(200).json({ 
      success: false,
      warning: true,
      message: 'Payment recorded but sync to ComputerEase failed',
      error: error.message 
    });
  }
}
