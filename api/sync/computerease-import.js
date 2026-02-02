import { createClient } from '@sanity/client';
import computerEaseConfig, { validateConfig } from './computerease-config.js';

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

/**
 * Fetch invoices from ComputerEase API
 */
async function fetchFromComputerEaseAPI() {
  const { baseUrl, username, password, apiKey } = computerEaseConfig.api;
  
  try {
    // Build authentication header
    const authHeader = apiKey 
      ? { 'Authorization': `Bearer ${apiKey}` }
      : { 'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}` };

    // Fetch unpaid invoices from ComputerEase
    // Note: Actual endpoint may vary - check ComputerEase API docs
    const response = await fetch(`${baseUrl}/invoices?status=unpaid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      timeout: computerEaseConfig.api.timeout,
    });

    if (!response.ok) {
      throw new Error(`ComputerEase API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.invoices || data || [];
  } catch (error) {
    console.error('Error fetching from ComputerEase API:', error);
    throw error;
  }
}

/**
 * Transform ComputerEase invoice to Sanity format
 */
function transformInvoice(ceInvoice) {
  const mapping = computerEaseConfig.fieldMapping;
  const statusMapping = computerEaseConfig.statusMapping;

  return {
    invoiceNumber: ceInvoice[mapping.invoiceNumber],
    customerName: ceInvoice[mapping.customerName],
    customerEmail: ceInvoice[mapping.customerEmail],
    customerPhone: ceInvoice[mapping.customerPhone] || '',
    amount: parseFloat(ceInvoice[mapping.amount] || 0),
    description: ceInvoice[mapping.description] || '',
    serviceDate: ceInvoice[mapping.serviceDate] || null,
    dueDate: ceInvoice[mapping.dueDate] || null,
    status: statusMapping[ceInvoice[mapping.status]] || 'unpaid',
    computerEaseInvoiceId: ceInvoice.id || ceInvoice.Id || '',
    computerEaseJobNumber: ceInvoice[mapping.jobNumber] || '',
    syncedFromComputerEase: true,
    lastSyncDate: new Date().toISOString(),
    lineItems: transformLineItems(ceInvoice[mapping.lineItems] || []),
  };
}

/**
 * Transform line items
 */
function transformLineItems(ceLineItems) {
  if (!Array.isArray(ceLineItems)) return [];
  
  return ceLineItems.map(item => ({
    description: item.Description || item.description || '',
    quantity: parseFloat(item.Quantity || item.quantity || 1),
    unitPrice: parseFloat(item.UnitPrice || item.unitPrice || 0),
    total: parseFloat(item.Total || item.total || 0),
  }));
}

/**
 * Create or update invoice in Sanity
 */
async function upsertInvoiceInSanity(invoice) {
  try {
    // Check if invoice already exists
    const existing = await sanityClient.fetch(
      `*[_type == "invoice" && invoiceNumber == $invoiceNumber][0]`,
      { invoiceNumber: invoice.invoiceNumber }
    );

    if (existing) {
      // Update existing invoice (only if not paid)
      if (existing.status !== 'paid') {
        await sanityClient
          .patch(existing._id)
          .set({
            ...invoice,
            _id: existing._id, // Keep existing ID
          })
          .commit();
        return { action: 'updated', invoice: existing._id };
      } else {
        return { action: 'skipped', reason: 'already paid', invoice: existing._id };
      }
    } else {
      // Create new invoice
      const result = await sanityClient.create({
        _type: 'invoice',
        ...invoice,
      });
      return { action: 'created', invoice: result._id };
    }
  } catch (error) {
    console.error('Error upserting invoice:', error);
    throw error;
  }
}

/**
 * Main sync handler
 */
export default async function handler(req, res) {
  // Only allow POST requests (for security)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key for manual triggers
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.SYNC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Validate configuration
    const configCheck = validateConfig();
    if (!configCheck.isValid) {
      return res.status(500).json({ 
        error: 'Invalid configuration', 
        details: configCheck.errors 
      });
    }

    // Check if sync is enabled
    if (!computerEaseConfig.sync.enabled) {
      return res.status(200).json({ 
        message: 'Sync is disabled',
        synced: 0 
      });
    }

    // Fetch invoices from ComputerEase
    const ceInvoices = await fetchFromComputerEaseAPI();

    if (!ceInvoices || ceInvoices.length === 0) {
      return res.status(200).json({ 
        message: 'No invoices to sync',
        synced: 0 
      });
    }

    // Process each invoice
    const results = {
      total: ceInvoices.length,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    };

    for (const ceInvoice of ceInvoices) {
      try {
        // Transform and validate
        const sanityInvoice = transformInvoice(ceInvoice);
        
        // Skip if missing critical fields
        if (!sanityInvoice.invoiceNumber || !sanityInvoice.customerEmail) {
          results.skipped++;
          results.errors.push({
            invoice: ceInvoice.id,
            reason: 'Missing required fields'
          });
          continue;
        }

        // Upsert to Sanity
        const result = await upsertInvoiceInSanity(sanityInvoice);
        
        if (result.action === 'created') results.created++;
        if (result.action === 'updated') results.updated++;
        if (result.action === 'skipped') results.skipped++;
      } catch (error) {
        results.errors.push({
          invoice: ceInvoice.id || ceInvoice.InvoiceNumber,
          error: error.message
        });
      }
    }

    // Return sync results
    return res.status(200).json({
      success: true,
      message: 'Sync completed',
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('ComputerEase sync error:', error);
    return res.status(500).json({ 
      error: 'Sync failed', 
      message: error.message 
    });
  }
}
