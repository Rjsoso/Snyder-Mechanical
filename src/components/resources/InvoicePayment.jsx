import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Receipt, CheckCircle, ArrowLeft } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import InvoiceLookupForm from './InvoiceLookupForm';
import InvoiceDisplay from './InvoiceDisplay';
import StripePaymentForm from './StripePaymentForm';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const InvoicePayment = () => {
  const [step, setStep] = useState('lookup'); // lookup, payment, success
  const [invoice, setInvoice] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState('');

  const handleInvoiceFound = async (data) => {
    setInvoice(data.invoice);
    
    // If already paid, show success message
    if (data.alreadyPaid) {
      setStep('already-paid');
      return;
    }

    // Create payment intent
    try {
      const response = await fetch('/api/invoice/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: data.invoice._id,
        }),
      });

      const paymentData = await response.json();

      if (!response.ok) {
        setError(paymentData.error || 'Failed to initialize payment');
        return;
      }

      setClientSecret(paymentData.clientSecret);
      setStep('payment');
    } catch (err) {
      console.error('Payment initialization error:', err);
      setError('Failed to initialize payment. Please try again.');
    }
  };

  const handlePaymentSuccess = (intent) => {
    setPaymentIntent(intent);
    setStep('success');
  };

  const handleReset = () => {
    setStep('lookup');
    setInvoice(null);
    setClientSecret('');
    setPaymentIntent(null);
    setError('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Invoice Lookup */}
        {step === 'lookup' && (
          <motion.div
            key="lookup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900">Pay Your Invoice</h3>
                  <p className="text-secondary-600">Enter your invoice details to get started</p>
                </div>
              </div>

              <InvoiceLookupForm 
                onInvoiceFound={handleInvoiceFound}
                onError={setError}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && invoice && clientSecret && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <button
              onClick={handleReset}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </button>

            <InvoiceDisplay invoice={invoice} />

            <Card>
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Complete Payment</h3>
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  invoice={invoice}
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onError={setError}
                />
              </Elements>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && invoice && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h3 className="text-3xl font-bold text-secondary-900 mb-4">
                Payment Successful!
              </h3>

              <p className="text-lg text-secondary-600 mb-6">
                Thank you for your payment. Your invoice has been marked as paid.
              </p>

              <div className="p-6 bg-secondary-50 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">Invoice Number</p>
                    <p className="font-semibold text-secondary-900">{invoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">Amount Paid</p>
                    <p className="font-semibold text-secondary-900">
                      {formatCurrency(invoice.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">Payment ID</p>
                    <p className="font-mono text-xs text-secondary-700">
                      {paymentIntent?.id?.slice(-12) || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-secondary-600 mb-6">
                A confirmation email has been sent to <strong>{invoice.customerEmail}</strong>
              </p>

              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
              >
                Pay Another Invoice
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Already Paid */}
        {step === 'already-paid' && invoice && (
          <motion.div
            key="already-paid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <button
              onClick={handleReset}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </button>

            <InvoiceDisplay invoice={invoice} />

            <Card className="bg-green-50 border-2 border-green-200">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-green-900 mb-2">
                    Invoice Already Paid
                  </h4>
                  <p className="text-green-800">
                    This invoice has already been paid. No further action is needed.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoicePayment;
