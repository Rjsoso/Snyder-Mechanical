export default {
  name: 'company',
  title: 'Company Information',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'established',
      title: 'Year Established',
      type: 'number',
      validation: Rule => Rule.required().min(1900).max(new Date().getFullYear())
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zip', title: 'ZIP Code', type: 'string' },
        { name: 'display', title: 'Display Address', type: 'string' }
      ]
    },
    {
      name: 'serviceArea',
      title: 'Service Area',
      type: 'string'
    },
    {
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'Weekdays', type: 'string' },
        { name: 'saturday', title: 'Saturday', type: 'string' },
        { name: 'sunday', title: 'Sunday', type: 'string' },
        { name: 'emergency', title: 'Emergency Hours', type: 'string' }
      ]
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'description',
      title: 'Company Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'stats',
      title: 'Company Statistics',
      type: 'object',
      fields: [
        { name: 'yearsInBusiness', title: 'Years in Business', type: 'string' },
        { name: 'projectsCompleted', title: 'Projects Completed', type: 'string' },
        { name: 'certifications', title: 'Certifications', type: 'string' }
      ]
    }
  ]
}
