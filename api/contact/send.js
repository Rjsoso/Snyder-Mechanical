import { sendContactFormEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return res.status(503).json({
        error: 'Contact form is not configured. Please try again later or call us.',
      });
    }

    await sendContactFormEmail({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      message: String(message).trim(),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact send error:', err);
    return res.status(500).json({
      error: 'Failed to send message. Please try again or call us.',
    });
  }
}
