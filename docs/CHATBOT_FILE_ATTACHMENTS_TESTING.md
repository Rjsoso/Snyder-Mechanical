# Chatbot File Attachments - Testing Guide (n8n Version)

This guide will help you test the newly implemented file attachment feature that sends files through your n8n workflow.

## Prerequisites

Before testing, ensure you have the following:

### Required Environment Variables

You should already have this set (used for your chatbot):

```bash
# n8n chatbot webhook (should already be configured)
N8N_CHATBOT_WEBHOOK=https://n8n.srv1328675.hstgr.cloud/webhook/...
```

**That's it!** No additional API keys or services needed.

### n8n Workflow Setup

You'll need to configure your n8n workflow to handle attachments. See `CHATBOT_FILE_ATTACHMENTS_SETUP.md` for details on the payload structure.

## Testing Steps

### 1. Local Testing

#### Start the Development Server

```bash
npm run dev
```

#### Test File Upload UI

1. Open your browser to `http://localhost:5173`
2. Click the chatbot button in the bottom-right corner
3. Look for the paperclip (📎) icon next to the message input
4. Click the paperclip icon
5. Verify file selection dialog opens

#### Test File Selection

1. Select 1-3 test files (images, PDFs, or documents)
2. Verify files appear in the preview area above the input
3. Check that each file shows:
   - File name
   - File size
   - Remove (X) button

#### Test File Validation

Try these scenarios to verify validation:

**Valid files:**
- JPEG/PNG images
- PDF documents
- Word documents (.doc, .docx)
- Excel spreadsheets (.xls, .xlsx)

**Invalid scenarios (should show error):**
- File larger than 10MB
- More than 5 files at once
- Total size exceeding 25MB
- Unsupported file types (e.g., .exe, .zip)

#### Test Quote Submission

1. With files attached, type a message like: "I need a quote for HVAC installation"
2. Click Send
3. Verify:
   - Loading spinner appears
   - Success message displays: "✓ Quote request submitted successfully..."
   - Files are cleared from the preview
   - Attachment count shows in the sent message bubble

### 2. n8n Workflow Verification

Check your n8n workflow executions:

**What to verify:**
1. Go to n8n dashboard → Executions
2. Find the most recent execution
3. Check the webhook payload includes:
   - `message`: Your test message
   - `sessionId`: UUID
   - `attachments`: Array of files with base64 content
   - `hasAttachments`: true
   - `attachmentCount`: Number of files

**If you configured email in n8n:**
- Check your email inbox for the quote request
- Verify all attachments are included
- Files should be properly decoded and attached

### 3. Production Testing (Vercel)

After deploying to Vercel:

1. Verify `N8N_CHATBOT_WEBHOOK` is set in Vercel environment variables

2. Deploy and test on your live site

3. Check n8n executions to verify attachments are being received

4. Verify the same functionality works in production

## Known Limitations

1. **Max file size:** 10MB per file
2. **Max files:** 5 files per message
3. **Total max size:** 25MB (Resend limit is 40MB)
4. **Supported file types:** Images (jpg, png, gif, webp), Documents (pdf, doc, docx), Spreadsheets (xls, xlsx), Text files (txt, csv)

## Troubleshooting

### Files not sending

**Check:**
- Browser console for JavaScript errors
- Vercel function logs for server errors
- n8n webhook URL is correct
- Network tab shows request to `/api/chatbot/chat`

### Attachments not in n8n

**Check:**
- n8n execution logs (should show `attachments` field)
- Webhook payload includes `hasAttachments: true`
- Base64 content is present in payload
- n8n workflow is configured to handle attachments

### File size errors

**Verify:**
- Individual files are under 10MB
- Total of all files is under 25MB
- Browser console shows the actual file sizes
- Try with smaller test files first

### CORS errors

If you see CORS errors:
- Make sure you're testing on the same domain
- Verify `/api/chatbot/chat` endpoint is accessible
- Check Vercel function logs

## n8n Webhook Payload

When attachments are sent, n8n receives:

**Request body:**
```json
{
  "message": "Customer's quote request message",
  "sessionId": "uuid-session-id",
  "session_id": "uuid-session-id",
  "messages": [...],
  "history": [...],
  "attachments": [
    {
      "filename": "photo.jpg",
      "content": "base64-encoded-content",
      "contentType": "image/jpeg",
      "size": 1234567
    }
  ],
  "hasAttachments": true,
  "attachmentCount": 1
}
```

## Security Notes

1. File validation happens on frontend (client-side)
2. Files are converted to base64 for transmission
3. No files are stored on the server (sent directly to n8n)
4. Session IDs help track requests
5. **Recommendation:** Add server-side validation in n8n if needed

## Next Steps

After successful testing:

1. Configure your n8n workflow to handle attachments (email, storage, etc.)
2. Test email delivery if configured in n8n
3. Consider adding customer contact info collection
4. Consider storing attachments in cloud storage via n8n
5. Add rate limiting in n8n to prevent abuse

## Support

If you encounter issues during testing:
1. Check browser console for frontend errors
2. Check Vercel function logs for backend errors
3. Check n8n execution logs to see if attachments are received
4. Verify `N8N_CHATBOT_WEBHOOK` is set correctly
5. Test with small files first (1-2MB)
