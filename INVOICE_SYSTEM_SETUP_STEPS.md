# Invoice Payment System - Setup Steps

## What I Fixed For You

✅ **Fixed Vercel API Routes** - Updated `vercel.json` to prevent API routes from being redirected to index.html  
✅ **Improved Error Logging** - Added detailed logging to help diagnose issues

## What You Need To Do (30 minutes)

### Step 1: Get Stripe Test Keys (5 minutes)

1. Go to: https://dashboard.stripe.com/test/apikeys
2. If you don't have a Stripe account:
   - Click "Sign up" 
   - Complete registration (it's free for testing)
3. Once logged in:
   - Copy the **Publishable key** (starts with `pk_test_`)
   - Click "Reveal test key" for the **Secret key** (starts with `sk_test_`)
4. Open `.env.local` in your project
5. Replace the placeholder values:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PASTE_YOUR_KEY_HERE
   STRIPE_SECRET_KEY=sk_test_PASTE_YOUR_KEY_HERE
   ```
6. Save the file

### Step 2: Create Test Invoice in Sanity (5 minutes)

1. Go to: https://snyder-mechanical.sanity.studio/
2. Log in with your Sanity account
3. Click **"Invoice"** in the left sidebar
4. Click the **"Create"** button (+ icon)
5. Fill in these exact values:
   - **Invoice Number:** `INV-00001`
   - **Customer Name:** `Test Customer`
   - **Customer Email:** `test@example.com` (must be lowercase!)
   - **Amount:** `150`
   - **Description:** `Test invoice for payment system`
   - **Status:** Select `unpaid` from dropdown
   - **Service Date:** Click and select today's date
   - **Due Date:** Click and select 30 days from today
6. Click **"Publish"** (NOT just "Save draft" - it must be Published!)
7. You should see a green "Published" badge

### Step 3: Add Environment Variables to Vercel (10 minutes)

1. Go to: https://vercel.com/dashboard
2. Find and click on your **Snyder Mechanical** project
3. Click **"Settings"** tab at the top
4. Click **"Environment Variables"** in the left sidebar
5. Add each variable below by:
   - Clicking "Add New"
   - Entering the Name and Value
   - Selecting all three environments: **Production**, **Preview**, and **Development**
   - Clicking "Save"

**Add these 7 variables:**

| Name | Value | Where to get it |
|------|-------|----------------|
| `SANITY_PROJECT_ID` | `huzovqoq` | Already know this |
| `SANITY_DATASET` | `production` | Already know this |
| `SANITY_API_TOKEN` | Your long token starting with `sk...` | Copy from `.env.local` line 10 |
| `VITE_SANITY_PROJECT_ID` | `huzovqoq` | Same as above |
| `VITE_SANITY_DATASET` | `production` | Same as above |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your `pk_test_...` key | From Step 1 |
| `STRIPE_SECRET_KEY` | Your `sk_test_...` key | From Step 1 |

**Note:** Make sure to select all 3 environments (Production, Preview, Development) for EACH variable!

### Step 4: Deploy and Test (10 minutes)

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix invoice payment system API routes and error logging"
   git push origin main
   ```

2. **Wait for Vercel deployment:**
   - Go to your Vercel dashboard
   - Watch the deployment progress (usually takes 1-2 minutes)
   - Wait for "Ready" status

3. **Test locally first (optional but recommended):**
   - Make sure your dev server is running: `npm run dev`
   - Go to: http://localhost:5173/resources
   - Scroll down to "Pay Your Invoice"
   - Enter:
     - Invoice Number: `INV-00001`
     - Email: `test@example.com`
   - Click "Find My Invoice"
   - You should see the invoice details!

4. **Test on production:**
   - Go to: https://snyder-mechanical.vercel.app/resources
   - Scroll down to "Pay Your Invoice"
   - Enter:
     - Invoice Number: `INV-00001`
     - Email: `test@example.com`
   - Click "Find My Invoice"
   - You should see the invoice details and payment form!

---

## Verification Checklist

Check off each item as you complete it:

- [ ] Stripe account created and test keys obtained
- [ ] `.env.local` updated with real Stripe keys
- [ ] Test invoice created and **Published** in Sanity Studio
- [ ] All 7 environment variables added to Vercel dashboard
- [ ] All environment variables set for Production, Preview, AND Development
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel deployment completed (shows "Ready")
- [ ] Invoice lookup tested locally (if running dev server)
- [ ] Invoice lookup tested on production site
- [ ] Invoice details display correctly
- [ ] Payment form appears (Stripe card element loads)

---

## Troubleshooting

### "Invoice not found" error
**Cause:** Invoice doesn't exist or email doesn't match  
**Fix:**
- Go to Sanity Studio and verify the invoice exists
- Make sure it's **Published** (not just saved as draft)
- Verify email is exactly `test@example.com`
- Try deleting and recreating the invoice

### "An error occurred" error
**Cause:** Missing environment variables or API route issue  
**Fix:**
- Check Vercel dashboard > Settings > Environment Variables
- Verify all 7 variables are present
- Make sure they're set for all 3 environments
- Check Vercel deployment logs for error details
- Press F12 in browser, check Console tab for errors

### Payment form doesn't load
**Cause:** Invalid Stripe keys  
**Fix:**
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` starts with `pk_test_`
- Verify `STRIPE_SECRET_KEY` starts with `sk_test_`
- Make sure you're copying from the **Test mode** keys in Stripe dashboard
- Redeploy after updating environment variables

### Changes not showing up
**Cause:** Deployment hasn't finished or browser cache  
**Fix:**
- Check Vercel dashboard for deployment status
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Try in incognito/private browsing mode
- Wait 1-2 minutes for CDN to update

---

## After Everything Works

Once the invoice payment is working:

1. **Test with Stripe test card:**
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

2. **Check invoice status:**
   - After payment, go back to Sanity Studio
   - The invoice status should change to "paid"

3. **Next steps:**
   - Set up real Stripe webhook for production
   - Get ComputerEase credentials for automatic invoice sync
   - Test the complete flow end-to-end

---

## Need Help?

If you get stuck:

1. Check browser console (F12) for error messages
2. Check Vercel deployment logs in dashboard
3. Verify all environment variables are correct
4. Make sure test invoice is Published in Sanity
5. Try testing locally first before production

The most common issue is missing or incorrect environment variables on Vercel!
