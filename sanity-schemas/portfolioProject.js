export default {
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Project ID',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'commercial' },
          { title: 'Residential', value: 'residential' },
          { title: 'Pumps & Equipment', value: 'pumps-equipment' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image URL',
      type: 'string',
      description: 'Image path or URL'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'details',
      title: 'Project Details',
      type: 'text',
      rows: 2
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      category: 'category'
    },
    prepare(selection) {
      const { title, subtitle, category } = selection
      return {
        title: title,
        subtitle: `${category} - ${subtitle}`
      }
    }
  }
}
