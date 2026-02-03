export default {
  name: 'aboutPage',
  title: 'About Pages',
  type: 'document',
  fields: [
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Company Background', value: 'company' },
          { title: 'Safety', value: 'safety' },
          { title: 'Recognitions', value: 'recognitions' },
          { title: 'Careers', value: 'careers' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        }
      ]
    },
    {
      name: 'story',
      title: 'Story Paragraphs (Company)',
      type: 'array',
      of: [{ type: 'text' }],
      hidden: ({ document }) => document?.section !== 'company'
    },
    {
      name: 'timeline',
      title: 'Timeline (Company)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Year', type: 'string' },
          { name: 'event', title: 'Event', type: 'string' }
        ]
      }],
      hidden: ({ document }) => document?.section !== 'company'
    },
    {
      name: 'commitment',
      title: 'Safety Commitment (Safety)',
      type: 'text',
      rows: 3,
      hidden: ({ document }) => document?.section !== 'safety'
    },
    {
      name: 'protocols',
      title: 'Safety Protocols (Safety)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { 
            name: 'icon', 
            title: 'Icon', 
            type: 'string',
            options: {
              list: [
                { title: 'Shield', value: 'shield' },
                { title: 'Graduation Cap', value: 'graduation-cap' },
                { title: 'Search', value: 'search' },
                { title: 'Check Circle', value: 'check-circle' }
              ]
            }
          },
          { name: 'description', title: 'Description', type: 'text', rows: 3 }
        ]
      }],
      hidden: ({ document }) => document?.section !== 'safety'
    },
    {
      name: 'awards',
      title: 'Awards (Recognitions)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.section !== 'recognitions'
    },
    {
      name: 'certifications',
      title: 'Certifications (Recognitions)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.section !== 'recognitions'
    },
    {
      name: 'testimonials',
      title: 'Testimonials (Recognitions)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
          { name: 'author', title: 'Author', type: 'string' },
          { name: 'company', title: 'Company', type: 'string' },
          { name: 'location', title: 'Location', type: 'string' }
        ]
      }],
      hidden: ({ document }) => document?.section !== 'recognitions'
    },
    {
      name: 'why',
      title: 'Why Work With Us (Careers)',
      type: 'text',
      rows: 3,
      hidden: ({ document }) => document?.section !== 'careers'
    },
    {
      name: 'benefits',
      title: 'Benefits (Careers)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { 
            name: 'icon', 
            title: 'Icon', 
            type: 'string',
            options: {
              list: [
                { title: 'Dollar Sign', value: 'dollar-sign' },
                { title: 'Heart', value: 'heart' },
                { title: 'Trending Up', value: 'trending-up' },
                { title: 'Users', value: 'users' }
              ]
            }
          },
          { name: 'description', title: 'Description', type: 'text', rows: 3 }
        ]
      }],
      hidden: ({ document }) => document?.section !== 'careers'
    },
    {
      name: 'positions',
      title: 'Job Positions (Careers)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Job Title', type: 'string' },
          { name: 'type', title: 'Employment Type', type: 'string' },
          { name: 'location', title: 'Location', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 }
        ]
      }],
      hidden: ({ document }) => document?.section !== 'careers'
    }
  ],
  preview: {
    select: {
      title: 'section',
      subtitle: 'hero.title'
    },
    prepare({ title, subtitle }) {
      return {
        title: `About: ${title}`,
        subtitle: subtitle
      }
    }
  }
}
