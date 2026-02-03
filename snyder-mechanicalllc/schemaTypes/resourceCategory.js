export default {
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., file-text, book-open, help-circle)'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().integer().min(0)
    },
    {
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
          { name: 'link', title: 'Link', type: 'string' }
        ]
      }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order'
    },
    prepare({ title, order }) {
      return {
        title: title,
        subtitle: `Order: ${order}`
      }
    }
  }
}
