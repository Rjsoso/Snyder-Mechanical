/**
 * Calculate processing fee based on payment method
 * @param {number} amount - Invoice amount in dollars
 * @param {string} paymentMethod - Payment method type
 * @returns {number} Processing fee in dollars
 */
export const calculateProcessingFee = (amount, paymentMethod) => {
  switch (paymentMethod) {
    case 'card':
    case 'apple_pay':
    case 'google_pay':
      // Credit/Debit cards: 2.9% + $0.30
      return (amount * 0.029) + 0.30;
    
    case 'ach':
      // ACH: 0.8%, max $5.00
      const achFee = amount * 0.008;
      return Math.min(achFee, 5.00);
    
    default:
      return 0;
  }
};

/**
 * Get human-readable fee description
 * @param {string} paymentMethod - Payment method type
 * @returns {string} Fee description
 */
export const formatFeeDescription = (paymentMethod) => {
  switch (paymentMethod) {
    case 'card':
    case 'apple_pay':
    case 'google_pay':
      return '2.9% + $0.30';
    
    case 'ach':
      return '0.8% (max $5.00)';
    
    default:
      return '';
  }
};

/**
 * Calculate total payment including fees
 * @param {number} invoiceAmount - Invoice amount in dollars
 * @param {string} paymentMethod - Payment method type
 * @returns {object} Object with subtotal, fee, and total
 */
export const calculateTotal = (invoiceAmount, paymentMethod) => {
  const fee = calculateProcessingFee(invoiceAmount, paymentMethod);
  return {
    subtotal: invoiceAmount,
    fee: Math.round(fee * 100) / 100, // Round to 2 decimal places
    total: Math.round((invoiceAmount + fee) * 100) / 100 // Round to 2 decimal places
  };
};
