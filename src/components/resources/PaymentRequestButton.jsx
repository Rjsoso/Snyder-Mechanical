import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const PaymentRequestButton = ({ invoice, clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (!stripe || !invoice) {
      return;
    }

    // Create payment request
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: `Invoice ${invoice.invoiceNumber}`,
        amount: Math.round(invoice.amount * 100), // Convert to cents
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check if Apple Pay or Google Pay is available
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        setCanMakePayment(true);
      }
    });

    // Handle payment method received
    pr.on('paymentmethod', async (e) => {
      try {
        // Confirm the payment with the payment method from Apple Pay/Google Pay
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );

        if (confirmError) {
          e.complete('fail');
          if (onError) onError(confirmError.message);
          return;
        }

        if (paymentIntent.status === 'requires_action') {
          // Let Stripe.js handle required actions
          const { error: actionError, paymentIntent: confirmedPaymentIntent } = 
            await stripe.confirmCardPayment(clientSecret);
          
          if (actionError) {
            e.complete('fail');
            if (onError) onError(actionError.message);
            return;
          }

          if (confirmedPaymentIntent.status === 'succeeded') {
            e.complete('success');
            
            // Confirm with backend
            await confirmPaymentWithBackend(confirmedPaymentIntent);
          }
        } else if (paymentIntent.status === 'succeeded') {
          e.complete('success');
          
          // Confirm with backend
          await confirmPaymentWithBackend(paymentIntent);
        } else {
          e.complete('fail');
          if (onError) onError('Payment failed');
        }
      } catch (err) {
        console.error('Payment error:', err);
        e.complete('fail');
        if (onError) onError('An error occurred while processing your payment');
      }
    });

    // Cleanup
    return () => {
      pr.off('paymentmethod');
    };
  }, [stripe, invoice, clientSecret, onError, onSuccess]);

  const confirmPaymentWithBackend = async (paymentIntent) => {
    try {
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
        if (onError) onError(data.error || 'Failed to confirm payment');
        return;
      }

      // Success!
      if (onSuccess) onSuccess(paymentIntent);
    } catch (err) {
      console.error('Backend confirmation error:', err);
      if (onError) onError('Failed to confirm payment with server');
    }
  };

  if (!canMakePayment || !paymentRequest) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-secondary-600 mb-3">Express checkout</p>
      </div>
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: 'default',
              theme: 'dark',
              height: '48px',
            },
          },
        }}
      />
    </div>
  );
};

PaymentRequestButton.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default PaymentRequestButton;
