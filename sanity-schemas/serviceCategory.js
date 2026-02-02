export default {
  name: 'serviceCategory',
  title: 'Service Category',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image URL', type: 'string' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Service ID', type: 'string' },
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'badge', title: 'Badge Text (optional)', type: 'string' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'id'
    }
  }
}
