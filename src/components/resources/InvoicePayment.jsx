import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Receipt, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import InvoiceLookupForm from './InvoiceLookupForm';
import InvoiceDisplay from './InvoiceDisplay';
import StripePaymentForm from './StripePaymentForm';
import PaymentMethodSelector from './PaymentMethodSelector';
import ACHPaymentForm from './ACHPaymentForm';
import { calculateTotal } from '../../utils/paymentFees';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const InvoicePayment = () => {
  const [step, setStep] = useState('lookup'); // lookup, select-method, payment, ach-pending, success
  const [invoice, setInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'ach'
  const [recommendACH, setRecommendACH] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState('');

  const handleInvoiceFound = async (data) => {
    setInvoice(data.invoice);
    setError('');
    
    // If already paid, show success message
    if (data.alreadyPaid) {
      setStep('already-paid');
      return;
    }

    // If processing (ACH), show processing status
    if (data.invoice.status === 'processing') {
      setStep('ach-pending');
      return;
    }

    // Recommend ACH for invoices over $500
    if (data.invoice.amount >= 500) {
      setRecommendACH(true);
      // Default to ACH for large invoices
      setPaymentMethod('ach');
    } else {
      setRecommendACH(false);
      setPaymentMethod('card');
    }

    // Go to payment method selection
    setStep('select-method');
  };

  const handlePaymentMethodSelected = async (selectedMethod) => {
    setPaymentMethod(selectedMethod);

    if (selectedMethod === 'card') {
      // Create payment intent for credit card
      try {
        const { total } = calculateTotal(invoice.amount, 'card');
        
        const response = await fetch('/api/invoice/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoiceId: invoice._id,
            amount: Math.round(total * 100), // Amount in cents with processing fee
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
    } else if (selectedMethod === 'ach') {
      // Go directly to ACH form
      setStep('payment');
    }
  };

  const handleACHSuccess = () => {
    setStep('ach-pending');
  };

  const handleCardSuccess = (intent) => {
    setPaymentIntent(intent);
    setStep('success');
  };

  const handleReset = () => {
    setStep('lookup');
    setInvoice(null);
    setPaymentMethod('card');
    setRecommendACH(false);
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

        {/* Step 2: Payment Method Selection */}
        {step === 'select-method' && invoice && (
          <motion.div
            key="select-method"
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
              <PaymentMethodSelector
                amount={invoice.amount}
                selected={paymentMethod}
                onChange={setPaymentMethod}
                recommendACH={recommendACH}
              />

              <div className="mt-6">
                <Button
                  onClick={() => handlePaymentMethodSelected(paymentMethod)}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Continue to Payment
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Payment (Card or ACH) */}
        {step === 'payment' && invoice && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <button
              onClick={() => setStep('select-method')}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Payment Method
            </button>

            <InvoiceDisplay invoice={invoice} />

            <Card>
              <h3 className="text-xl font-bold text-secondary-900 mb-6">
                {paymentMethod === 'card' ? 'Credit Card Payment' : 'Bank Transfer (ACH)'}
              </h3>
              
              {paymentMethod === 'card' && clientSecret ? (
                <Elements 
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                  }}
                >
                  <StripePaymentForm
                    invoice={invoice}
                    clientSecret={clientSecret}
                    onSuccess={handleCardSuccess}
                    onError={setError}
                  />
                </Elements>
              ) : paymentMethod === 'ach' ? (
                <ACHPaymentForm
                  invoice={invoice}
                  onSuccess={handleACHSuccess}
                  onError={setError}
                />
              ) : null}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Step 4a: Card Payment Success */}
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

        {/* Step 4b: ACH Payment Pending */}
        {step === 'ach-pending' && invoice && (
          <motion.div
            key="ach-pending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-blue-900 mb-3">
                    ACH Payment Initiated
                  </h4>
                  <p className="text-blue-800 mb-4">
                    Your bank account will be charged {formatCurrency(invoice.amount)} in 3-5 business days.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h5 className="font-semibold text-secondary-900 mb-3">What happens next?</h5>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-secondary-700">
                      <li>We've initiated the transfer from your bank account</li>
                      <li>Your bank will process the transfer (typically 3-5 business days)</li>
                      <li>You'll receive email confirmation once the payment clears</li>
                      <li>Your invoice will be automatically marked as paid</li>
                    </ol>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-blue-700 mb-1">Invoice Number</p>
                        <p className="font-semibold text-blue-900">{invoice.invoiceNumber}</p>
                      </div>
                      <div>
                        <p className="text-blue-700 mb-1">Amount</p>
                        <p className="font-semibold text-blue-900">{formatCurrency(invoice.amount)}</p>
                      </div>
                      <div>
                        <p className="text-blue-700 mb-1">Expected Clearance</p>
                        <p className="font-semibold text-blue-900">
                          {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700 mb-1">Status</p>
                        <p className="font-semibold text-blue-900">Processing</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mb-6">
                    If you have any questions, please contact us at (775) 738-5616
                  </p>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    Pay Another Invoice
                  </Button>
                </div>
              </div>
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
