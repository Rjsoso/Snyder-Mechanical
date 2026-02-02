import PropTypes from 'prop-types';
import { Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import Card from '../shared/Card';
import Badge from '../shared/Badge';

const InvoiceDisplay = ({ invoice }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'paid':
        return {
          icon: CheckCircle,
          variant: 'success',
          label: 'Paid',
        };
      case 'unpaid':
        return {
          icon: Clock,
          variant: 'warning',
          label: 'Unpaid',
        };
      case 'overdue':
        return {
          icon: XCircle,
          variant: 'danger',
          label: 'Overdue',
        };
      default:
        return {
          icon: Clock,
          variant: 'default',
          label: status,
        };
    }
  };

  const statusConfig = getStatusConfig(invoice.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Invoice {invoice.invoiceNumber}</h3>
            <p className="text-primary-100">{invoice.customerName}</p>
          </div>
          <Badge 
            variant={statusConfig.variant} 
            size="lg"
            className="flex items-center space-x-1"
          >
            <StatusIcon className="w-4 h-4" />
            <span>{statusConfig.label}</span>
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 space-y-6">
        {/* Amount */}
        <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Amount</p>
              <p className="text-3xl font-bold text-secondary-900">
                {formatCurrency(invoice.amount)}
              </p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoice.serviceDate && (
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-secondary-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-secondary-900">Service Date</p>
                <p className="text-sm text-secondary-600">{formatDate(invoice.serviceDate)}</p>
              </div>
            </div>
          )}
          {invoice.dueDate && (
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-secondary-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-secondary-900">Due Date</p>
                <p className="text-sm text-secondary-600">{formatDate(invoice.dueDate)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {invoice.description && (
          <div>
            <h4 className="font-semibold text-secondary-900 mb-2">Description</h4>
            <p className="text-secondary-600">{invoice.description}</p>
          </div>
        )}

        {/* Line Items */}
        {invoice.lineItems && invoice.lineItems.length > 0 && (
          <div>
            <h4 className="font-semibold text-secondary-900 mb-3">Invoice Details</h4>
            <div className="border border-secondary-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-secondary-600 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-200">
                  {invoice.lineItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-secondary-900">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-secondary-600">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-secondary-600">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-secondary-900">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Paid At */}
        {invoice.status === 'paid' && invoice.paidAt && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Paid on {formatDate(invoice.paidAt)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

InvoiceDisplay.propTypes = {
  invoice: PropTypes.shape({
    invoiceNumber: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string,
    serviceDate: PropTypes.string,
    dueDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    lineItems: PropTypes.arrayOf(PropTypes.object),
    paidAt: PropTypes.string,
  }).isRequired,
};

export default InvoiceDisplay;
