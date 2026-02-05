import { useState } from 'react';
import PropTypes from 'prop-types';
import { Building2, Loader2, AlertCircle, Lock } from 'lucide-react';
import Button from '../shared/Button';
import FeeBreakdown from './FeeBreakdown';
import { calculateTotal } from '../../utils/paymentFees';
import StripeLogo from '../shared/StripeLogo';
import SecurityBadge from '../shared/SecurityBadge';

const ACHPaymentForm = ({ invoice, onSuccess, onError }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [accountHolder, setAccountHolder] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);
    
    try {
      // Validate routing number
      if (routingNumber.length !== 9) {
        throw new Error('Routing number must be 9 digits');
      }
      
      // Validate account number
      if (accountNumber.length < 4 || accountNumber.length > 17) {
        throw new Error('Account number must be between 4 and 17 digits');
      }
      
      // Create ACH payment intent with fees
      const response = await fetch('/api/invoice/create-ach-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice._id,
          accountNumber,
          routingNumber,
          accountType,
          accountHolder: accountHolder.trim(),
          amount: Math.round(total * 100), // Amount in cents with processing fee
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'ACH setup failed');
      }
      
      onSuccess(data);
    } catch (error) {
      console.error('ACH payment error:', error);
      const errorMessage = error.message || 'Failed to process ACH payment';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };
  
  const { total } = calculateTotal(invoice.amount, 'ach');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary with Fee Breakdown */}
      <FeeBreakdown
        invoiceAmount={invoice.amount}
        paymentMethod="ach"
        invoiceNumber={invoice.invoiceNumber}
        customerName={invoice.customerName || invoice.customerEmail}
      />

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">ACH Bank Transfer</p>
            <p>Your bank account will be charged in 3-5 business days. You'll receive confirmation once the payment clears.</p>
          </div>
        </div>
      </div>
      
      {/* Account Holder Name */}
      <div>
        <label htmlFor="accountHolder" className="block text-sm font-medium text-secondary-700 mb-2">
          Account Holder Name *
        </label>
        <input
          type="text"
          id="accountHolder"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          required
          disabled={processing}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:cursor-not-allowed"
          placeholder="John Doe"
        />
        <p className="text-xs text-secondary-500 mt-1">
          Name on the bank account
        </p>
      </div>
      
      {/* Routing Number */}
      <div>
        <label htmlFor="routingNumber" className="block text-sm font-medium text-secondary-700 mb-2">
          Routing Number *
        </label>
        <input
          type="text"
          id="routingNumber"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
          required
          maxLength="9"
          disabled={processing}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono disabled:bg-secondary-100 disabled:cursor-not-allowed"
          placeholder="110000000"
        />
        <p className="text-xs text-secondary-500 mt-1">
          9-digit number found on your check (bottom left)
        </p>
      </div>
      
      {/* Account Number */}
      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-secondary-700 mb-2">
          Account Number *
        </label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
          required
          disabled={processing}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono disabled:bg-secondary-100 disabled:cursor-not-allowed"
          placeholder="000123456789"
        />
        <p className="text-xs text-secondary-500 mt-1">
          Account number found on your check
        </p>
        <div className="mt-2 flex items-center space-x-1 text-xs text-secondary-500">
          <Lock className="w-3 h-3" />
          <span>Your bank information is secure and encrypted. We never store your account details.</span>
        </div>
      </div>
      
      {/* Account Type */}
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Account Type *
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="checking"
              checked={accountType === 'checking'}
              onChange={(e) => setAccountType(e.target.value)}
              disabled={processing}
              className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed"
            />
            <span className="text-secondary-700">Checking</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="savings"
              checked={accountType === 'savings'}
              onChange={(e) => setAccountType(e.target.value)}
              disabled={processing}
              className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed"
            />
            <span className="text-secondary-700">Savings</span>
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Terms */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <p className="text-xs text-secondary-600">
          By clicking "Authorize Payment", you authorize Snyder Mechanical LLC to electronically debit your account 
          and, if necessary, electronically credit your account to correct erroneous debits.
        </p>
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full flex items-center justify-center"
        disabled={processing}
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Building2 className="w-5 h-5 mr-2" />
            Authorize Payment - {formatCurrency(total)}
          </>
        )}
      </Button>

      {/* Stripe Branding & Trust Indicators */}
      <div className="border-t border-secondary-200 pt-6 space-y-4">
        {/* Powered by Stripe with Logo */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-secondary-600">Powered by</span>
          <StripeLogo className="h-5" />
        </div>
        
        {/* ACH Payment Info */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-secondary-500 text-center">Secure bank account payments via ACH</span>
        </div>
        
        {/* Security Badges */}
        <SecurityBadge />
      </div>
    </form>
  );
};

ACHPaymentForm.propTypes = {
  invoice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default ACHPaymentForm;
