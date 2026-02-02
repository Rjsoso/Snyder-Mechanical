# ComputerEase Integration Guide

## What You Need from Your IT/Admin

To connect ComputerEase to your invoice payment system, ask your IT department or ComputerEase admin for:

### 1. Instance Information
- **ComputerEase URL**: What's your login URL?
  - Example: `https://snyderllc.computerease.cloud`
  - Or on-premise IP address/domain

### 2. API Access
- **Is API Management Module Enabled?**
  - Location in ComputerEase: Configure > API Management
  - If not enabled, they'll need to enable it (may require license)

### 3. API Credentials
Once API access is confirmed, you need:
- **API Username** or **API Key**
- **API Password** or **API Secret**
- **Base API URL** (usually: `https://your-instance/api/v1/`)

## What API Access Enables

With API access, you can:
- ✅ Automatically sync unpaid invoices to website
- ✅ Customers pay online through website
- ✅ Payments automatically update in ComputerEase
- ✅ No manual data entry needed

Without API access, you'll need to:
- Export invoices as CSV from ComputerEase
- Import to Sanity manually or via upload
- Export paid invoices from Sanity
- Import payments back to ComputerEase

## Testing Your Current Setup (Without ComputerEase)

Right now, your payment system works with **manually created invoices in Sanity**.

### Test the System:

1. **Make sure dev server is running:**
   ```bash
   cd "/Users/rorybylund/Snyder Mechanical Website"
   npm run dev
   ```

2. **Verify test invoice exists in Sanity:**
   - Go to: https://snyder-mechanical.sanity.studio/
   - Click "Invoice" in sidebar
   - You should see INV-00001
   - Make sure it's **Published** (not draft)

3. **Test on website:**
   - Go to: http://localhost:5173/resources
   - Scroll to "Pay Your Invoice"
   - Enter:
     - Invoice: `INV-00001`
     - Email: `test@example.com`
   - Click "Find My Invoice"

4. **If you see errors:**
   - Press F12 to open browser console
   - Look for error messages
   - Check the Network tab for failed API calls
   - Send me the error message

## Next Steps Based on ComputerEase Access

### If You Have API Access:
I'll build automatic bidirectional sync between ComputerEase and Sanity.

### If You Don't Have API Access:
I'll build a CSV import/export system that you can run weekly or as needed.

## Questions for Your IT/Admin

**Copy this and send to them:**

```
Hi! We're setting up online invoice payments for customers.

I need the following ComputerEase information:

1. What's our ComputerEase login URL?
2. Do we have the API Management module enabled?
   (Check: Configure > API Management in ComputerEase)
3. If yes to #2, can you provide:
   - API credentials (username/key and password/secret)
   - API base URL
4. If no to #2, can we get it enabled? Or can you show me how to:
   - Export unpaid invoices as CSV
   - Import payment records back into ComputerEase

Purpose: Allow customers to pay invoices online via our website.
```

## Current Status

✅ Invoice payment system is built and ready
✅ Sanity Studio is set up with invoice schema
✅ API endpoints are ready for invoice lookup and payment
✅ Stripe integration is configured (pending API keys)
⏳ ComputerEase integration pending credentials

Once you get the information from IT, I can complete the integration in about 1-2 hours of work.
