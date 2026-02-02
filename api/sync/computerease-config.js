// ComputerEase Configuration
// This file handles connection settings and credentials for ComputerEase integration

export const computerEaseConfig = {
  // API Settings (for REST API integration)
  api: {
    baseUrl: process.env.COMPUTEREASE_API_URL || '',
    username: process.env.COMPUTEREASE_API_USERNAME || '',
    password: process.env.COMPUTEREASE_API_PASSWORD || '',
    apiKey: process.env.COMPUTEREASE_API_KEY || '',
    timeout: 30000, // 30 seconds
  },

  // CSV Settings (for CSV import/export)
  csv: {
    enabled: process.env.COMPUTEREASE_CSV_ENABLED === 'true',
    importPath: process.env.COMPUTEREASE_CSV_IMPORT_PATH || '',
    exportPath: process.env.COMPUTEREASE_CSV_EXPORT_PATH || '',
  },

  // Sync Settings
  sync: {
    enabled: process.env.COMPUTEREASE_SYNC_ENABLED === 'true',
    interval: parseInt(process.env.COMPUTEREASE_SYNC_INTERVAL || '30'), // minutes
    batchSize: 50, // invoices per batch
    onlyUnpaid: true, // only sync unpaid invoices
  },

  // Field Mapping: ComputerEase -> Sanity
  fieldMapping: {
    invoiceNumber: 'InvoiceNumber',
    customerName: 'CustomerName',
    customerEmail: 'CustomerEmail',
    customerPhone: 'CustomerPhone',
    amount: 'TotalAmount',
    description: 'WorkDescription',
    serviceDate: 'ServiceDate',
    dueDate: 'DueDate',
    status: 'Status',
    jobNumber: 'JobNumber',
    lineItems: 'LineItems',
  },

  // Status Mapping: ComputerEase -> Sanity
  statusMapping: {
    'Open': 'unpaid',
    'Unpaid': 'unpaid',
    'Paid': 'paid',
    'Overdue': 'overdue',
    'Void': 'cancelled',
    'Cancelled': 'cancelled',
  },
};

// Validate configuration
export function validateConfig() {
  const errors = [];

  // Check if any sync method is configured
  if (!computerEaseConfig.api.baseUrl && !computerEaseConfig.csv.enabled) {
    errors.push('No sync method configured. Enable either API or CSV sync.');
  }

  // If API is configured, check credentials
  if (computerEaseConfig.api.baseUrl) {
    if (!computerEaseConfig.api.username && !computerEaseConfig.api.apiKey) {
      errors.push('API URL provided but no credentials (username/API key).');
    }
  }

  // If CSV is enabled, check paths
  if (computerEaseConfig.csv.enabled) {
    if (!computerEaseConfig.csv.importPath) {
      errors.push('CSV sync enabled but no import path specified.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default computerEaseConfig;
