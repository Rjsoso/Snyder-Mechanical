export default {
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Review ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Elko, NV'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'service',
      title: 'Service Type',
      type: 'string',
      description: 'e.g., Heating Repair, AC Installation'
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'avatar',
      title: 'Avatar Initials',
      type: 'string',
      description: 'e.g., SJ for Sarah Johnson'
    },
    {
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show on homepage?',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
      rating: 'rating'
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${'⭐'.repeat(rating)}`
      }
    }
  }
}
