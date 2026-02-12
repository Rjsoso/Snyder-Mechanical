# Chatbot File Attachments - Testing Guide

This guide will help you test the newly implemented file attachment feature for quote requests in the chatbot.

## Prerequisites

Before testing, ensure you have the following environment variables set:

### Required Environment Variables

Add these to your `.env.local` file or in Vercel's environment variables:

```bash
# Resend API key (for sending emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Company email to receive quote requests
QUOTE_EMAIL_RECIPIENT=your-email@snydermechanical.com

# n8n chatbot webhook (should already be set)
N8N_CHATBOT_WEBHOOK=https://n8n.srv1328675.hstgr.cloud/webhook/...
```

### Getting a Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your environment variables

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

### 2. Email Verification

Check the inbox of the email address specified in `QUOTE_EMAIL_RECIPIENT`:

**Expected email content:**
- Subject: "New Quote Request from Chatbot - [date/time]"
- From: Snyder Mechanical <quotes@snydermechanical.com>
- Body includes:
  - Customer message
  - Timestamp
  - Session ID
  - Attachment count
- All selected files attached to the email

### 3. Production Testing (Vercel)

After deploying to Vercel:

1. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `QUOTE_EMAIL_RECIPIENT`

2. Deploy and test on your live site

3. Verify the same functionality works in production

## Known Limitations

1. **Max file size:** 10MB per file
2. **Max files:** 5 files per message
3. **Total max size:** 25MB (Resend limit is 40MB)
4. **Supported file types:** Images (jpg, png, gif, webp), Documents (pdf, doc, docx), Spreadsheets (xls, xlsx), Text files (txt, csv)

## Troubleshooting

### Files not sending

**Check:**
- `RESEND_API_KEY` is set correctly
- API key has permission to send emails
- Check browser console for JavaScript errors
- Check Vercel function logs for server errors

### Email not received

**Check:**
- `QUOTE_EMAIL_RECIPIENT` is set correctly
- Check spam folder
- Verify Resend dashboard for email status
- Check Resend domain verification

### File size errors

**Verify:**
- Individual files are under 10MB
- Total of all files is under 25MB
- Browser console shows the actual file sizes

### CORS errors

If you see CORS errors when submitting quotes:
- Make sure you're testing on the same domain (not mixing localhost and production)
- Verify the API endpoint is accessible

## API Endpoint Details

### POST /api/quote/submit

**Request body:**
```json
{
  "message": "Customer's quote request message",
  "sessionId": "uuid-session-id",
  "attachments": [
    {
      "filename": "photo.jpg",
      "content": "base64-encoded-content",
      "contentType": "image/jpeg",
      "size": 1234567
    }
  ]
}
```

**Success response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "emailId": "resend-email-id"
}
```

**Error response:**
```json
{
  "error": "Error message description"
}
```

## Security Notes

1. File validation happens on both frontend and backend
2. Files are converted to base64 for transmission
3. Server validates file types and sizes
4. No files are stored on the server (sent directly to email)
5. Session IDs help track quote requests

## Next Steps

After successful testing:

1. Monitor email delivery rates
2. Consider adding customer contact info collection
3. Consider storing attachments in Supabase Storage for records
4. Add rate limiting to prevent abuse
5. Create admin dashboard to view quote requests

## Support

If you encounter issues during testing:
1. Check browser console for frontend errors
2. Check Vercel function logs for backend errors
3. Review Resend dashboard for email sending status
4. Verify all environment variables are set correctly
