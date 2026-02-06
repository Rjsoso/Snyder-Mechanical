import PropTypes from 'prop-types';
import { CreditCard, CheckCircle } from 'lucide-react';
import { calculateTotal, formatFeeDescription } from '../../utils/paymentFees';

const FeeBreakdown = ({ invoiceAmount, paymentMethod, invoiceNumber, customerName }) => {
  const { subtotal, fee, total } = calculateTotal(invoiceAmount, paymentMethod);
  const feeDescription = formatFeeDescription(paymentMethod);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-secondary-200 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-secondary-600 uppercase tracking-wide">Payment Summary</p>
            <p className="text-sm text-secondary-700 font-medium">{customerName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-secondary-500">Invoice {invoiceNumber}</p>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white/70 rounded-lg p-4 space-y-2 mb-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-secondary-700">
          <span className="text-sm">Invoice Subtotal</span>
          <span className="text-sm font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Processing Fee */}
        <div className="flex items-center justify-between text-secondary-700">
          <div className="flex flex-col">
            <span className="text-sm">Processing Fee</span>
            <span className="text-xs text-secondary-500">{feeDescription}</span>
          </div>
          <span className="text-sm font-medium">{formatCurrency(fee)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-300 pt-2"></div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-secondary-900">Total Amount</span>
          <span className="text-2xl font-bold text-primary-600">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-xs text-primary-700 bg-white/50 rounded-lg py-2">
        <CheckCircle className="w-4 h-4" />
        <span>Secure one-time payment</span>
      </div>

      {/* Fee Disclosure */}
      <p className="text-xs text-secondary-500 text-center mt-3">
        Processing fees apply to online payments. Pay by check or cash to avoid fees.
      </p>
    </div>
  );
};

FeeBreakdown.propTypes = {
  invoiceAmount: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
};

export default FeeBreakdown;
