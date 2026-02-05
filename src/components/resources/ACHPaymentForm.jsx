import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Building2, Loader2, AlertCircle, Lock, Eye, EyeOff, CheckCircle, XCircle, Shield } from 'lucide-react';
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
  const [showRoutingNumber, setShowRoutingNumber] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Ref for auto-focus
  const accountHolderRef = useRef(null);
  
  // Auto-focus the first field when component mounts
  useEffect(() => {
    if (accountHolderRef.current) {
      accountHolderRef.current.focus();
    }
  }, []);
  
  // Validation helpers
  const isRoutingNumberValid = routingNumber.length === 9;
  const isAccountNumberValid = accountNumber.length >= 4 && accountNumber.length <= 17;
  const isAccountHolderValid = accountHolder.trim().length >= 2;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Show confirmation dialog instead of processing immediately
    setShowConfirmDialog(true);
  };
  
  const handleConfirmPayment = async () => {
    setShowConfirmDialog(false);
    setProcessing(true);
    setError('');
    
    try {
      // Validate routing number
      if (!isRoutingNumberValid) {
        throw new Error('Routing number must be 9 digits');
      }
      
      // Validate account number
      if (!isAccountNumberValid) {
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
        <div className="relative">
          <input
            ref={accountHolderRef}
            type="text"
            id="accountHolder"
            name="accountHolder"
            autoComplete="name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            required
            disabled={processing}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100 disabled:cursor-not-allowed ${
              accountHolder.length > 0
                ? isAccountHolderValid
                  ? 'border-green-300'
                  : 'border-red-300'
                : 'border-secondary-300'
            }`}
            placeholder="John Doe"
          />
          {accountHolder.length > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isAccountHolderValid ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-secondary-500 mt-1">
          Name on the bank account
        </p>
      </div>
      
      {/* Routing Number */}
      <div>
        <label htmlFor="routingNumber" className="block text-sm font-medium text-secondary-700 mb-2">
          Routing Number *
        </label>
        <div className="relative">
          <input
            type={showRoutingNumber ? "text" : "password"}
            inputMode="numeric"
            id="routingNumber"
            name="routingNumber"
            autoComplete="off"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
            required
            maxLength="9"
            disabled={processing}
            className={`w-full px-4 py-3 pr-24 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono disabled:bg-secondary-100 disabled:cursor-not-allowed ${
              routingNumber.length > 0
                ? isRoutingNumberValid
                  ? 'border-green-300'
                  : 'border-red-300'
                : 'border-secondary-300'
            }`}
            placeholder="110000000"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {routingNumber.length > 0 && (
              <div>
                {isRoutingNumberValid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowRoutingNumber(!showRoutingNumber)}
              disabled={processing}
              className="text-secondary-500 hover:text-secondary-700 transition-colors disabled:cursor-not-allowed"
              aria-label={showRoutingNumber ? "Hide routing number" : "Show routing number"}
            >
              {showRoutingNumber ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <p className="text-xs text-secondary-500 mt-1">
          9-digit number found on your check (bottom left)
        </p>
      </div>
      
      {/* Account Number */}
      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-secondary-700 mb-2">
          Account Number *
        </label>
        <div className="relative">
          <input
            type={showAccountNumber ? "text" : "password"}
            inputMode="numeric"
            id="accountNumber"
            name="accountNumber"
            autoComplete="off"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
            required
            disabled={processing}
            className={`w-full px-4 py-3 pr-24 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono disabled:bg-secondary-100 disabled:cursor-not-allowed ${
              accountNumber.length > 0
                ? isAccountNumberValid
                  ? 'border-green-300'
                  : 'border-red-300'
                : 'border-secondary-300'
            }`}
            placeholder="000123456789"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {accountNumber.length > 0 && (
              <div>
                {isAccountNumberValid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
              disabled={processing}
              className="text-secondary-500 hover:text-secondary-700 transition-colors disabled:cursor-not-allowed"
              aria-label={showAccountNumber ? "Hide account number" : "Show account number"}
            >
              {showAccountNumber ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
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
        disabled={processing || !isRoutingNumberValid || !isAccountNumberValid || !isAccountHolderValid}
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Verifying bank account...
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

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowConfirmDialog(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with friendly icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-300 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary-800" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                Review Your Payment
              </h3>
              <p className="text-secondary-600">
                Please confirm the details below before processing
              </p>
            </div>

            {/* Payment Amount - Highlighted */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-400 rounded-xl p-6 mb-6 text-center">
              <p className="text-sm text-secondary-700 mb-2">Payment Amount</p>
              <p className="text-4xl font-bold text-primary-800 mb-2">{formatCurrency(total)}</p>
              <p className="text-sm text-secondary-700">Processing via secure ACH transfer</p>
            </div>
            
            {/* Account Details */}
            <div className="bg-secondary-50 rounded-xl p-5 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-600">Account Holder</span>
                <span className="font-semibold text-secondary-900">{accountHolder}</span>
              </div>
              <div className="border-t border-secondary-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-600">Bank Account</span>
                <span className="font-mono text-secondary-700">••••••{accountNumber.slice(-4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-600">Routing Number</span>
                <span className="font-mono text-secondary-700">••••••{routingNumber.slice(-3)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-600">Account Type</span>
                <span className="text-secondary-700">{accountType.charAt(0).toUpperCase() + accountType.slice(1)}</span>
              </div>
            </div>

            {/* Info message - Softer tone */}
            <div className="bg-primary-50 border border-primary-300 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary-700 mt-0.5" />
                </div>
                <div className="text-sm text-secondary-900">
                  <p className="font-medium mb-1">Secure Payment Processing</p>
                  <p className="text-secondary-700">Your payment will be processed in 3-5 business days. You'll receive a confirmation email once complete.</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmDialog(false)}
                variant="outline"
                size="lg"
                className="flex-1 border-2 border-secondary-400 text-secondary-700 hover:bg-secondary-100 hover:border-secondary-600"
                disabled={processing}
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmPayment}
                variant="primary"
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-800 hover:to-primary-900"
                disabled={processing}
              >
                <Lock className="w-4 h-4 mr-2" />
                Authorize Payment
              </Button>
            </div>
          </div>
        </div>
      )}
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
