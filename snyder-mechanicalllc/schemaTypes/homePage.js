export default {
  name: 'homePage',
  title: 'Home Page',
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
          name: 'subtitle',
          title: 'Subtitle',
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
          name: 'commercialLinkText',
          title: 'Commercial Services Link Text',
          type: 'string',
          initialValue: 'Looking for commercial services?'
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Call Now'
        },
        {
          name: 'scheduleButtonText',
          title: 'Schedule Button Text',
          type: 'string',
          initialValue: 'Schedule Service'
        },
        {
          name: 'quoteButtonText',
          title: 'Quote Button Text',
          type: 'string',
          initialValue: 'Get Free Quote'
        }
      ]
    },
    {
      name: 'quickServiceSelector',
      title: 'Quick Service Selector Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'What Do You Need?'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Select a service to get started or call us for assistance'
        }
      ]
    },
    {
      name: 'servicesGridSection',
      title: 'Services Grid Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our Services'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Comprehensive mechanical solutions for residential, commercial, and industrial clients'
        }
      ]
    },
    {
      name: 'safetySection',
      title: 'Safety Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Committed to Safety'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Safety is our top priority, each and every project. We maintain the highest safety standards to protect our team, our clients, and the communities we serve.'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Learn More About Our Safety Commitment'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Content'
      }
    }
  }
}
