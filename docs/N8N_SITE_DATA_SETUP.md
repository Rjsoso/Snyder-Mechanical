# n8n + Snyder Mechanical Website: Using Site Data in the Chatbot

This guide explains how to connect the Snyder Mechanical website with n8n so the AI chatbot can pull information from the website when users ask questions.

## Overview

The website exposes a **Site Knowledge Base API** at:

- **Production:** `https://snyder-mechanical.vercel.app/api/site-data`
- **Format options:** `?format=full` (default) or `?format=text`

n8n can call this API in its chatbot workflow to fetch current website content (hours, services, contact info, FAQs, etc.) and use it as context for AI-generated answers.

## API Endpoints

### GET /api/site-data

Returns the website's knowledge base.

| Query param | Description |
|-------------|-------------|
| `format=full` (default) | Returns JSON with `text` (plain-text summary for AI context) plus structured `company`, `services`, `about`, `resources`, etc. |
| `format=text` | Returns plain text only – ideal for pasting into an LLM prompt as context |

**Example (text format for AI context):**
```http
GET https://snyder-mechanical.vercel.app/api/site-data?format=text
```

**Example (full JSON):**
```http
GET https://snyder-mechanical.vercel.app/api/site-data
```

## n8n Workflow Setup

### Option 1: Simple flow (HTTP Request + AI node)

1. **Webhook node** – receives chatbot messages (POST from website).

2. **HTTP Request node**
   - Method: GET
   - URL: `https://snyder-mechanical.vercel.app/api/site-data?format=text`
   - This node runs before the AI/LLM node to fetch site data.

3. **OpenAI/LLM node** (or similar)
   - System prompt example:
   ```
   You are a helpful assistant for Snyder Mechanical, a mechanical contractor in Northeastern Nevada. Use the following website information to answer questions accurately. If the user asks about services, hours, contact info, or anything else covered here, use this context.

   WEBSITE DATA:
   {{ $json.data }}   (or {{ $json.body }} depending on how the HTTP node returns the response)
   ```
   - In many HTTP Request nodes, the response body is available as `$json.body` or `$json.data`. Check your n8n node's output.
   - Message: `{{ $('Webhook').item.json.body.message }}` (user's question)

4. **Respond to Webhook node** – return the AI reply as `{ "reply": "..." }`.

### Option 2: Merge Webhook + Site Data before AI

1. **Webhook** – receives `message`, `sessionId`, `history`, etc.

2. **HTTP Request** – GET `https://snyder-mechanical.vercel.app/api/site-data?format=text`

3. **Merge node** – combine Webhook data and HTTP response so the AI node has both the user message and site data.

4. **AI/LLM node** – use merged input:
   - System: "You are Snyder Mechanical's assistant. Use this website info: {{ $json.body }}"
   - User message: {{ $json.message }}

5. **Respond to Webhook** – return `{ "reply": "{{ $json.reply }}" }`

### Option 3: Code node to build the prompt

If you prefer to build the prompt in a Code node:

```javascript
const siteData = $('HTTP Request').item.json.body; // or .data depending on your node
const userMessage = $('Webhook').item.json.body.message;

const systemPrompt = `You are a helpful assistant for Snyder Mechanical. Use this website information to answer questions accurately:

${siteData}

Answer based on this information. Be concise and helpful.`;

return [
  {
    json: {
      systemPrompt,
      userMessage,
    },
  },
];
```

Then pass `systemPrompt` and `userMessage` to your AI node.

## Data Included in /api/site-data

The API includes:

- **Company:** name, phone, email, address, hours, description
- **Services:** Residential (HVAC, Plumbing), Commercial (Design/Build, HVAC, Plumbing, Industrial), Pumps & Equipment
- **Detailed services:** Heating, Cooling, Plumbing with descriptions, starting prices, FAQs
- **About:** company story, licenses, timeline
- **Resources:** guides, FAQs
- **Reviews:** sample customer reviews
- **Certifications:** licenses and credentials

## Testing

1. Open: `https://snyder-mechanical.vercel.app/api/site-data?format=text`
2. You should see plain-text output with company info, services, hours, etc.
3. In n8n, run the workflow manually and verify the HTTP Request node returns this data.
4. Ask the chatbot on the website a question like "What are your hours?" or "What HVAC services do you offer?" and confirm it uses the site data in its answer.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| HTTP Request returns empty | Check the URL; use the production URL, not localhost |
| AI ignores site data | Ensure the system prompt clearly tells the AI to use the provided context |
| Wrong field in AI prompt | Inspect the HTTP Request node output and use the correct path (e.g. `$json.body`, `$json.data`, or `$json.text`) |
