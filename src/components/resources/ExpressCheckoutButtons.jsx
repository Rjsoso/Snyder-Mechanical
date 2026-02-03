import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentRequestButtonElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';

const ExpressCheckoutButtons = ({ invoice, clientSecret, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [email, setEmail] = useState(invoice.customerEmail || '');
  const [paymentMethodsChecked, setPaymentMethodsChecked] = useState(false);
  const [availableMethods, setAvailableMethods] = useState(null);

  useEffect(() => {
    if (!stripe || !invoice) {
      return;
    }

    // Create payment request for Apple Pay / Google Pay
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
    pr.canMakePayment()
      .then(result => {
        setPaymentMethodsChecked(true);
        setAvailableMethods(result);
        
        if (result && (result.applePay || result.googlePay)) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      })
      .catch(error => {
        console.error('Payment Request error:', error);
        setPaymentMethodsChecked(true);
      });

    // Handle payment method received from Apple Pay / Google Pay
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

  const handleLinkSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Confirm payment using Link
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href, // Not used since we handle redirect: 'if_required'
          payment_method_data: {
            billing_details: {
              email: email,
            },
          },
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        if (onError) onError(confirmError.message);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm with backend
        await confirmPaymentWithBackend(paymentIntent);
      }
    } catch (err) {
      console.error('Link payment error:', err);
      if (onError) onError('An error occurred while processing your payment');
    }
  };

  // Show nothing if neither payment method is available
  const hasExpressOptions = canMakePayment || true; // Link is always available

  if (!hasExpressOptions) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-secondary-600 mb-3">Express checkout</p>
      </div>
      
      <div className="space-y-3">
        {/* Apple Pay / Google Pay Button */}
        {canMakePayment && paymentRequest && (
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
        )}

        {/* Stripe Link */}
        <div className="space-y-2">
          <LinkAuthenticationElement
            options={{
              defaultValues: {
                email: invoice.customerEmail,
              },
            }}
            onChange={(e) => {
              if (e.value.email) {
                setEmail(e.value.email);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

ExpressCheckoutButtons.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default ExpressCheckoutButtons;
