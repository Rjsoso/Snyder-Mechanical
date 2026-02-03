import { CreditCard, Building2, Info, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import CardBrandIcons from '../shared/CardBrandIcons';

const PaymentMethodSelector = ({ amount, selected, onChange, recommendACH }) => {
  const cardFee = (amount * 0.029 + 0.30).toFixed(2);
  const achFee = Math.min(amount * 0.008, 5.00).toFixed(2);
  const savings = (cardFee - achFee).toFixed(2);
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-secondary-900">Choose Payment Method</h3>
      
      {/* Credit Card Option */}
      <div 
        onClick={() => onChange('card')}
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selected === 'card' 
            ? 'border-primary-600 bg-primary-50' 
            : 'border-secondary-300 hover:border-secondary-400'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selected === 'card' ? 'bg-primary-100' : 'bg-secondary-100'
            }`}>
              <CreditCard className={`w-5 h-5 ${
                selected === 'card' ? 'text-primary-600' : 'text-secondary-600'
              }`} />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-secondary-900">Credit/Debit Card</h4>
              </div>
              <CardBrandIcons className="scale-75 mb-2" />
              <p className="text-sm text-secondary-600">Instant processing</p>
              <p className="text-xs text-secondary-500 mt-1">Processing fee: ${cardFee}</p>
            </div>
          </div>
          {selected === 'card' && (
            <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
          )}
        </div>
      </div>
      
      {/* ACH Bank Transfer Option */}
      <div 
        onClick={() => onChange('ach')}
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selected === 'ach' 
            ? 'border-primary-600 bg-primary-50' 
            : 'border-secondary-300 hover:border-secondary-400'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selected === 'ach' ? 'bg-primary-100' : 'bg-secondary-100'
            }`}>
              <Building2 className={`w-5 h-5 ${
                selected === 'ach' ? 'text-primary-600' : 'text-secondary-600'
              }`} />
            </div>
            <div>
              <h4 className="font-semibold text-secondary-900">Bank Transfer (ACH)</h4>
              <p className="text-sm text-secondary-600">3-5 business days</p>
              <p className="text-xs text-secondary-500 mt-1">Processing fee: ${achFee}</p>
              {savings > 1 && (
                <p className="text-xs text-green-600 font-semibold mt-1">
                  Save ${savings}
                </p>
              )}
            </div>
          </div>
          {selected === 'ach' && (
            <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
          )}
        </div>
        
        {recommendACH && savings > 1 && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start space-x-2">
            <Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-green-800">
              <strong>Recommended for this amount.</strong> Save ${savings} in processing fees by paying with bank transfer!
            </p>
          </div>
        )}
      </div>

      {/* Fee Comparison for Large Invoices */}
      {amount >= 1000 && (
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
          <h4 className="font-semibold text-secondary-900 mb-3 text-sm">Fee Comparison</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-secondary-600 mb-1">Credit Card</p>
              <p className="text-lg font-bold text-secondary-900">${cardFee}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 mb-1">Bank Transfer</p>
              <p className="text-lg font-bold text-green-600">${achFee}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-600 mb-1">Your Savings</p>
              <p className="text-lg font-bold text-green-700">${savings}</p>
            </div>
          </div>
          <p className="text-xs text-secondary-600 text-center mt-3">
            Save {((savings / cardFee) * 100).toFixed(0)}% by choosing bank transfer
          </p>
        </div>
      )}
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  amount: PropTypes.number.isRequired,
  selected: PropTypes.oneOf(['card', 'ach']).isRequired,
  onChange: PropTypes.func.isRequired,
  recommendACH: PropTypes.bool,
};

PaymentMethodSelector.defaultProps = {
  recommendACH: false,
};

export default PaymentMethodSelector;
