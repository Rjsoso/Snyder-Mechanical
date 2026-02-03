export default {
  name: 'commercialPage',
  title: 'Commercial Landing Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'backLinkText',
          title: 'Back Link Text',
          type: 'string',
          initialValue: '← Back to Home'
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Call Now'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Request Project Bid'
        }
      ]
    },
    {
      name: 'capabilitiesSection',
      title: 'Capabilities Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our Commercial Capabilities'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'capabilities',
          title: 'Capabilities',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 2 },
              { 
                name: 'icon', 
                title: 'Icon', 
                type: 'string',
                options: {
                  list: [
                    { title: 'Building', value: 'Building2' },
                    { title: 'Wrench', value: 'Wrench' },
                    { title: 'Factory', value: 'Factory' },
                    { title: 'Droplets', value: 'Droplets' }
                  ]
                }
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'whyChooseSection',
      title: 'Why Choose Us Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'View Our Projects'
        },
        {
          name: 'advantages',
          title: 'Commercial Advantages',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Call Now'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Request Project Bid'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Commercial Landing Page'
      }
    }
  }
}
