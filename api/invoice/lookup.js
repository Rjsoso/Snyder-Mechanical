import { createClient } from '@sanity/client';

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
    const { invoiceNumber, email } = req.body;

    // Validate inputs
    if (!invoiceNumber || !email) {
      return res.status(400).json({ 
        error: 'Invoice number and email are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Query Sanity for the invoice
    const query = `*[_type == "invoice" && invoiceNumber == $invoiceNumber][0]{
      _id,
      invoiceNumber,
      customerName,
      customerEmail,
      amount,
      description,
      serviceDate,
      dueDate,
      status,
      lineItems,
      paidAt
    }`;

    const invoice = await sanityClient.fetch(query, { invoiceNumber });

    // Check if invoice exists
    if (!invoice) {
      return res.status(404).json({ 
        error: 'Invoice not found. Please check your invoice number.' 
      });
    }

    // Verify email matches (case-insensitive)
    if (invoice.customerEmail.toLowerCase() !== email.toLowerCase()) {
      return res.status(404).json({ 
        error: 'Invoice not found. Please check your invoice number and email.' 
      });
    }

    // Check if already paid
    if (invoice.status === 'paid') {
      return res.status(200).json({
        invoice,
        alreadyPaid: true,
        message: 'This invoice has already been paid.'
      });
    }

    // Return invoice details
    return res.status(200).json({
      invoice,
      alreadyPaid: false
    });

  } catch (error) {
    console.error('Invoice lookup error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while looking up the invoice. Please try again.' 
    });
  }
}
