import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import reviewsData from '../../data/reviews.json';

const StarRow = ({ rating = 5, size = 'sm' }) => {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className={`${cls} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary-100 flex flex-col h-full">
    <Quote className="w-7 h-7 text-primary-200 mb-3 flex-shrink-0" />
    <p className="text-secondary-700 text-sm leading-relaxed flex-1 mb-5">
      "{review.text}"
    </p>
    <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
          {review.avatar}
        </div>
        <div>
          <p className="font-semibold text-secondary-900 text-sm">{review.name}</p>
          <p className="text-secondary-400 text-xs">{review.location}</p>
        </div>
      </div>
      <StarRow rating={review.rating} />
    </div>
  </div>
);

const ReviewsSection = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const reviews = reviewsData.featured;
  const desktopReviews = reviews.slice(0, 3);

  const nextReview = () => setMobileIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setMobileIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Google Reviews badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-secondary-200 rounded-full px-4 py-2 shadow-sm mb-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-secondary-900 text-sm">{reviewsData.stats.averageRating}</span>
            <span className="text-secondary-400 text-sm">·</span>
            <span className="text-secondary-500 text-sm">{reviewsData.stats.totalReviews} Google Reviews</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-secondary-500">
            {reviewsData.stats.fiveStarPercentage}% five-star ratings from your Elko &amp; Spring Creek neighbors
          </p>
        </motion.div>

        {/* Desktop 3-up grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {desktopReviews.map((review, index) => (
            <motion.div
              key={review.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <motion.div
            key={mobileIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ReviewCard review={reviews[mobileIndex]} />
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === mobileIndex ? 'bg-primary-600 w-6' : 'bg-secondary-300 w-1.5'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-white border border-secondary-200 text-secondary-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
