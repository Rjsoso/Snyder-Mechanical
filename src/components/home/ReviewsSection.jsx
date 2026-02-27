import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import reviewsData from '../../data/reviews.json';
import LogoLoop from './LogoLoop';

const StarRow = ({ rating = 5, size = 'sm' }) => {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        const pct = Math.round(fill * 100);
        return (
          <span key={star} className="relative inline-block">
            <Star className={`${cls} text-secondary-600`} />
            {pct > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${pct}%` }}
              >
                <Star className={`${cls} fill-amber-400 text-amber-400`} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="bg-white/5 border border-white/10 rounded-[10px] p-6 flex flex-col w-80 h-full">
    <p className="text-secondary-300 text-sm leading-relaxed flex-1 mb-5">
      &ldquo;{review.text}&rdquo;
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
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow row — rating badge lives here, not above the headline */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="accent-rule" />
              <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Customer Reviews</p>
            </div>

            {/* Google rating badge — inline with eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3.5 py-1.5">
              <StarRow rating={reviewsData.stats.averageRating} />
              <span className="font-bold text-white text-sm">{reviewsData.stats.averageRating}</span>
              <span className="text-white/20 text-sm">·</span>
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-white/40 text-xs">{reviewsData.stats.totalReviews} reviews</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            What Our Customers Say
          </h2>
          <p className="text-secondary-400 text-base">
            {reviewsData.stats.fiveStarPercentage}% five-star ratings from your Elko &amp; Spring Creek neighbors
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll loop — full width */}
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
