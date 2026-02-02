export default {
  name: 'detailedService',
  title: 'Detailed Service Page',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Service ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Service Title',
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
      rows: 4
    },
    {
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Service ID', type: 'string' },
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'startingPrice', title: 'Starting Price', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'commonProblems',
      title: 'Common Problems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'problem', title: 'Problem', type: 'string' },
            { name: 'solution', title: 'Solution', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'responseTime',
      title: 'Response Time (Emergency Only)',
      type: 'string',
      description: 'e.g., "Average response time: 45 minutes"'
    },
    {
      name: 'emergencies',
      title: 'Emergency Types (Emergency Only)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'urgent', title: 'Urgent', type: 'boolean' }
          ]
        }
      ]
    },
    {
      name: 'whenToCall',
      title: 'When to Call (Emergency Only)',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'emergencyTips',
      title: 'Emergency Tips (Emergency Only)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'tips', title: 'Tips', type: 'array', of: [{ type: 'string' }] }
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
