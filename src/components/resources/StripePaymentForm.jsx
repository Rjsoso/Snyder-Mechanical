import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Loader2, Lock } from 'lucide-react';
import Button from '../shared/Button';
import StripeLogo from '../shared/StripeLogo';
import CardBrandIcons from '../shared/CardBrandIcons';
import SecurityBadge from '../shared/SecurityBadge';
import ExpressCheckoutButtons from './ExpressCheckoutButtons';
import FeeBreakdown from './FeeBreakdown';
import { calculateTotal } from '../../utils/paymentFees';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#374151',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  },
  hidePostalCode: false,
};

const StripePaymentForm = ({ invoice, clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [processingMessage, setProcessingMessage] = useState('Processing payment...');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');
    setProcessingMessage('Contacting your bank...');

    try {
      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: invoice.customerName,
              email: invoice.customerEmail,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        if (onError) onError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setProcessingMessage('Confirming payment...');
        // Confirm payment with backend
        const response = await fetch('/api/invoice/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoiceId: invoice._id,
            paymentIntentId: paymentIntent.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to confirm payment');
          if (onError) onError(data.error);
          setProcessing(false);
          return;
        }

        // Success!
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
      if (onError) onError('Payment processing error');
      setProcessing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const { total } = calculateTotal(invoice.amount, 'card');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary with Fee Breakdown */}
      <FeeBreakdown
        invoiceAmount={invoice.amount}
        paymentMethod="card"
        invoiceNumber={invoice.invoiceNumber}
        customerName={invoice.customerName}
      />

      {/* Express Checkout Options (Apple Pay, Google Pay, Link) */}
      <ExpressCheckoutButtons
        invoice={invoice}
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onError={onError}
      />

      {/* OR Divider */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-secondary-300"></div>
        <span className="flex-shrink mx-4 text-sm text-secondary-500 font-medium">OR pay with card</span>
        <div className="flex-grow border-t border-secondary-300"></div>
      </div>

      {/* Enhanced Card Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-secondary-700">
            Card Information *
          </label>
          <CardBrandIcons className="scale-75" />
        </div>
        <div className="p-4 border-2 border-secondary-300 rounded-lg bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 transition-all min-h-[44px]">
          <CardElement 
            options={CARD_ELEMENT_OPTIONS}
            onChange={(event) => {
              if (event.error) {
                setError(event.error.message);
              } else {
                setError('');
              }
            }}
          />
        </div>
        <div className="mt-2 flex items-center space-x-1 text-xs text-secondary-500">
          <Lock className="w-3 h-3" />
          <span>Your payment is secure and encrypted. We never store your card details.</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full flex items-center justify-center"
        disabled={!stripe || processing}
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {processingMessage}
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay {formatCurrency(total)}
          </>
        )}
      </Button>

      {/* Enhanced Stripe Branding & Trust Indicators */}
      <div className="border-t border-secondary-200 pt-6 space-y-4">
        {/* Powered by Stripe with Logo */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-secondary-600">Powered by</span>
          <StripeLogo className="h-5" />
        </div>
        
        {/* Accepted Card Types */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-secondary-500">Accepted payment methods</span>
          <CardBrandIcons />
        </div>
        
        {/* Security Badges */}
        <SecurityBadge />
      </div>
    </form>
  );
};

StripePaymentForm.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default StripePaymentForm;
