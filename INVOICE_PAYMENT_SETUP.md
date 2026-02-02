# Invoice Payment System - Setup Guide

This guide will walk you through setting up the invoice payment system for Snyder Mechanical website.

## Prerequisites

- Stripe account (sign up at https://stripe.com)
- Sanity CMS project set up
- Vercel deployment configured

## Step 1: Set Up Stripe Account

1. **Create a Stripe Account**
   - Go to https://stripe.com and sign up
   - Complete account verification

2. **Get Your API Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

3. **Update Environment Variables**
   
   Add these to your `.env.local` file:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   ```

   Also add to Vercel environment variables:
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add both `VITE_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`

## Step 2: Configure Stripe Webhooks

1. **Get Your Webhook URL**
   - Your webhook URL will be: `https://your-domain.com/api/invoice/webhook`
   - Example: `https://snydermechanical.com/api/invoice/webhook`

2. **Create Webhook in Stripe**
   - Go to https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - Enter your webhook URL
   - Select events to listen to:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Click "Add endpoint"

3. **Get Webhook Secret**
   - Click on your newly created webhook
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add to `.env.local`:
     ```
     STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
     ```
   - Also add to Vercel environment variables

## Step 3: Set Up Sanity Invoice Schema

1. **Add Invoice Schema to Sanity Studio**
   
   The invoice schema has already been created in `sanity-schemas/invoice.js`

2. **Deploy Sanity Schema**
   ```bash
   # In your Sanity Studio directory
   sanity deploy
   ```

3. **Get Sanity Write Token**
   - Go to https://sanity.io/manage
   - Select your project
   - Go to API settings
   - Create a new token with **Write** access
   - Copy the token

4. **Update Environment Variables**
   
   Add to `.env.local`:
   ```
   SANITY_API_TOKEN=your_write_token_here
   ```
   
   Also add to Vercel environment variables

## Step 4: Create Test Invoice in Sanity

1. Open your Sanity Studio
2. Create a new Invoice document:
   - Invoice Number: `INV-12345`
   - Customer Name: Your name
   - Customer Email: Your email
   - Amount: `100.00`
   - Description: Test invoice
   - Status: `unpaid`
   - Add a line item if desired

## Step 5: Test the Payment Flow

### Using Stripe Test Cards

Stripe provides test card numbers for different scenarios:

- **Successful payment**: `4242 4242 4242 4242`
- **Requires authentication**: `4000 0025 0000 3155`
- **Declined card**: `4000 0000 0000 0002`

For all test cards:
- Use any future expiration date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)
- Use any ZIP code (e.g., 12345)

### Test Steps

1. **Test Invoice Lookup**
   - Go to your website's Resources page
   - Scroll to "Pay Your Invoice" section
   - Enter invoice number: `INV-12345`
   - Enter the email you used in Sanity
   - Click "Find My Invoice"
   - Verify invoice details are displayed correctly

2. **Test Payment**
   - Use test card `4242 4242 4242 4242`
   - Enter any future expiration date
   - Enter any 3-digit CVC
   - Click "Pay" button
   - Verify payment success screen appears

3. **Verify in Stripe Dashboard**
   - Go to https://dashboard.stripe.com/test/payments
   - You should see your test payment

4. **Verify in Sanity**
   - Go to your Sanity Studio
   - Open the invoice
   - Status should be updated to "paid"
   - "Paid At" timestamp should be set

## Step 6: Test Webhooks (Optional but Recommended)

### Using Stripe CLI

1. **Install Stripe CLI**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Other platforms: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward Webhooks to Local Server**
   ```bash
   stripe listen --forward-to localhost:3000/api/invoice/webhook
   ```
   
   Copy the webhook secret that's displayed and add to `.env.local`

4. **Trigger Test Webhook**
   ```bash
   stripe trigger payment_intent.succeeded
   ```

## Step 7: Go Live

Once testing is complete:

1. **Switch to Live Mode**
   - Get live API keys from https://dashboard.stripe.com/apikeys
   - Update environment variables with live keys (remove `_test_`)

2. **Create Live Webhook**
   - Create webhook in live mode with your production URL
   - Update webhook secret in environment variables

3. **Test with Real Card**
   - Use a real credit card (you can use your own and refund immediately)
   - Verify end-to-end flow works in production

## Troubleshooting

### Invoice Not Found
- Verify invoice number format is correct (INV-XXXXX)
- Verify email matches exactly (case-insensitive)
- Check invoice exists in Sanity

### Payment Not Processing
- Verify Stripe keys are correct
- Check browser console for errors
- Verify client secret is being generated

### Webhook Not Working
- Verify webhook URL is correct
- Check webhook secret is correct
- Look at webhook logs in Stripe dashboard

### Invoice Status Not Updating
- Verify Sanity write token has correct permissions
- Check API logs in Vercel
- Verify invoice ID is correct

## Security Best Practices

1. **Never commit** `.env.local` to git (already in `.gitignore`)
2. **Use test mode** for all development and testing
3. **Rotate API keys** if they're ever exposed
4. **Monitor Stripe dashboard** for suspicious activity
5. **Set up email notifications** in Stripe for payments
6. **Implement rate limiting** for production (consider using Vercel's rate limiting)

## Support

If you encounter issues:
1. Check Vercel function logs
2. Check Stripe dashboard logs
3. Check Sanity Studio data
4. Review browser console errors

For Stripe-specific issues: https://stripe.com/support
For Sanity issues: https://www.sanity.io/help
