# Resend Email Setup Instructions

## Overview
Custom branded payment confirmation emails are now implemented. Follow these steps to activate them.

---

## Step 1: Sign Up for Resend (5 minutes)
1. Go to https://resend.com
2. Sign up for free account (100 emails/day free tier)
3. Verify your email address

---

## Step 2: Get Your API Key
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Copy the key (starts with `re_...`)

---

## Step 3: Add Domain (Optional but Recommended)

### Option A: Use Your Domain (Recommended)
1. In Resend dashboard, go to "Domains"
2. Add your domain: `snydermechanical.com`
3. Follow DNS setup instructions (add DNS records)
4. Wait for verification (usually 5-10 minutes)
5. Emails will come from: `payments@snydermechanical.com`

### Option B: Use Resend's Shared Domain (For Testing)
- Skip domain setup for now
- Emails will work immediately
- Will come from Resend's domain
- Good for testing before DNS setup

---

## Step 4: Add API Key to Environment Variables

### For Local Development:
Create or edit `.env` file in project root:
```
RESEND_API_KEY=re_your_actual_api_key_here
```

### For Production (Vercel):
1. Go to https://vercel.com
2. Select your project: "Snyder Mechanical Website"
3. Go to Settings → Environment Variables
4. Click "Add New"
5. Name: `RESEND_API_KEY`
6. Value: `re_your_actual_api_key_here`
7. Click "Save"
8. Redeploy your site (Vercel will prompt you)

---

## Email Flow

### Credit Card Payments:
- Customer completes payment
- Email sent immediately: "Payment Received"
- Includes receipt with invoice details

### ACH Bank Transfer Payments:
- Customer authorizes payment
- **1st Email** sent immediately: "ACH Payment Initiated"
- Payment processes (3-5 business days)
- **2nd Email** sent when cleared: "Payment Complete"

---

## Testing

Once API key is added:

1. Make a test payment using a real email you can access
2. Check your inbox within 30 seconds
3. Email subject will be: "Payment Confirmation - Invoice [NUMBER]"
4. Check spam folder if not in inbox (mark as "Not Spam")

---

## Email Templates

All emails include:
- Professional dark blue gradient header
- Company branding
- Payment details (amount, invoice number, date, method)
- Transaction ID
- Company contact information: (775) 738-5616
- Mobile-responsive HTML design

---

## Troubleshooting

**Emails not arriving?**
- Check Resend dashboard logs for delivery status
- Verify API key is correct in environment variables
- Check spam folder
- Make sure you redeployed after adding environment variable

**Wrong "from" email?**
- If domain not verified, Resend uses their shared domain
- Verify your domain in Resend dashboard for branded emails

**Need help?**
- Resend has excellent docs: https://resend.com/docs
- Check Resend dashboard "Logs" to see email delivery status

---

## Free Tier Limits
- 100 emails per day (should be plenty)
- 3,000 emails per month
- Upgrade if you need more (very affordable)

---

## Important Notes
- Code is already implemented and deployed
- Just need to add the API key to activate
- Emails use your new dark blue and grey theme
- Professional, branded appearance
- No Stripe Dashboard configuration needed
- Emails are non-blocking (payment succeeds even if email fails)
