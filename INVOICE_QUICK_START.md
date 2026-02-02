# Invoice Payment System - Quick Start

## What Was Built

A complete invoice payment system that allows customers to:
1. Look up their invoices using invoice number + email
2. View invoice details securely
3. Pay invoices online with credit/debit cards
4. Receive instant payment confirmation

## Files Created

### Backend API Routes (`/api/invoice/`)
- `lookup.js` - Finds invoices and verifies customer email
- `create-payment.js` - Creates Stripe payment intent
- `confirm-payment.js` - Confirms successful payments
- `webhook.js` - Handles Stripe webhook events

### Frontend Components (`/src/components/resources/`)
- `InvoicePayment.jsx` - Main component orchestrating the flow
- `InvoiceLookupForm.jsx` - Form to search for invoices
- `InvoiceDisplay.jsx` - Displays invoice details
- `StripePaymentForm.jsx` - Secure payment form with Stripe Elements

### Sanity Schema
- `sanity-schemas/invoice.js` - Invoice data structure for Sanity CMS

### Documentation
- `INVOICE_PAYMENT_SETUP.md` - Detailed setup instructions
- `INVOICE_QUICK_START.md` - This file

## Next Steps (In Order)

### 1. Set Up Stripe Account (5 minutes)
- Sign up at https://stripe.com
- Get test API keys from dashboard
- Add keys to `.env.local` and Vercel

### 2. Configure Sanity (10 minutes)
- Get Sanity write token from project settings
- Add token to `.env.local` and Vercel
- Deploy Sanity schemas with the new invoice schema

### 3. Create Test Invoice (2 minutes)
- Open Sanity Studio
- Create an invoice with number `INV-12345`
- Use your email and set status to "unpaid"

### 4. Test Locally (5 minutes)
- Run `npm run dev`
- Go to Resources page
- Try paying the test invoice
- Use test card: `4242 4242 4242 4242`

### 5. Set Up Webhooks (5 minutes)
- Create webhook in Stripe dashboard
- Point to: `https://your-domain.com/api/invoice/webhook`
- Add webhook secret to environment variables

### 6. Deploy to Vercel (2 minutes)
- Ensure all environment variables are set in Vercel
- Push changes to trigger deployment
- Test on production URL

## Environment Variables Needed

```bash
# Frontend (Vite)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Backend (Vercel Functions)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

## Testing Checklist

- [ ] Invoice lookup with valid invoice number and email
- [ ] Invoice lookup with wrong email (should fail)
- [ ] Invoice lookup with wrong number (should fail)
- [ ] Payment with test card 4242 4242 4242 4242
- [ ] Verify invoice status updates to "paid" in Sanity
- [ ] Verify payment appears in Stripe dashboard
- [ ] Test with already-paid invoice (should show paid message)
- [ ] Test on mobile device

## Stripe Test Cards

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |
| 4000 0000 0000 0002 | Declined payment |

Use any future expiry, any 3-digit CVC, any ZIP code.

## Customer Experience

1. Customer receives invoice via email (you send this separately)
2. Email includes invoice number (e.g., INV-12345)
3. Customer goes to website Resources page
4. Enters invoice number and email
5. Views invoice details
6. Pays securely with credit card
7. Receives instant confirmation
8. Invoice status automatically updates in your system

## Security Features

✅ Email verification required to view invoice
✅ HTTPS encryption on all requests
✅ Stripe PCI-compliant payment processing
✅ No card details stored on your server
✅ Webhook signature verification
✅ Input validation and sanitization

## Common Issues & Solutions

**"Invoice not found"**
- Check invoice number format (INV-XXXXX)
- Verify email matches exactly
- Ensure invoice exists in Sanity

**Payment button not working**
- Check Stripe publishable key is set
- Look for errors in browser console
- Verify Stripe.js is loading

**Invoice status not updating**
- Check Sanity write token permissions
- Verify webhook is configured correctly
- Check Vercel function logs

## Going Live

When ready for production:

1. Get live Stripe API keys (remove `_test_`)
2. Update environment variables
3. Create live webhook endpoint
4. Test with real card (can refund immediately)
5. Monitor Stripe dashboard

## Support Resources

- Setup Guide: `INVOICE_PAYMENT_SETUP.md`
- Stripe Docs: https://stripe.com/docs
- Sanity Docs: https://www.sanity.io/docs

## Notes

- The system is designed to be extended with email notifications
- You can add PDF invoice generation in the future
- Consider adding payment history lookup later
- Webhooks ensure payment status is always accurate
