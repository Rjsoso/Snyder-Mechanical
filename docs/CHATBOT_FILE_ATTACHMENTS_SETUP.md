# Chatbot File Attachments - Setup Guide (n8n Version)

## Overview

This feature allows users to attach files (images, documents, etc.) when requesting quotes through the chatbot. Files are sent to your **existing n8n workflow** which can then handle email delivery or any other processing you configure.

## What Was Implemented

### 1. Frontend Changes

**File:** `src/components/layout/ChatbotPlaceholder.jsx`

- Added file upload button (paperclip icon) next to message input
- File selection and preview UI
- File validation (type, size, quantity)
- Visual indicators for messages with attachments
- Files are converted to base64 and sent with the message

### 2. Backend API

**File:** `api/chatbot/chat.js`

- Enhanced to accept and forward file attachments to n8n
- Files are included in the webhook payload
- No additional endpoints needed - uses your existing chatbot infrastructure

## Configuration

### No New Environment Variables Needed!

This feature uses your **existing n8n webhook** that's already configured:

```bash
N8N_CHATBOT_WEBHOOK=https://n8n.srv1328675.hstgr.cloud/webhook/...
```

That's it! No additional services or API keys required.

## File Constraints

The following constraints are enforced on the frontend:

| Constraint | Value | Reason |
|------------|-------|--------|
| Max file size | 10 MB per file | Prevents abuse, reasonable for photos/documents |
| Max files | 5 per message | Keeps payload manageable |
| Total max size | 25 MB | Reasonable limit for webhook payloads |

### Allowed File Types

- **Images:** .jpg, .jpeg, .png, .gif, .webp
- **Documents:** .pdf, .doc, .docx
- **Spreadsheets:** .xls, .xlsx
- **Text:** .txt, .csv

## User Flow

1. User opens chatbot
2. Clicks paperclip icon to attach files
3. Selects one or more files
4. Files appear in preview area (can remove individual files)
5. User types quote request message
6. Clicks Send
7. System:
   - Validates files
   - Converts to base64
   - Sends to `/api/chatbot/chat`
   - Forwards to n8n webhook with attachments
8. n8n workflow receives message and files
9. n8n can send email, save to database, or any other logic you configure

## Architecture

```
User Browser
    ↓ (Selects files)
ChatbotPlaceholder.jsx
    ↓ (Converts to base64)
POST /api/chatbot/chat
    ↓ (Forwards to n8n)
n8n Webhook
    ↓ (Your workflow)
Email / Database / etc
```

## n8n Webhook Payload

When a user sends a message with attachments, your n8n webhook will receive:

```json
{
  "message": "Customer's message text",
  "sessionId": "uuid-session-id",
  "session_id": "uuid-session-id",
  "messages": [...],
  "history": [...],
  "attachments": [
    {
      "filename": "photo.jpg",
      "content": "base64-encoded-file-content",
      "contentType": "image/jpeg",
      "size": 1234567
    }
  ],
  "hasAttachments": true,
  "attachmentCount": 1
}
```

### Setting Up n8n to Handle Attachments

In your n8n workflow, you can:

1. **Check for attachments:**
   ```javascript
   // Check if message has attachments
   if ($json.hasAttachments) {
     // Handle quote request with files
   }
   ```

2. **Send email with attachments:**
   - Use the Email node in n8n
   - Convert base64 back to binary if needed
   - Attach files to the email

3. **Save to storage:**
   - Use HTTP Request node to upload to cloud storage
   - Or save metadata to a database

4. **Example n8n flow:**
   ```
   Webhook → IF (hasAttachments) → Email/Send Grid/Gmail Node → Response
   ```

### Example n8n Email Configuration

If using Gmail node in n8n:
- **To:** `office@snydermechanical.com`
- **Subject:** `New Quote Request - {{$json.sessionId}}`
- **Message:** `{{$json.message}}`
- **Attachments:** Use the `attachments` array from the webhook

## Testing

See `CHATBOT_FILE_ATTACHMENTS_TESTING.md` for detailed testing instructions.

Quick test:
1. Start dev server: `npm run dev`
2. Open chatbot
3. Click paperclip icon
4. Select test files
5. Type message and send
6. Check email inbox

## Security Considerations

- File type validation on frontend (enforced in browser)
- File size limits enforced on frontend
- No files stored on server (sent directly to n8n)
- Base64 encoding for safe transmission
- Session tracking included in payload
- **Note:** You can add additional validation in your n8n workflow if needed

## n8n Workflow Examples

### Simple Email Forward

The simplest n8n workflow:
1. Webhook trigger (receives the message + attachments)
2. IF node (check if `hasAttachments === true`)
3. Gmail/Email node (send email with attachments)
4. Respond node (send AI reply back to user)

### Advanced Processing

More complex n8n workflow:
1. Webhook trigger
2. IF node (check for attachments)
3. **If attachments present:**
   - Send email notification
   - Save to Supabase/Database
   - Upload files to cloud storage
   - Create ticket in CRM
4. AI node (generate response)
5. Respond to user

## Future Enhancements

Consider these improvements in your n8n workflow:

1. **Store in Cloud Storage**
   - Upload to AWS S3, Google Drive, or Dropbox
   - Store URLs in database for reference
   - Create download links for staff

2. **Customer Contact Info**
   - Extract email/phone from chat history
   - Include in notification emails

3. **Rate Limiting**
   - Track submissions by session ID in n8n
   - Prevent abuse of attachment feature

4. **Automated Responses**
   - Send auto-reply email to customer
   - Create ticket number for tracking
   - Schedule follow-up reminders

5. **File Analysis**
   - Use OCR to extract text from images
   - Auto-categorize quote types
   - Estimate project size from photos

## Maintenance

### Updating File Constraints

To change file limits, update these constants in `ChatbotPlaceholder.jsx`:

```javascript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 5; // Max number of files
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // Total max size
```

Also update validation in `api/quote/submit.js` to match.

### Adding New File Types

Add to `ALLOWED_FILE_TYPES` object in `ChatbotPlaceholder.jsx`:

```javascript
const ALLOWED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  // ... existing types ...
  'application/your-type': ['.ext'],
};
```

### Changing Email Template

Edit the HTML in `sendQuoteRequestEmail()` function in `api/utils/sendEmail.js`.

## Troubleshooting

### Files won't upload
- Check browser console for errors
- Verify file size and type (must be under 10MB each)
- Check if max files reached (5 files max)
- Ensure file type is allowed

### Attachments not reaching n8n
- Check browser network tab for failed requests
- Verify `/api/chatbot/chat` endpoint is working
- Check Vercel function logs
- Test regular messages first (without attachments)

### n8n not processing attachments
- Check n8n execution logs
- Verify webhook is receiving `attachments` field
- Ensure `hasAttachments` flag is true
- Test with a simple n8n flow that logs the payload

### Files too large
- Reduce file size before uploading
- Compress images/PDFs
- Split into multiple messages if needed
- Remember: 10MB per file, 25MB total

### Deployment issues
- Ensure `N8N_CHATBOT_WEBHOOK` is set in Vercel
- Check function logs in Vercel dashboard
- Test in development first (`npm run dev`)

## Support

For issues or questions:
1. Check browser console for frontend errors
2. Check Vercel function logs for backend errors
3. Check n8n execution logs for workflow issues
4. Test with small files first (1-2MB)
5. Verify n8n webhook URL is correct
