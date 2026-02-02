# Sanity Studio Setup for Invoice Payment

## Step 1: Create Sanity Studio (if not already done)

Run these commands from your main project directory:

```bash
cd "/Users/rorybylund/Snyder Mechanical Website"

# Create Sanity Studio
npm create sanity@latest -- \
  --project huzovqoq \
  --dataset production \
  --template clean
```

## Step 2: Navigate to Studio Directory

The studio will be created with a name based on your project. Find it:

```bash
# It might be named something like:
cd snyder-mechanical  # or similar based on prompts
# OR
ls -la  # to see what directory was created
```

## Step 3: Copy Invoice Schema to Studio

Once you're in the studio directory:

```bash
# Copy invoice schema from parent directory
cp ../sanity-schemas/invoice.js schemas/

# Also copy other schemas if you want to manage all content in Sanity
cp ../sanity-schemas/*.js schemas/
```

## Step 4: Configure Sanity Studio Schema

Edit `schemas/index.ts` (or `index.js` if JavaScript):

```typescript
import invoice from './invoice'

export const schemaTypes = [
  invoice,
  // Add other schemas here as you copy them
]
```

## Step 5: Install Dependencies and Start Studio

```bash
# If not already in the studio directory
npm install
npm run dev
```

The studio will open at `http://localhost:3333`

## Step 6: Create Test Invoice

In Sanity Studio:

1. Click "Invoice" in the sidebar
2. Click "Create new document"
3. Fill in:
   - **Invoice Number**: `INV-00001`
   - **Customer Name**: `Test Customer`
   - **Customer Email**: `test@example.com` (or your email)
   - **Amount**: `150.00`
   - **Description**: `Test HVAC service - Furnace inspection and tune-up`
   - **Service Date**: Today's date
   - **Due Date**: Today's date
   - **Status**: `unpaid`

4. Optionally add line items:
   - Click "Add item" under Line Items
   - Description: `Furnace Inspection`
   - Quantity: `1`
   - Unit Price: `95.00`
   - Total: `95.00`
   
   - Click "Add item" again
   - Description: `Parts & Materials`
   - Quantity: `1`
   - Unit Price: `55.00`
   - Total: `55.00`

5. Click **"Publish"**

## Step 7: Get Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project (huzovqoq)
3. Go to **API** → **Tokens**
4. Click **"Add API token"**
5. Name it: `Invoice Payment API`
6. Permissions: **Editor** (Write access)
7. Copy the token

## Step 8: Update Environment Variables

In your main project's `.env.local`:

```bash
# Already updated:
VITE_SANITY_PROJECT_ID=huzovqoq
SANITY_PROJECT_ID=huzovqoq

# Add your API token:
SANITY_API_TOKEN=sk_your_token_here
```

Also add these to **Vercel Environment Variables**:
- `SANITY_PROJECT_ID=huzovqoq`
- `SANITY_DATASET=production`
- `SANITY_API_TOKEN=sk_your_token_here`

## Step 9: Test on Website

1. Make sure your website is running:
   ```bash
   cd "/Users/rorybylund/Snyder Mechanical Website"
   npm run dev
   ```

2. Go to http://localhost:5173/resources

3. Scroll to "Pay Your Invoice" section

4. Enter:
   - Invoice Number: `INV-00001`
   - Email: `test@example.com`

5. Click "Find My Invoice"

6. Test payment with Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVC: `123`
   - ZIP: `12345`

## Troubleshooting

**If Studio already exists but you can't find it:**
```bash
# List directories in current location
ls -la

# The studio might be named based on your project
# Common names: snyder-mechanical, studio-*, or sanity-*
```

**If invoice schema isn't showing in Studio:**
- Make sure you copied the schema file
- Check that it's imported in schemas/index.ts
- Restart the studio (`npm run dev`)

**If invoice lookup fails:**
- Verify Sanity project ID is correct in .env.local
- Check that API token has write permissions
- Ensure invoice is published in Sanity (not just saved as draft)

## Quick Command Reference

```bash
# Create new Sanity Studio (if needed)
cd "/Users/rorybylund/Snyder Mechanical Website"
npm create sanity@latest -- --project huzovqoq --dataset production --template clean

# Start Sanity Studio (navigate to the created directory first)
cd [studio-directory-name]
npm run dev

# Start main website (in another terminal)
cd "/Users/rorybylund/Snyder Mechanical Website"
npm run dev
```

## What's Next?

After creating and testing with the test invoice:

1. Set up Stripe account and get API keys (see INVOICE_PAYMENT_SETUP.md)
2. Add Stripe keys to .env.local
3. Test the complete payment flow
4. Set up Stripe webhooks
5. Deploy to production
