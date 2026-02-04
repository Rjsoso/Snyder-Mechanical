import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/**
 * Optional: require dashboard password so only authenticated dashboard can read stats.
 * If DASHBOARD_PASSWORD is not set, we skip auth (for backwards compatibility).
 */
function isAuthorized(req) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return true;
  const auth = req.headers['authorization'];
  return auth === `Bearer ${expected}`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [totalInvoices, unpaidInvoices, paidInvoices, syncedFromCE] = await Promise.all([
      sanityClient.fetch(`count(*[_type == "invoice"])`),
      sanityClient.fetch(`count(*[_type == "invoice" && status == "unpaid"])`),
      sanityClient.fetch(`count(*[_type == "invoice" && status == "paid"])`),
      sanityClient.fetch(`count(*[_type == "invoice" && syncedFromComputerEase == true])`),
    ]);

    return res.status(200).json({
      totalInvoices: totalInvoices ?? 0,
      unpaidInvoices: unpaidInvoices ?? 0,
      paidInvoices: paidInvoices ?? 0,
      syncedFromCE: syncedFromCE ?? 0,
    });
  } catch (error) {
    console.error('Invoice stats error:', error);
    return res.status(500).json({
      error: 'Failed to load stats',
      totalInvoices: 0,
      unpaidInvoices: 0,
      paidInvoices: 0,
      syncedFromCE: 0,
    });
  }
}
