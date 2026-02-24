import { sendServiceRequestEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { service, timeframe, name, phone, email, address, details } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!process.env.RESEND_API_KEY) {
      return res.status(503).json({ error: 'Form is not configured. Please call us.' });
    }
    await sendServiceRequestEmail({
      service: service ? String(service) : '',
      timeframe: timeframe ? String(timeframe) : '',
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : '',
      email: String(email).trim().toLowerCase(),
      address: address ? String(address).trim() : '',
      details: details ? String(details).trim() : '',
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Service request send error:', err);
    return res.status(500).json({ error: 'Failed to send. Please try again or call us.' });
  }
}
