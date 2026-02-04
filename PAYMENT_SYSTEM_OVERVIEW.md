# Snyder Mechanical Online Payment System
## Simple Guide for Your Business

---

## What Is This?

Your website now lets customers pay their invoices online using a credit card or bank account. The payments go through **Stripe** (like a virtual credit card machine), and the money gets deposited into your business bank account automatically.

**Bottom line:** Customers can pay 24/7 from anywhere, and you get paid faster with less paperwork.

---

## How It Works for Customers

It's simple - just 4 steps:

1. **Customer goes to your website's payment page**
   - They enter their invoice number and email address

2. **System shows their invoice**
   - They see the amount due and all invoice details

3. **Customer chooses how to pay**
   - Credit/debit card (instant)
   - Bank account transfer (3-5 days, cheaper)

4. **Payment processes automatically**
   - Customer gets confirmation
   - You get notified
   - Invoice is marked as paid

**That's it!** No phone calls, no mailing checks, no trips to the bank.

---

## Two Ways to Pay

### Option 1: Credit or Debit Card (Instant)

**How it works:**
- Customer enters their card info
- Payment happens immediately (10-15 seconds)
- They get instant confirmation
- Invoice is marked "Paid" right away

**Timeline:**
- ✅ **Customer pays:** Instant
- ✅ **You see "Paid":** Instant  
- ✅ **Money in Stripe:** Instant
- ✅ **Money in your bank:** 1-2 business days

**Cost to customer:**
- **2.9% + $0.30 per transaction**
- Example: $2,000 invoice = $58.30 fee = $2,058.30 total

**Best for:**
- Urgent payments
- Smaller amounts
- Customers who want instant confirmation

---

### Option 2: ACH Bank Transfer (Slower but Cheaper)

**How it works:**
- Customer enters their bank account info (routing & account number)
- Payment is submitted to their bank
- Bank processes the transfer (takes several days)
- Money clears into your Stripe account
- Invoice automatically updates to "Paid"

**Timeline:**
- ✅ **Customer submits:** Instant
- ⏳ **Invoice status:** "Processing" (shows right away)
- ⏳ **Bank processing:** 3-5 business days
- ✅ **Money in Stripe:** Day 3-5
- ✅ **Invoice marked "Paid":** Automatic when money clears
- ✅ **Money in your bank:** Day 4-7

**Cost to customer:**
- **0.8% (maximum $5)**
- Example: $2,000 invoice = $5.00 fee = $2,005.00 total

**Best for:**
- Large payments (saves money on fees)
- Non-urgent payments
- Customers who prefer bank transfers

---

## When Do You Get Paid?

Here's the simple money flow:

```
Customer Pays → Stripe Holds Money → Your Bank Account
```

**For Credit Cards:**
1. Customer pays (instant)
2. Stripe takes their fee
3. Money appears in your bank in 1-2 business days

**For ACH Bank Transfers:**
1. Customer submits payment (instant)
2. Bank processes for 3-5 days
3. Stripe takes their fee
4. Money appears in your bank 1-2 days after clearing

**Example with a $2,000 invoice:**

| Payment Method | Customer Pays | Stripe's Fee | You Receive | In Your Bank |
|----------------|---------------|--------------|-------------|--------------|
| Credit Card | $2,058.30 | $58.30 | $2,000.00 | 1-2 days |
| ACH Transfer | $2,005.00 | $5.00 | $2,000.00 | 4-7 days |

**Important:** You always receive the original invoice amount ($2,000). The customer pays the processing fee.

---

## Costs & Fees (No Hidden Charges)

### What Customers Pay

| Payment Method | Fee Rate | Example on $2,000 | Customer Pays |
|----------------|----------|-------------------|---------------|
| Credit Card | 2.9% + $0.30 | $58.30 | $2,058.30 |
| Debit Card | 2.9% + $0.30 | $58.30 | $2,058.30 |
| Apple Pay | 2.9% + $0.30 | $58.30 | $2,058.30 |
| Google Pay | 2.9% + $0.30 | $58.30 | $2,058.30 |
| ACH Transfer | 0.8% (max $5) | $5.00 | $2,005.00 |

### What You Pay

**Nothing extra!** 
- ❌ No monthly fees
- ❌ No setup fees
- ❌ No per-invoice fees
- ❌ No hidden charges

The only cost is the processing fee, which the **customer pays**, not you.

### Why Charge Fees to Customers?

It's legal and common practice:
- Gas stations do it
- Utility companies do it
- Most online businesses do it

Customers have options:
- They can pay online (with fee)
- They can mail a check (no fee)
- They can pay cash (no fee)

The system clearly shows the fees **before** they pay, so there are no surprises.

---

## Is It Safe?

**Yes - bank-level security.**

Here's what makes it safe:

### For Credit Cards:
- ✅ Card numbers go directly to Stripe (not stored on your website)
- ✅ Bank-level encryption (same as your online banking)
- ✅ Stripe is certified at the highest security level
- ✅ Built-in fraud detection
- ✅ Your business never sees or stores card numbers

### For Bank Accounts:
- ✅ Bank account info encrypted in transit (HTTPS)
- ✅ Used only once for that payment (not stored)
- ✅ Customer must authorize the charge
- ✅ Same security as online bill pay

**Note:** Card numbers go only to Stripe, not your server. Bank account details are sent through your site to Stripe over encrypted connections for that single payment. See "Technical Reference" at the end of this guide for more detail.

**Bottom line:** It's as safe as paying on Amazon or any major website. Millions of businesses use Stripe.

---

## Tracking Payments

You can see payment status in your **Sanity dashboard** (your invoice management system).

### What the Statuses Mean:

**"Unpaid"**
- Invoice hasn't been paid yet
- Customer can still pay online

**"Processing"** (ACH only)
- Customer submitted their bank account info
- Bank is processing the transfer (3-5 days)
- Money is on the way
- Will automatically change to "Paid" when money clears

**"Paid"**
- Payment completed successfully
- Money is in your Stripe account
- Will be deposited to your bank account soon
- Invoice is closed

### How You Get Notified:

1. **Instant notification** when customer pays
2. **See status** in Sanity dashboard anytime
3. **Automatic updates** - no manual work needed

---

## Quick Comparison: Card vs ACH

| Feature | Credit/Debit Card | ACH Bank Transfer |
|---------|------------------|-------------------|
| **Speed** | Instant (10 seconds) | 3-5 business days |
| **Customer pays** | 2.9% + $0.30 | 0.8% (max $5) |
| **You receive** | Same day | 3-5 days later |
| **Best for** | Urgent payments | Large amounts |
| **Customer preference** | Want it done now | Want to save money |
| **Failure rate** | Very low (~1%) | Low (~3-5%) |
| **Common issues** | Declined card | Insufficient funds |

### When to Recommend Each:

**Recommend Credit Card when:**
- Customer needs immediate confirmation
- Payment is urgent
- Amount is under $1,000

**Recommend ACH when:**
- Payment is large (saves on fees)
- Customer is paying from a business account
- Timeline isn't urgent
- Customer specifically asks for bank transfer

---

## Real-World Examples

### Example 1: $500 Repair Invoice (Card Payment)

1. Customer pays with credit card
2. Fee: $14.80 (2.9% + $0.30)
3. Customer charged: $514.80
4. You receive: $500.00
5. **Timeline: Money in your bank in 1-2 days**

### Example 2: $5,000 Installation Invoice (ACH Payment)

1. Customer pays with bank account
2. Fee: $5.00 (0.8% capped at $5)
3. Customer charged: $5,005.00
4. You receive: $5,000.00
5. **Timeline: Shows "Processing" for 3-5 days, then "Paid"**
6. **Money in your bank in 4-7 days total**

### Example 3: $10,000 Commercial Project (ACH Saves Money)

**If customer paid with credit card:**
- Fee: $290.30
- Customer pays: $10,290.30

**If customer pays with ACH:**
- Fee: $5.00 (capped)
- Customer pays: $10,005.00
- **Saves customer $285.30**

---

## Benefits to Your Business

### Faster Payments
- No waiting for checks in the mail
- No trips to the bank
- Money in your account in days, not weeks

### Less Paperwork
- No manual entry of payments
- Invoices automatically marked as paid
- Built-in payment tracking

### Professional Image
- Modern, convenient payment option
- Customers expect online payment
- Matches what bigger companies offer

### Better Cash Flow
- Get paid faster
- Customers can pay 24/7
- No more "check is in the mail"

### No Risk to You
- No setup costs
- No monthly fees
- Only pay when you get paid
- Customer covers the processing fee

### Automatic Record Keeping
- All payments tracked in Sanity
- Easy to see what's paid and what's not
- Complete payment history
- Great for bookkeeping and taxes

---

## Common Questions

### "What if a payment fails?"

**Credit Card:** Customer sees an error immediately and can try a different card.

**ACH:** After 3-5 days, invoice goes back to "Unpaid" and customer is notified. They can try again or pay with a card.

### "Can customers get a refund?"

Yes, you can issue refunds through Stripe if needed. Refunds take 5-10 business days to appear in customer's account.

### "What if I have a problem?"

You can:
- Check Stripe dashboard for payment details
- See all invoices and payments in Sanity
- Contact Stripe support (24/7)

### "Do I need to do anything when a payment comes in?"

**No!** It's completely automatic:
1. Customer pays
2. System updates invoice to "Paid"
3. Money gets deposited to your bank
4. You just see the notification

### "What about payment disputes or chargebacks?"

Stripe handles all disputes. They'll notify you if a customer disputes a charge, and you can provide documentation (invoice, photos, proof of service). Disputes are rare with invoices since customers are paying for work already completed.

---

## Getting Started

Your system is already set up and ready to go! Here's what you need to know:

### For Credit Card Payments:
- ✅ Already working
- ✅ No additional setup needed
- ✅ Customers can pay right now

### For ACH Bank Payments:
- ✅ Already working
- ✅ No additional setup needed
- ✅ Customers can pay right now

### Where to Check Payments:
1. **Stripe Dashboard:** See all transactions, payouts, and money coming in
2. **Sanity Dashboard:** See which invoices are paid, processing, or unpaid

### Stripe Payout Schedule:
- **Default:** Daily (money deposited every business day)
- **Can change to:** Weekly or monthly if you prefer
- **New accounts:** May have a 7-14 day hold on first few payments (standard fraud prevention)

---

## Quick Reference

### Payment Methods Available
- ✅ Credit Cards (Visa, Mastercard, Amex, Discover)
- ✅ Debit Cards
- ✅ Apple Pay
- ✅ Google Pay
- ✅ ACH Bank Transfers

### Processing Fees (Paid by Customer)
- **Cards/Digital Wallets:** 2.9% + $0.30
- **ACH Bank Transfer:** 0.8% (capped at $5)

### Payment Timeline
- **Cards:** Instant confirmation, 1-2 days to your bank
- **ACH:** 3-5 days to process, then 1-2 days to your bank

### You Receive
- **Always the full invoice amount**
- **No fees deducted from your side**
- **Automatic deposits to your bank**

### Security
- **Bank-level encryption**
- **PCI compliant through Stripe**
- **Card data never stored on your servers**
- **Industry-leading fraud protection**

---

## Technical Reference (For Developers / Operations)

This section documents how the payment system is wired and what to check if something stops working.

### Required Environment Variables

| Variable | Used by | Purpose |
|----------|---------|---------|
| `STRIPE_SECRET_KEY` | All payment API routes | Stripe API authentication. If missing, payment and webhook handlers return 503. |
| `STRIPE_WEBHOOK_SECRET` | Webhook handler only | Verifies that webhook events really come from Stripe. Required for webhook to run. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Frontend only | Lets the browser talk to Stripe for card and express checkout (never used for ACH bank details). |

### Optional: Webhook → ComputerEase Sync URL

When a payment succeeds, the webhook calls your own API to sync the payment back to ComputerEase. That internal request needs a full URL:

- **Production (Vercel):** `VERCEL_URL` is set automatically but is hostname-only (no `https://`). The app builds the URL as `https://${VERCEL_URL}`. For custom domains or if the internal call fails, set **`APP_URL`** to the full base URL (e.g. `https://yourdomain.com`).
- **Local:** Defaults to `http://localhost:3000`.

If this URL is wrong, payments still succeed and invoices are marked paid in Sanity; only the sync back to ComputerEase will fail (and will be logged).

### What Happens When Stripe Keys Are Missing

- **create-payment**, **create-ach-payment**, **confirm-payment:** Return **503** with a generic message: "Payment service is temporarily unavailable. Please try again later." No Stripe or key details are exposed.
- **Webhook:** Returns **503** with "Webhook not configured" if `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` is missing. Stripe will retry; fix the env and the next retry will succeed.

### Payment Flow Summary

- **Card:** Customer → your site → create-payment (PaymentIntent) → Stripe.js (card details go only to Stripe) → confirm-payment + Stripe webhook → Sanity updated; webhook then calls update-computerease-payment if applicable.
- **ACH:** Customer → your site → create-ach-payment (bank details sent to your API, then to Stripe). Stripe processes the transfer; webhook receives `payment_intent.processing` then `payment_intent.succeeded` and updates Sanity and triggers ComputerEase sync the same way as card.

### Security Notes

- **Card data:** Never touches your server; it goes from the customer’s browser to Stripe via Stripe.js.
- **ACH bank details:** Sent to your API and then to Stripe over HTTPS; used only for that payment and not stored. For stricter compliance, a future improvement is to collect ACH via Stripe.js on the client so bank details never hit your server.

---

## Support Resources

### Check Payment Status
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Sanity Dashboard:** Your invoice management system

### Need Help?
- Stripe Support: 24/7 phone and email support
- Technical Issues: Check Vercel deployment status

### Share With Customers
Tell your customers they can pay online at:
**Your Website → Payments Page**

They'll need:
- Invoice number (from their invoice)
- Email address (the one on the invoice)

---

## Summary

**What You Have:**
A professional online payment system that lets customers pay invoices 24/7 with a credit card or bank account.

**What It Costs You:**
Nothing. Customers pay a small processing fee. You get the full invoice amount.

**What It Does:**
- Processes payments automatically
- Deposits money to your bank
- Updates invoices to "Paid"
- Tracks everything for you

**What You Do:**
Nothing. Just check your bank account for deposits and watch invoices get marked as paid.

**Bottom Line:**
Get paid faster, with less work, and look more professional. All at no cost to your business.

---

*Simple Payment Guide - Snyder Mechanical LLC*  
*Last updated: February 4, 2026*
