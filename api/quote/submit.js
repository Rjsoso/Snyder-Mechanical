import { sendQuoteRequestEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId, attachments } = req.body;

    // Validate required fields
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Validate attachments if present
    if (attachments && !Array.isArray(attachments)) {
      return res.status(400).json({ error: 'Attachments must be an array' });
    }

    // Convert base64 attachments to Buffer format for Resend
    const processedAttachments = attachments && attachments.length > 0
      ? attachments.map((file) => {
          if (!file.filename || !file.content || !file.contentType) {
            throw new Error('Invalid attachment format');
          }

          // Validate file size (already validated on frontend, but double-check)
          const sizeInMB = file.size / (1024 * 1024);
          if (sizeInMB > 10) {
            throw new Error(`File ${file.filename} exceeds 10MB limit`);
          }

          return {
            filename: file.filename,
            content: Buffer.from(file.content, 'base64'),
          };
        })
      : [];

    // Get recipient email from environment variable
    const recipientEmail = process.env.QUOTE_EMAIL_RECIPIENT || 'office@snydermechanical.com';

    // Send quote request email
    const emailResult = await sendQuoteRequestEmail({
      recipientEmail,
      customerMessage: message,
      sessionId,
      attachments: processedAttachments,
      timestamp: new Date().toISOString(),
    });

    if (!emailResult) {
      throw new Error('Failed to send quote request email');
    }

    return res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully',
      emailId: emailResult.id,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to submit quote request',
    });
  }
}
