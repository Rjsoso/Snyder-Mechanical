import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Loader2 } from 'lucide-react';
import Button from '../shared/Button';

const InvoiceLookupForm = ({ onInvoiceFound, onError }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/invoice/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber: invoiceNumber.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to lookup invoice');
        if (onError) onError(data.error);
        return;
      }

      // Success - pass invoice data to parent
      onInvoiceFound(data);

    } catch (err) {
      console.error('Invoice lookup error:', err);
      setError('An error occurred. Please try again.');
      if (onError) onError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatInvoiceNumber = (value) => {
    // Remove non-alphanumeric characters
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Auto-add INV- prefix if not present
    if (cleaned && !cleaned.startsWith('INV')) {
      cleaned = 'INV' + cleaned;
    }
    
    // Add hyphen after INV
    if (cleaned.length > 3 && !cleaned.includes('-')) {
      cleaned = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
    }
    
    return cleaned;
  };

  const handleInvoiceNumberChange = (e) => {
    const formatted = formatInvoiceNumber(e.target.value);
    setInvoiceNumber(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-secondary-700 mb-2">
          Invoice Number *
        </label>
        <input
          type="text"
          id="invoiceNumber"
          value={invoiceNumber}
          onChange={handleInvoiceNumberChange}
          placeholder="INV-12345"
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
          disabled={loading}
        />
        <p className="mt-1 text-sm text-secondary-500">
          Format: INV-XXXXX (found on your invoice)
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
          disabled={loading}
        />
        <p className="mt-1 text-sm text-secondary-500">
          Email used when service was provided
        </p>
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
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Looking up invoice...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Find My Invoice
          </>
        )}
      </Button>
    </form>
  );
};

InvoiceLookupForm.propTypes = {
  onInvoiceFound: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default InvoiceLookupForm;
