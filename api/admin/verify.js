/**
 * Verify dashboard password. Used by the admin UI to gate access.
 * Set DASHBOARD_PASSWORD in env; client sends password in body, we compare and return ok.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return res.status(503).json({ error: 'Dashboard login is not configured' });
  }

  const { password } = req.body || {};
  const ok = typeof password === 'string' && password.length > 0 && password === expected;

  if (!ok) {
    return res.status(401).json({ ok: false, error: 'Invalid password' });
  }

  return res.status(200).json({ ok: true });
}
