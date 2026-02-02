# Complete Sanity Studio Setup - Snyder Mechanical

## All Schemas You Have Available

Your project has these 9 schemas ready to use:

1. **company** - Company information (name, address, phone, hours)
2. **serviceCategory** - Service categories (residential, commercial, pumps)
3. **review** - Customer reviews
4. **reviewStats** - Review statistics
5. **portfolioProject** - Portfolio projects
6. **detailedService** - Detailed service pages (heating, cooling, plumbing)
7. **certification** - Certifications and trust badges
8. **invoice** - Invoices for payment system ⭐ (Required for payments)
9. **about** - About page content

## Quick Setup Steps

### Step 1: Copy All Schemas to Studio

After creating your Sanity Studio, run these commands:

```bash
# Navigate to your studio directory
cd [your-studio-name]  # e.g., cd snyder-mechanical-studio

# Copy ALL schema files
cp ../sanity-schemas/*.js schemas/

# This copies:
# - company.js
# - serviceCategory.js
# - review.js
# - reviewStats.js
# - portfolioProject.js
# - detailedService.js
# - certification.js
# - invoice.js
```

### Step 2: Update Schema Index File

Open `schemas/index.ts` or `schemas/index.js` in your studio and replace the contents with:

```javascript
// Import all schema files
import company from './company'
import serviceCategory from './serviceCategory'
import review from './review'
import reviewStats from './reviewStats'
import portfolioProject from './portfolioProject'
import detailedService from './detailedService'
import certification from './certification'
import invoice from './invoice'

// Export all schemas
export const schemaTypes = [
  company,
  serviceCategory,
  review,
  reviewStats,
  portfolioProject,
  detailedService,
  certification,
  invoice,
]
```

### Step 3: Start Your Studio

```bash
npm run dev
```

Studio opens at: `http://localhost:3333`

## What You'll See in Sanity Studio

Once configured, your studio sidebar will show:

📋 **Content Types:**
- Company (singleton)
- Service Categories
- Reviews
- Review Stats (singleton)
- Portfolio Projects
- Detailed Services
- Certifications
- **Invoices** ⭐ (for payment system)

## Priority: Create Test Invoice First

For the **invoice payment system** to work, you MUST create at least one test invoice:

### Create Test Invoice in Studio:

1. Click **"Invoice"** in sidebar
2. Click **"Create"**
3. Fill in:
   ```
   Invoice Number: INV-00001
   Customer Name: Test Customer
   Customer Email: test@example.com
   Amount: 150.00
   Description: Test HVAC service
   Service Date: (today)
   Due Date: (today)
   Status: unpaid
   ```
4. Optionally add line items:
   - Description: "Furnace Inspection"
   - Quantity: 1
   - Unit Price: 95.00
   - Total: 95.00
5. Click **"Publish"** (not just save!)

### Test Invoice Number for Website:
- **Invoice Number**: `INV-00001`
- **Email**: `test@example.com`

## Optional: Populate Other Content

You can also create content for your website:

### Company Information (Recommended)
- Go to "Company" document
- Fill in your business details
- This will eventually replace the JSON file

### Service Categories
- Create documents for Residential, Commercial, Pumps services
- Add service descriptions and features

### Reviews
- Add customer testimonials
- These will display on your homepage

### Portfolio Projects
- Add project photos and descriptions
- Showcase your work

### Certifications
- Add trust badges (Licensed & Insured, BBB, etc.)

## Get Your Sanity API Token

**Required for invoice payments to work:**

1. Go to: https://www.sanity.io/manage
2. Select project: **huzovqoq**
3. Click **"API"** → **"Tokens"**
4. Click **"Add API token"**
5. Settings:
   - Name: `Invoice Payment API`
   - Permissions: **Editor** (not Viewer!)
6. Copy the token (starts with `sk...`)
7. Add to `.env.local`:
   ```
   SANITY_API_TOKEN=sk_your_token_here
   ```
8. Also add to Vercel environment variables

## Environment Variables Checklist

Make sure you have all these in `.env.local`:

```bash
# Sanity Frontend (already set)
VITE_SANITY_PROJECT_ID=huzovqoq
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Sanity Backend (needs API token)
SANITY_PROJECT_ID=huzovqoq
SANITY_DATASET=production
SANITY_API_TOKEN=sk_your_token_here  # ⚠️ Get this from Sanity dashboard

# Stripe (needs to be set up)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # ⚠️ Get from Stripe dashboard
STRIPE_SECRET_KEY=sk_test_...  # ⚠️ Get from Stripe dashboard
STRIPE_WEBHOOK_SECRET=whsec_...  # ⚠️ Get after creating webhook
```

## Deployment Checklist

Before deploying to production:

### In Sanity Studio:
- [ ] All schemas copied and configured
- [ ] Test invoice created and published
- [ ] API token generated (Editor permissions)

### In Your Website:
- [ ] `.env.local` has all environment variables
- [ ] Test invoice lookup works locally
- [ ] Test payment works with Stripe test card

### In Vercel:
- [ ] All environment variables added to Vercel dashboard
- [ ] Variables include both Sanity and Stripe keys
- [ ] Redeploy after adding variables

### In Stripe:
- [ ] Account created
- [ ] Test API keys obtained
- [ ] Webhook created pointing to your Vercel URL
- [ ] Webhook secret added to environment variables

## Testing Your Setup

### Test 1: Sanity Connection
```bash
# In your main project directory
npm run dev
```
Open your website and see if it connects to Sanity.

### Test 2: Invoice Lookup
1. Go to Resources page
2. Enter: `INV-00001` and `test@example.com`
3. Should display invoice details

### Test 3: Payment (after Stripe setup)
1. Use test card: `4242 4242 4242 4242`
2. Complete payment
3. Check Sanity Studio - invoice status should update to "paid"
4. Check Stripe dashboard - payment should appear

## Troubleshooting

**"Invoice not found"**
- Make sure invoice is **Published** (not just saved as draft)
- Check invoice number matches exactly (INV-00001)
- Verify email matches exactly

**Studio schemas not showing**
- Make sure you copied all .js files to schemas/
- Check schemas/index.js imports are correct
- Restart studio: stop and run `npm run dev` again

**Can't create invoice**
- Check that invoice.js was copied correctly
- Verify it's imported in schemas/index.js
- Clear browser cache and refresh studio

**API token issues**
- Token must have **Editor** permissions (not just Viewer)
- Token must be from the correct project (huzovqoq)
- Token must be added to both `.env.local` AND Vercel

## Next Steps

1. ✅ Copy all schemas to studio
2. ✅ Update schemas/index.js
3. ✅ Start studio and create test invoice
4. ✅ Get Sanity API token
5. ✅ Update .env.local with token
6. ⏭️ Set up Stripe account (see INVOICE_PAYMENT_SETUP.md)
7. ⏭️ Test complete payment flow
8. ⏭️ Deploy to production

## Quick Reference

```bash
# Copy schemas
cd [studio-directory]
cp ../sanity-schemas/*.js schemas/

# Start studio
npm run dev

# Start website (in another terminal)
cd ..
npm run dev
```

**Test Invoice:**
- Number: `INV-00001`
- Email: `test@example.com`

**Test Card:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
