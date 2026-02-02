export default {
  name: 'reviewStats',
  title: 'Review Statistics',
  type: 'document',
  fields: [
    {
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'totalReviews',
      title: 'Total Reviews',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'fiveStarPercentage',
      title: 'Five Star Percentage',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100)
    }
  ]
}
