# ACH Bank Account Setup for Production
## Secure Customer Bank Connections Guide

---

## What You Need to Know

Right now, your ACH bank payment system works great in **test mode**. Test bank accounts verify instantly, and everything processes smoothly.

But when you go to **production** (real customer bank accounts), there's an important security step: **bank account verification**. You can't just accept routing and account numbers without verifying the customer actually owns that account.

**This guide explains:**
- Why verification is required
- Two ways to verify bank accounts securely
- Which option is best for your business
- Step-by-step setup instructions

---

## Current Situation (Test Mode)

### How It Works Now:

1. Customer enters routing number and account number
2. System submits to Stripe
3. Stripe recognizes it's a test account
4. Payment processes immediately
5. Invoice marked as "Processing"

**Why it's easy:** Stripe automatically verifies test routing numbers (like `110000000`).

### What Changes for Production:

When you switch to production mode, Stripe can't instantly verify real bank accounts. Here's why:

**Security Requirements:**
- Must prove customer owns the bank account
- Must prevent fraud (someone using stolen account numbers)
- Must comply with NACHA rules (ACH network regulations)
- Must protect your business from chargebacks

**Bottom line:** You need a verification method before you can charge real bank accounts.

---

## Two Options for Production

You have two choices for how to collect and verify customer bank accounts:

### Option 1: Stripe Financial Connections (RECOMMENDED)

**What it is:** Customers log into their bank directly through Stripe's secure interface (like "Login with Google" but for banks).

**How it works:**
1. Customer clicks "Pay with Bank Account"
2. Stripe shows a list of banks
3. Customer selects their bank
4. Customer logs into their bank (redirected to bank's actual website)
5. Customer authorizes the connection
6. Returns to your site with verified account
7. Payment processes immediately

**Benefits:**
- Instant verification (no waiting 1-2 days)
- More secure (customer never types account numbers on your site)
- Lower fraud risk (verified ownership)
- Better customer experience (faster, easier)
- Higher completion rates (customers don't abandon)
- Bank-level security throughout
- Works with 10,000+ banks

**Costs:**
- Same 0.8% fee (max $5)
- No extra charges

**When to use:**
- You want the best customer experience
- You want instant verification
- You want maximum security
- You want to match what big companies do

---

### Option 2: Manual Entry with Micro-deposits

**What it is:** Customer types routing and account numbers manually, then Stripe sends 2 tiny test deposits to verify.

**How it works:**
1. Customer enters routing number and account number
2. System submits to Stripe
3. Stripe sends 2 small deposits (like $0.32 and $0.45) to customer's account
4. Customer waits 1-2 business days
5. Customer checks bank statement for deposit amounts
6. Customer comes back to your site and enters the amounts
7. If correct, account is verified
8. Payment processes

**Benefits:**
- Simple to implement (minimal code changes from what you have)
- Works with all banks
- No complex integration needed
- Customers familiar with the process

**Downsides:**
- Takes 1-2 business days (slow)
- Customer has to come back and verify
- Many customers forget or don't complete
- Higher fraud risk (no ownership verification)
- Lower completion rates (30-40% never finish)
- Extra work for your customer service

**Costs:**
- Same 0.8% fee (max $5)
- No extra charges

**When to use:**
- You need the absolute simplest implementation
- You can't integrate Financial Connections
- Your customers prefer traditional methods
- You're okay with slower payments

---

## Side-by-Side Comparison

| Feature | Financial Connections | Manual Entry + Micro-deposits |
|---------|----------------------|------------------------------|
| **Customer enters account number** | No (logs into bank) | Yes (types it manually) |
| **Verification time** | Instant | 1-2 business days |
| **Customer experience** | Fast and easy | Slow, must return later |
| **Fraud risk** | Very low | Moderate |
| **Completion rate** | 80-90% | 30-40% |
| **Your business sees account number** | Never (tokenized) | Through Stripe only |
| **Bank-level security** | Yes | Through Stripe |
| **Code changes needed** | Medium | Small |
| **Setup time** | 1-2 hours | 30 minutes |
| **Cost to you** | Same (0.8%) | Same (0.8%) |

---

## Our Recommendation

### Use Financial Connections

**Why?**

For a professional business like Snyder Mechanical, Financial Connections is the better choice:

1. **Faster payments**: Instant verification means immediate payment processing
2. **Better customer experience**: No waiting, no coming back to verify
3. **More secure**: Verified bank ownership reduces fraud
4. **Higher success rate**: 2-3x more customers complete payment
5. **Modern approach**: What customers expect from professional companies
6. **Less support**: No "I forgot to verify" calls

**Don't use manual entry unless:**
- You absolutely need the simplest possible implementation
- You can't spend 1-2 hours integrating Financial Connections
- Your customers specifically request traditional methods

---

## How Financial Connections Works

Here's what your customer sees:

### Step-by-Step Customer Experience:

**Step 1: Customer starts payment**
- Goes to your invoice payment page
- Enters invoice number and email
- Selects "ACH Bank Transfer"
- Sees lower fee (0.8% vs 2.9% for cards)

**Step 2: Stripe Financial Connections opens**
- A secure Stripe window appears
- Shows list of banks with search
- Customer clicks their bank

**Step 3: Customer logs into their bank**
- Redirected to their bank's actual website
- Uses their normal online banking login
- Bank verifies it's really them (2FA, security questions, etc.)

**Step 4: Customer authorizes**
- Bank asks "Allow Snyder Mechanical to verify your account?"
- Customer clicks "Authorize"
- No account numbers shared - just verification

**Step 5: Back to your site**
- Returns to invoice payment page
- Account is verified and connected
- Payment processes immediately
- Customer sees confirmation

**Step 6: Done**
- Invoice marked "Processing"
- Money transfers in 3-5 days
- Customer gets confirmation email

**Total time: 2-3 minutes**

### What Happens Behind the Scenes:

```
Customer → Stripe → Bank's Website → Bank Verifies → Stripe Gets Token → Your Site → Payment Processed
```

**Security features:**
- Customer never types account numbers on your site
- Account numbers never touch your servers
- Stripe only stores a secure token
- Bank verifies customer identity
- OAuth security (same as "Login with Google")

---

## Setup Instructions: Financial Connections

### Prerequisites:

Before you start:
- Stripe account in good standing
- Website already accepting test ACH payments (you have this)
- Access to Stripe Dashboard
- 1-2 hours for implementation

### Part 1: Enable in Stripe Dashboard

**Step 1: Log into Stripe**
- Go to https://dashboard.stripe.com
- Make sure you're in "Test mode" first (for testing)

**Step 2: Enable ACH Direct Debit**
- Click "Settings" in left menu
- Click "Payment methods"
- Find "ACH Direct Debit"
- Toggle it ON
- Click "Save changes"

**Step 3: Enable Financial Connections**
- In same "Payment methods" section
- Find "Financial Connections"
- Toggle it ON
- Accept Terms of Service (if prompted)
- Click "Save changes"

**Step 4: Configure Settings** (optional)
- Click "Configure" next to Financial Connections
- Choose which banks to display (leave default = all)
- Enable/disable account balance data (optional)
- Save settings

---

### Part 2: Update Your Code

You'll need to modify two files:

#### File 1: Frontend Component

**File:** `src/components/resources/ACHPaymentForm.jsx`

**What to change:**

Current approach:
- Manual input fields for routing number
- Manual input fields for account number
- Form submission

New approach:
- Stripe Financial Connections button
- Handles bank login automatically
- Returns verified payment method

**Key code changes needed:**

1. Import Financial Connections elements from Stripe
2. Replace manual form with "Connect Bank Account" button
3. Handle successful connection event
4. Send verified payment method ID to backend

#### File 2: Backend API

**File:** `api/invoice/create-ach-payment.js`

**What to change:**

Current approach:
- Receives routing number and account number
- Creates payment method with raw numbers
- Attempts to verify

New approach:
- Receives Financial Connections payment method ID
- Payment method is already verified
- Creates payment intent with verified method

**Key code changes needed:**

1. Accept `paymentMethodId` instead of `accountNumber` and `routingNumber`
2. Remove manual payment method creation
3. Use verified payment method directly
4. Remove verification logic (already verified)

---

### Part 3: Test Before Going Live

**Step 1: Test in Stripe Test Mode**

Use Stripe's test bank accounts:
- Search for "Test Bank" in Financial Connections
- Log in with username: `user_good`
- Password: `pass_good`
- Verify flow works end-to-end

**Step 2: Test with Real Bank (Optional)**

Before going fully live:
- Switch to Stripe Live mode
- Use your own bank account
- Make a small test payment ($5-10)
- Verify money transfers correctly
- Check invoice updates properly

**Step 3: Monitor First Few Transactions**

When you first go live:
- Watch Stripe Dashboard closely
- Check each payment processes correctly
- Verify webhooks update invoices
- Look for any error patterns

---

## Setup Instructions: Manual Entry (Simpler Option)

If you decide to use manual entry with micro-deposits instead:

### Part 1: Enable in Stripe Dashboard

**Step 1: Log into Stripe**
- Go to https://dashboard.stripe.com
- Start in "Test mode"

**Step 2: Enable ACH Direct Debit**
- Settings → Payment methods
- Enable "ACH Direct Debit"
- Save changes

**Step 3: Configure Micro-deposits**
- Click "Configure" next to ACH Direct Debit
- Verification method: "Micro-deposits"
- Choose "Amounts" or "Descriptor code" method
- Save settings

---

### Part 2: Update Your Code

#### File 1: Backend API

**File:** `api/invoice/create-ach-payment.js`

**Key changes needed:**

1. **Remove `confirm: true`** from payment intent creation
   - Payment can't be confirmed until verified

2. **Update invoice status** to "pending_verification"
   - Not "processing" yet

3. **Add verification check** before allowing payment

#### File 2: Create Verification Component

**New file:** `src/components/resources/ACHVerification.jsx`

Create a new page where customers:
- Enter the two micro-deposit amounts
- Submit for verification
- See success/error messages

#### File 3: Add Verification API

**New file:** `api/invoice/verify-microdeposits.js`

Handle:
- Customer submitting deposit amounts
- Verifying with Stripe
- Updating invoice status on success
- Limiting verification attempts (prevent guessing)

---

### Part 3: Customer Communication

**Email Template 1: Payment Initiated**

Subject: ACH Payment Submitted - Verification Required

```
Hi [Customer Name],

Your ACH payment for Invoice [Number] has been submitted!

Next steps:
1. Check your bank statement in 1-2 business days
2. Look for 2 small deposits from "SNYDER MECHANICAL" or "STRIPE"
3. The amounts will be like $0.32 and $0.45
4. Return to [verification link] and enter the amounts
5. Your payment will be processed once verified

Questions? Call us at (775) 738-5616

Thank you!
Snyder Mechanical
```

**Email Template 2: Verification Reminder**

Send 2 days after initial payment:

```
Hi [Customer Name],

Reminder: Please verify your ACH payment for Invoice [Number]

The micro-deposits should now appear in your bank account.

Verify now: [verification link]

Questions? Call us at (775) 738-5616

Thank you!
```

---

## Security Best Practices

Regardless of which option you choose, follow these security rules:

### Always Do:

**1. Use HTTPS everywhere**
- Your site already does this
- Vercel provides SSL automatically

**2. Never store raw account numbers**
- Let Stripe handle all storage
- Only store Stripe payment method IDs
- These are tokens, not real numbers

**3. Validate routing numbers**
- Check format (9 digits)
- Verify routing number is real
- Stripe does this automatically

**4. Use webhook signatures**
- Verify webhooks come from Stripe
- Prevent spoofing attacks
- You already have this

**5. Log verification attempts**
- Track who's trying to verify
- Monitor for suspicious patterns
- Limit failed attempts (3-5 max)

**6. Require mandate authorization**
- Customer must agree to debit
- Legal requirement for ACH
- You already have this

**7. Monitor for fraud**
- Watch for unusual patterns
- Multiple failed verifications
- Large first-time payments
- Mismatched names/emails

### Never Do:

**1. Store account numbers in your database**
- Not even encrypted
- Use Stripe tokens only
- Legal and security liability

**2. Log account numbers**
- Not in application logs
- Not in error messages
- Not in debug output

**3. Allow unlimited verification attempts**
- Limit to 3-5 attempts
- Lock account after failures
- Require manual review

**4. Skip verification**
- Even for "trusted" customers
- Required by NACHA rules
- Opens you to fraud

**5. Process payments before verification**
- Must verify first
- No exceptions
- Protects your business

---

## Cost Breakdown

Both methods cost exactly the same:

### Financial Connections:
- ACH payment fee: 0.8% (max $5 per transaction)
- No setup fees
- No monthly fees
- No per-verification fees
- No hidden charges

### Manual Entry + Micro-deposits:
- ACH payment fee: 0.8% (max $5 per transaction)
- No setup fees
- No monthly fees
- No per-verification fees
- No hidden charges

**Example on $2,000 invoice:**
- Customer pays: $2,005.00
- Stripe takes: $5.00
- You receive: $2,000.00

**Same for both methods!**

---

## Production Checklist

Before going live with real customers:

### Setup:
- [ ] Enable ACH Direct Debit in Stripe Dashboard
- [ ] Enable Financial Connections (or configure micro-deposits)
- [ ] Test with Stripe test accounts
- [ ] Update frontend component
- [ ] Update backend API
- [ ] Add verification flow (if using micro-deposits)
- [ ] Test error handling

### Testing:
- [ ] Test successful payment flow
- [ ] Test payment failures
- [ ] Test verification (if applicable)
- [ ] Test webhook updates
- [ ] Test with real bank account (small amount)
- [ ] Verify money reaches your bank account

### Documentation:
- [ ] Document process for your team
- [ ] Create customer support guide
- [ ] Prepare email templates (if using micro-deposits)
- [ ] Update website help/FAQ

### Monitoring:
- [ ] Set up Stripe Dashboard notifications
- [ ] Monitor first 10 transactions closely
- [ ] Check webhook logs regularly
- [ ] Watch for fraud patterns

### Go Live:
- [ ] Switch Stripe to Live mode
- [ ] Update environment variables
- [ ] Deploy to production
- [ ] Test one real payment
- [ ] Monitor for issues

---

## What Customers Will Experience

### With Financial Connections (Recommended):

**Timeline:**
- **Minute 0**: Customer clicks "Pay with Bank Account"
- **Minute 1**: Selects bank from list
- **Minute 2**: Logs into bank, authorizes
- **Minute 3**: Returns to site, payment processes
- **Done**: Invoice shows "Processing", customer gets confirmation
- **Day 3-5**: Money clears, invoice marked "Paid"

**Customer effort:** 3 minutes, one visit

**Success rate:** 80-90% complete payment

---

### With Manual Entry + Micro-deposits:

**Timeline:**
- **Day 0, Minute 0**: Customer enters routing/account numbers
- **Day 0, Minute 1**: Submits, sees "Verification pending" message
- **Day 0, Minute 2**: Gets email about micro-deposits
- **Day 1-2**: Waits for deposits
- **Day 2-3**: Checks bank statement, finds amounts
- **Day 2-3**: Returns to verification page
- **Day 2-3**: Enters amounts, submits
- **Day 2-3**: If correct, payment processes
- **Day 5-8**: Money clears, invoice marked "Paid"

**Customer effort:** 5-10 minutes across 2 visits, 1-2 day wait

**Success rate:** 30-40% complete verification

---

## Troubleshooting

### Common Issues:

**Problem:** Financial Connections doesn't show customer's bank

**Solution:**
- Most major banks supported (10,000+)
- Customer can use manual entry as fallback
- Check Stripe's supported institutions list

**Problem:** Micro-deposit verification fails

**Solution:**
- Customer entered wrong amounts
- Allow 3-5 attempts
- Provide clear error messages
- Offer customer support number

**Problem:** Payment shows "Processing" but never completes

**Solution:**
- Check Stripe Dashboard for status
- Verify webhook is receiving events
- Check customer's bank declined the charge
- NSF (insufficient funds) most common

**Problem:** Customer can't find micro-deposits

**Solution:**
- Remind them to wait full 1-2 business days
- Check for "STRIPE" or "SNYDER MECHANICAL" in description
- Some banks show in pending transactions
- Very small amounts ($0.01 - $1.00)

---

## Support Resources

### Stripe Documentation:
- **Financial Connections:** https://docs.stripe.com/financial-connections
- **ACH Direct Debit:** https://docs.stripe.com/payments/ach-direct-debit
- **Test Bank Accounts:** https://docs.stripe.com/testing

### Stripe Support:
- **Dashboard:** https://dashboard.stripe.com
- **Support:** Available 24/7 via dashboard
- **Phone:** Listed in your Stripe account

### Your Implementation:
- **Test Mode:** Switch in Stripe Dashboard (top right)
- **Logs:** Check Vercel logs for errors
- **Webhooks:** Monitor in Stripe Dashboard → Developers → Webhooks

---

## Summary

### Current Situation:
- Test mode works great
- Manual bank entry with instant verification
- Ready for production except verification

### Production Requirements:
- Real bank accounts must be verified
- Two options: Financial Connections or Micro-deposits

### Our Recommendation:
**Use Financial Connections** because:
- Instant verification (no 1-2 day wait)
- Better security (verified ownership)
- Higher success rates (80-90% vs 30-40%)
- Better customer experience
- Same cost as micro-deposits
- Industry standard for professional companies

### Next Steps:
1. Read this guide thoroughly
2. Decide: Financial Connections or Micro-deposits
3. Follow setup instructions for your choice
4. Test in Stripe test mode
5. Test with real bank (small amount)
6. Go live when ready
7. Monitor first transactions closely

### Need Help?
- Check Stripe documentation (links above)
- Contact Stripe support (24/7)
- Review your implementation code
- Test thoroughly before going live

---

**Remember:** Bank account verification is required by law (NACHA rules) and protects your business from fraud. Take the time to implement it correctly, and your customers will appreciate the secure, professional payment experience.

---

*ACH Production Setup Guide - Snyder Mechanical LLC*  
*Last updated: February 3, 2026*
