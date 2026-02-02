export default {
  name: 'certification',
  title: 'Certification / Badge',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., shield-check, award, clock)'
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Trust Badge', value: 'badge' },
          { title: 'Certification', value: 'certification' }
        ]
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type'
    }
  }
}
