import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Loader2, CheckCircle, Lock } from 'lucide-react';
import Button from '../shared/Button';
import StripeLogo from '../shared/StripeLogo';
import CardBrandIcons from '../shared/CardBrandIcons';
import SecurityBadge from '../shared/SecurityBadge';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#374151',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#EF4444',
    },
  },
};

const StripePaymentForm = ({ invoice, clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Enhanced Payment Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-secondary-600 uppercase tracking-wide">Amount Due</p>
              <p className="text-sm text-secondary-700 font-medium">{invoice.customerName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary-600">
              {formatCurrency(invoice.amount)}
            </p>
            <p className="text-xs text-secondary-500">Invoice {invoice.invoiceNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-xs text-primary-700 bg-white/50 rounded-lg py-2">
          <CheckCircle className="w-4 h-4" />
          <span>Secure one-time payment</span>
        </div>
      </div>

      {/* Enhanced Card Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-secondary-700">
            Card Information *
          </label>
          <CardBrandIcons className="scale-75" />
        </div>
        <div className="p-4 border-2 border-secondary-300 rounded-lg bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 transition-all">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
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
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay {formatCurrency(invoice.amount)}
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
    customerName: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default StripePaymentForm;
