export default {
  name: 'resourcesPage',
  title: 'Resources Page',
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
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Resources Page'
      }
    }
  }
}
