# Chatbot File Attachments - Setup Guide

## Overview

This feature allows users to attach files (images, documents, etc.) when requesting quotes through the chatbot. Files are sent directly to the company email as attachments.

## What Was Implemented

### 1. Frontend Changes

**File:** `src/components/layout/ChatbotPlaceholder.jsx`

- Added file upload button (paperclip icon) next to message input
- File selection and preview UI
- File validation (type, size, quantity)
- Visual indicators for messages with attachments
- Success confirmation after quote submission

### 2. Backend API

**File:** `api/quote/submit.js`

- New endpoint to handle quote submissions with attachments
- Accepts base64-encoded files from frontend
- Validates file sizes and formats
- Sends email with attachments using Resend

### 3. Email Service

**File:** `api/utils/sendEmail.js`

- New `sendQuoteRequestEmail()` function
- Professional email template for quote requests
- Includes customer message, timestamp, and session ID
- Supports multiple file attachments

## Configuration

### Environment Variables

Add these to your environment:

```bash
# Resend API Key (required for sending emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email address to receive quote requests (optional, defaults to office@snydermechanical.com)
QUOTE_EMAIL_RECIPIENT=your-email@snydermechanical.com
```

### Resend Email Domain Setup

The quote emails are sent from `quotes@snydermechanical.com`. You'll need to:

1. **Option A:** Add and verify `quotes@snydermechanical.com` in Resend
   - Go to Resend dashboard → Domains
   - Add snydermechanical.com if not already added
   - Verify DNS records
   - Add `quotes@` as a sending address

2. **Option B:** Use existing verified address (recommended for quick setup)
   - Change the sender in `api/utils/sendEmail.js` line 23 to use `payments@snydermechanical.com` instead:
   ```javascript
   from: 'Snyder Mechanical <payments@snydermechanical.com>',
   ```

## File Constraints

The following constraints are enforced:

| Constraint | Value | Reason |
|------------|-------|--------|
| Max file size | 10 MB per file | Prevents abuse, reasonable for photos/documents |
| Max files | 5 per message | Keeps email manageable |
| Total max size | 25 MB | Resend has 40MB limit, leave buffer |

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
   - Sends to `/api/quote/submit`
   - Sends email with attachments
   - Also forwards message to n8n for AI response
8. User sees success confirmation
9. Company receives email with attachments

## Architecture

```
User Browser
    ↓ (Selects files)
ChatbotPlaceholder.jsx
    ↓ (Converts to base64)
POST /api/quote/submit
    ↓ (Validates & processes)
sendQuoteRequestEmail()
    ↓ (Sends via Resend API)
Company Email Inbox
    ↓ (Email with attachments)
```

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

- File type validation on frontend and backend
- File size limits enforced
- No files stored on server (sent directly to email)
- Base64 encoding for safe transmission
- Session tracking for abuse prevention

## Future Enhancements

Consider these improvements:

1. **Store in Supabase Storage**
   - Keep records of attachments
   - Link to conversation history
   - Allow staff to view attachments in dashboard

2. **Customer Contact Info**
   - Collect email/phone if not already provided
   - Include in email for easy follow-up

3. **Rate Limiting**
   - Prevent abuse of attachment feature
   - Limit submissions per session/IP

4. **Admin Dashboard**
   - View all quote requests
   - Download attachments
   - Track response status

5. **File Preview**
   - Show image thumbnails in chat
   - Preview documents before sending

6. **OCR/Analysis**
   - Extract text from images
   - Auto-categorize quote types

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
- Verify file size and type
- Check if max files reached

### Email not received
- Verify `RESEND_API_KEY` is set
- Check `QUOTE_EMAIL_RECIPIENT` is correct
- Check Resend dashboard for send status
- Look in spam folder

### Deployment issues
- Ensure environment variables set in Vercel
- Check function logs in Vercel dashboard
- Verify Resend domain is verified

## Support

For issues or questions:
1. Check browser console and Vercel logs
2. Review Resend dashboard
3. Verify environment variables
4. Test with small files first
5. Check email spam folder
