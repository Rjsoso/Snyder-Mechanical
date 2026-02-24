import { sendQuickEstimateEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const body = req.body || {};
    const { name, email } = body;
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
    const payload = {
      serviceType: body.serviceType ? String(body.serviceType) : '',
      name: String(name).trim(),
      phone: body.phone ? String(body.phone).trim() : '',
      email: String(email).trim().toLowerCase(),
      address: body.address ? String(body.address).trim() : '',
      homeSize: body.homeSize ? String(body.homeSize).trim() : '',
      homeAge: body.homeAge ? String(body.homeAge).trim() : '',
      equipmentAge: body.equipmentAge ? String(body.equipmentAge).trim() : '',
      details: body.details ? String(body.details).trim() : '',
    };
    await sendQuickEstimateEmail(payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Quick estimate send error:', err);
    return res.status(500).json({ error: 'Failed to send. Please try again or call us.' });
  }
}
