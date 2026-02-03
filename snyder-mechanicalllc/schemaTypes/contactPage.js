export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Contact Us'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Get in touch with Snyder Mechanical today'
        }
      ]
    },
    {
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Form Heading',
          type: 'string',
          initialValue: 'Send Us a Message'
        },
        {
          name: 'nameLabel',
          title: 'Name Label',
          type: 'string',
          initialValue: 'Name'
        },
        {
          name: 'namePlaceholder',
          title: 'Name Placeholder',
          type: 'string',
          initialValue: 'Your name'
        },
        {
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Email'
        },
        {
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'your@email.com'
        },
        {
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'string',
          initialValue: 'Phone'
        },
        {
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'string',
          initialValue: '(775) 123-4567'
        },
        {
          name: 'messageLabel',
          title: 'Message Label',
          type: 'string',
          initialValue: 'Message'
        },
        {
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'string',
          initialValue: 'Tell us about your project...'
        },
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Message'
        }
      ]
    },
    {
      name: 'contactInfoSection',
      title: 'Contact Info Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Contact Information'
        },
        {
          name: 'phoneCardSubtext',
          title: 'Phone Card Subtext',
          type: 'string',
          initialValue: 'Call us anytime'
        },
        {
          name: 'locationCardSubtext',
          title: 'Location Card Subtext',
          type: 'string',
          initialValue: 'Serving'
        },
        {
          name: 'emailCardSubtext',
          title: 'Email Card Subtext',
          type: 'string',
          initialValue: "We'll respond within 24 hours"
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Content'
      }
    }
  }
}
