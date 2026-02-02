export default {
  name: 'invoice',
  title: 'Invoice',
  type: 'document',
  fields: [
    {
      name: 'invoiceNumber',
      title: 'Invoice Number',
      type: 'string',
      validation: Rule => Rule.required().custom(value => {
        if (!value) return true;
        // Format: INV-XXXXX
        const pattern = /^INV-\d{5,}$/;
        return pattern.test(value) ? true : 'Invoice number must be in format INV-XXXXX';
      })
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string'
    },
    {
      name: 'amount',
      title: 'Total Amount',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'serviceDate',
      title: 'Service Date',
      type: 'date'
    },
    {
      name: 'dueDate',
      title: 'Due Date',
      type: 'date'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unpaid', value: 'unpaid' },
          { title: 'Paid', value: 'paid' },
          { title: 'Overdue', value: 'overdue' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      initialValue: 'unpaid',
      validation: Rule => Rule.required()
    },
    {
      name: 'lineItems',
      title: 'Line Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'unitPrice',
            title: 'Unit Price',
            type: 'number',
            validation: Rule => Rule.required().min(0)
          },
          {
            name: 'total',
            title: 'Total',
            type: 'number',
            validation: Rule => Rule.required().min(0)
          }
        ],
        preview: {
          select: {
            title: 'description',
            quantity: 'quantity',
            total: 'total'
          },
          prepare({ title, quantity, total }) {
            return {
              title: title,
              subtitle: `Qty: ${quantity} - Total: $${total?.toFixed(2) || '0.00'}`
            };
          }
        }
      }]
    },
    {
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => !document?.stripePaymentIntentId
    },
    {
      name: 'paidAt',
      title: 'Paid At',
      type: 'datetime',
      readOnly: true,
      hidden: ({ document }) => document?.status !== 'paid'
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes (not visible to customer)'
    }
  ],
  preview: {
    select: {
      invoiceNumber: 'invoiceNumber',
      customerName: 'customerName',
      amount: 'amount',
      status: 'status'
    },
    prepare({ invoiceNumber, customerName, amount, status }) {
      return {
        title: `${invoiceNumber} - ${customerName}`,
        subtitle: `$${amount?.toFixed(2) || '0.00'} - ${status?.toUpperCase() || 'UNKNOWN'}`
      };
    }
  }
};
