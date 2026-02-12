/**
 * Chatbot Proxy API
 * Proxies chatbot requests to n8n webhook to avoid CORS issues
 * Frontend calls this; this calls n8n server-to-server
 */

const N8N_WEBHOOK_URL = process.env.N8N_CHATBOT_WEBHOOK || process.env.VITE_N8N_CHATBOT_WEBHOOK;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if webhook is configured
  if (!N8N_WEBHOOK_URL) {
    return res.status(503).json({ 
      error: 'Chatbot webhook not configured',
      hint: 'Set N8N_CHATBOT_WEBHOOK environment variable' 
    });
  }

  try {
    const { message, sessionId, session_id, messages, history } = req.body;

    // Forward request to n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId: sessionId || session_id,
        session_id: sessionId || session_id,
        messages,
        history,
      }),
    });

    // Forward the response
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      let text = await response.text();
      if (text.startsWith('=')) text = text.slice(1);
      const data = JSON.parse(text);
      return res.status(response.status).json(data);
    } else {
      // Handle streaming or plain text response
      const text = await response.text();
      
      // If it looks like streaming JSON, forward as-is
      if (text.includes('{"type":"item"')) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(response.status).send(text);
      }
      
      // Otherwise wrap in reply format
      return res.status(response.status).json({ reply: text });
    }
  } catch (error) {
    console.error('Chatbot proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to reach chatbot',
      message: error.message 
    });
  }
}
