# n8n Setup for File Attachments

## Quick Start

Your chatbot now sends file attachments to your n8n workflow. Here's how to set up n8n to handle them:

## What n8n Receives

When a user sends a message with files, your webhook receives:

```json
{
  "message": "I need a quote for HVAC installation",
  "sessionId": "abc-123-def",
  "hasAttachments": true,
  "attachmentCount": 2,
  "attachments": [
    {
      "filename": "photo1.jpg",
      "content": "base64-string-here...",
      "contentType": "image/jpeg",
      "size": 2456789
    },
    {
      "filename": "floor-plan.pdf",
      "content": "base64-string-here...",
      "contentType": "application/pdf",
      "size": 1234567
    }
  ],
  "messages": [...],
  "history": [...]
}
```

## Simple n8n Workflow

### Option 1: Send Email with Gmail

1. **Webhook** (trigger)
   - Already configured

2. **IF** node
   - Condition: `{{ $json.hasAttachments }}` equals `true`

3. **Gmail** node (if attachments present)
   - **To:** `office@snydermechanical.com`
   - **Subject:** `New Quote Request - {{ $json.sessionId }}`
   - **Message:** 
     ```
     New quote request from chatbot:
     
     {{ $json.message }}
     
     Session: {{ $json.sessionId }}
     Attachments: {{ $json.attachmentCount }} file(s)
     ```
   - **Attachments:** Enable "Add Attachment" and use:
     - For each item in `{{ $json.attachments }}`:
       - Binary Property: Convert base64 to binary
       - Filename: `{{ $json.attachments[0].filename }}`

4. **AI/Response** node
   - Generate AI response as usual
   - Return to user

### Option 2: Send Email with Send Grid

1. **Webhook** (trigger)

2. **IF** node
   - Check for attachments

3. **Function** node (convert attachments)
   ```javascript
   const items = $input.all();
   const outputItems = [];
   
   for (const item of items) {
     if (item.json.hasAttachments) {
       const attachments = item.json.attachments.map(file => ({
         content: file.content,
         filename: file.filename,
         type: file.contentType,
         disposition: 'attachment'
       }));
       
       outputItems.push({
         json: {
           ...item.json,
           formattedAttachments: attachments
         }
       });
     } else {
       outputItems.push(item);
     }
   }
   
   return outputItems;
   ```

4. **SendGrid** node
   - Use `{{ $json.formattedAttachments }}`

### Option 3: Save to Google Drive

1. **Webhook** (trigger)

2. **IF** node
   - Check for attachments

3. **Function** node (decode base64)
   ```javascript
   const items = $input.all();
   const outputItems = [];
   
   for (const item of items) {
     if (item.json.attachments) {
       for (const file of item.json.attachments) {
         const buffer = Buffer.from(file.content, 'base64');
         outputItems.push({
           json: {
             filename: file.filename,
             sessionId: item.json.sessionId,
             message: item.json.message
           },
           binary: {
             data: {
               data: buffer.toString('base64'),
               mimeType: file.contentType,
               fileName: file.filename
             }
           }
         });
       }
     }
   }
   
   return outputItems;
   ```

4. **Google Drive** node
   - Upload the binary data
   - Use the binary property from previous node

5. **Gmail** node
   - Send email with Google Drive link

## Testing

1. Test your n8n workflow with manual execution
2. Send a test message with a small image from the chatbot
3. Check n8n execution logs
4. Verify the attachment is received in your email/storage

## Common Issues

### Attachments not appearing in email

- Make sure you're decoding the base64 content
- Check that Gmail/SendGrid node is configured for attachments
- Verify the attachment format matches what the email service expects

### Base64 decoding errors

Use this helper in a Function node:
```javascript
const items = $input.all();

for (const item of items) {
  if (item.json.attachments) {
    item.json.decodedAttachments = item.json.attachments.map(file => {
      return {
        ...file,
        buffer: Buffer.from(file.content, 'base64')
      };
    });
  }
}

return items;
```

### Large files causing timeouts

- Frontend already limits to 10MB per file, 25MB total
- If still having issues, add compression in n8n
- Or save to storage and send links instead of attachments

## Need Help?

Check the n8n documentation:
- Gmail node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/
- SendGrid node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.sendgrid/
- Function node: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/
