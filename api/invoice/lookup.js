import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// Demo invoice for showcasing the payment flow to customers.
// Use invoice number DEMO-99999 with email demo@demo.com to trigger this.
const DEMO_INVOICE = {
  _id: 'demo-invoice-99999',
  invoiceNumber: 'DEMO-99999',
  customerName: 'Demo Customer',
  customerEmail: 'demo@demo.com',
  amount: 1250.00,
  description: 'HVAC system installation and ductwork — demo invoice for showcase purposes only',
  serviceDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: 'unpaid',
  lineItems: [
    { description: 'HVAC Unit Installation', quantity: 1, unitPrice: 850.00, total: 850.00 },
    { description: 'Ductwork & Supplies', quantity: 1, unitPrice: 275.00, total: 275.00 },
    { description: 'Labor (4 hrs)', quantity: 4, unitPrice: 31.25, total: 125.00 },
  ],
  paidAt: null,
};

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

    // Demo mode: return a hardcoded mock invoice without querying Sanity
    if (invoiceNumber.toUpperCase() === 'DEMO-99999' && email.toLowerCase() === 'demo@demo.com') {
      return res.status(200).json({ invoice: DEMO_INVOICE, alreadyPaid: false });
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
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      invoiceNumber: req.body.invoiceNumber,
      sanityConfig: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        hasToken: !!process.env.SANITY_API_TOKEN
      }
    });
    return res.status(500).json({ 
      error: 'An error occurred while looking up the invoice. Please try again.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
