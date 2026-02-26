import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '../../lib/sanity';

const HeroCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-rotate through images every 5 seconds
  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  // If no images provided, show gradient fallback
  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600" />
    );
  }

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        {images.map((image, index) => {
          if (index !== currentIndex) return null;

          const imageUrl = image.asset
            ? urlFor(image.asset).width(1920).height(1080).quality(85).url()
            : image.assetUrl || null;

          if (!imageUrl) return null;

          return (
            <motion.div
              key={`${image.asset?._ref || index}-${index}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={imageUrl}
                alt={image.alt || 'Hero background'}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoaded(true)}
                loading="eager"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Fallback gradient while images load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600" />
      )}
    </div>
  );
};

export default HeroCarousel;
