export default {
  name: 'resourceFaq',
  title: 'Resource FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().integer().min(0)
    }
  ],
  preview: {
    select: {
      title: 'question',
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
