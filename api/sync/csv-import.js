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
 * Parse CSV data
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const invoices = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const invoice = {};
    
    headers.forEach((header, index) => {
      invoice[header] = values[index] || '';
    });
    
    invoices.push(invoice);
  }

  return invoices;
}

/**
 * Transform CSV row to Sanity invoice format
 */
function transformCSVToInvoice(csvRow) {
  const mapping = computerEaseConfig.fieldMapping;
  const statusMapping = computerEaseConfig.statusMapping;

  return {
    invoiceNumber: csvRow['Invoice Number'] || csvRow.InvoiceNumber,
    customerName: csvRow['Customer Name'] || csvRow.CustomerName,
    customerEmail: csvRow['Customer Email'] || csvRow.CustomerEmail,
    customerPhone: csvRow['Customer Phone'] || csvRow.CustomerPhone || '',
    amount: parseFloat(csvRow['Total Amount'] || csvRow.Amount || 0),
    description: csvRow['Description'] || csvRow.WorkDescription || '',
    serviceDate: csvRow['Service Date'] || csvRow.ServiceDate || null,
    dueDate: csvRow['Due Date'] || csvRow.DueDate || null,
    status: statusMapping[csvRow['Status']] || 'unpaid',
    computerEaseInvoiceId: csvRow['Invoice ID'] || csvRow.Id || '',
    computerEaseJobNumber: csvRow['Job Number'] || csvRow.JobNumber || '',
    syncedFromComputerEase: true,
    lastSyncDate: new Date().toISOString(),
  };
}

/**
 * Import invoices from CSV
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.SYNC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { csvData } = req.body;

    if (!csvData) {
      return res.status(400).json({ error: 'CSV data is required' });
    }

    // Parse CSV
    const csvInvoices = parseCSV(csvData);

    if (csvInvoices.length === 0) {
      return res.status(400).json({ error: 'No valid invoices found in CSV' });
    }

    // Process each invoice
    const results = {
      total: csvInvoices.length,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    };

    for (const csvRow of csvInvoices) {
      try {
        // Transform to Sanity format
        const invoice = transformCSVToInvoice(csvRow);

        // Validate required fields
        if (!invoice.invoiceNumber || !invoice.customerEmail) {
          results.skipped++;
          results.errors.push({
            row: csvRow,
            reason: 'Missing invoice number or email'
          });
          continue;
        }

        // Check if invoice exists
        const existing = await sanityClient.fetch(
          `*[_type == "invoice" && invoiceNumber == $invoiceNumber][0]`,
          { invoiceNumber: invoice.invoiceNumber }
        );

        if (existing) {
          // Update if not paid
          if (existing.status !== 'paid') {
            await sanityClient
              .patch(existing._id)
              .set(invoice)
              .commit();
            results.updated++;
          } else {
            results.skipped++;
          }
        } else {
          // Create new
          await sanityClient.create({
            _type: 'invoice',
            ...invoice,
          });
          results.created++;
        }
      } catch (error) {
        results.errors.push({
          invoice: csvRow['Invoice Number'] || csvRow.InvoiceNumber,
          error: error.message
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'CSV import completed',
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('CSV import error:', error);
    return res.status(500).json({ 
      error: 'Import failed', 
      message: error.message 
    });
  }
}
