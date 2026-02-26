import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import reviewsData from '../../data/reviews.json';
import LogoLoop from './LogoLoop';

const StarRow = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col w-80 h-full">
    <Quote className="w-6 h-6 text-white/20 mb-3 flex-shrink-0" />
    <p className="text-secondary-300 text-sm leading-relaxed flex-1 mb-5">
      "{review.text}"
    </p>
    <div className="flex items-center justify-between pt-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {review.avatar}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{review.name}</p>
          <p className="text-secondary-400 text-xs">{review.location}</p>
        </div>
      </div>
      <StarRow rating={review.rating} />
    </div>
  </div>
);

const ReviewsSection = () => {
  const reviews = reviewsData.featured;

  return (
    <section className="section-padding bg-secondary-900 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-secondary-400">
            {reviewsData.stats.fiveStarPercentage}% five-star ratings from your Elko &amp; Spring Creek neighbors
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll loop — full width, bleeds past container */}
      <LogoLoop
        logos={reviews}
        speed={60}
        direction="left"
        pauseOnHover
        fadeOut
        fadeOutColor="#1a1a1a"
        gap={24}
        logoHeight={220}
        ariaLabel="Customer reviews"
        renderItem={(review) => <ReviewCard review={review} />}
      />
    </section>
  );
};

export default ReviewsSection;
