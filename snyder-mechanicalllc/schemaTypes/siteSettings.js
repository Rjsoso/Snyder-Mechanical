export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'object',
      fields: [
        {
          name: 'aboutDropdown',
          title: 'About Dropdown Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'path', title: 'Path', type: 'string' }
            ]
          }]
        },
        {
          name: 'servicesDropdown',
          title: 'Services Dropdown',
          type: 'object',
          fields: [
            {
              name: 'homeownersServices',
              title: 'For Homeowners',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'path', title: 'Path', type: 'string' }
                ]
              }]
            },
            {
              name: 'businessServices',
              title: 'For Businesses',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'path', title: 'Path', type: 'string' }
                ]
              }]
            }
          ]
        },
        {
          name: 'paymentsLabel',
          title: 'Payments Button Label',
          type: 'string',
          initialValue: 'Payments'
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer Configuration',
      type: 'object',
      fields: [
        {
          name: 'aboutLinks',
          title: 'About Us Links',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'path', title: 'Path', type: 'string' }
            ]
          }]
        },
        {
          name: 'servicesLinks',
          title: 'Services Links',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'path', title: 'Path', type: 'string' }
            ]
          }]
        },
        {
          name: 'hoursHeading',
          title: 'Business Hours Heading',
          type: 'string',
          initialValue: 'Business Hours'
        },
        {
          name: 'mondayFridayLabel',
          title: 'Monday-Friday Label',
          type: 'string',
          initialValue: 'Monday - Friday'
        },
        {
          name: 'mondayFridayHours',
          title: 'Monday-Friday Hours',
          type: 'string',
          initialValue: '8:00 AM - 5:00 PM'
        },
        {
          name: 'saturdayText',
          title: 'Saturday Text',
          type: 'string',
          initialValue: 'Saturday: By Appointment'
        },
        {
          name: 'sundayText',
          title: 'Sunday Text',
          type: 'string',
          initialValue: 'Sunday: Closed'
        },
        {
          name: 'licensedText',
          title: 'Licensed Text',
          type: 'string',
          initialValue: 'Fully Licensed & Insured'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
}
