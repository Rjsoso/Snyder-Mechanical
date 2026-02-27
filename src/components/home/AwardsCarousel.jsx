import { useState, useEffect } from 'react';
import { urlFor } from '../../lib/sanity';

const AwardsCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-10">
      {/* Image frame */}
      <div className="relative w-full max-w-[320px] aspect-[4/3] overflow-hidden rounded-lg">
        {images.map((image, index) => {
          const imageUrl = image.asset
            ? urlFor(image.asset).width(640).height(480).quality(85).url()
            : image.assetUrl || null;

          if (!imageUrl) return null;

          return (
            <div
              key={image.asset?._ref || index}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: index === currentIndex ? 1 : 0 }}
            >
              <img
                src={imageUrl}
                alt={image.alt || image.title || 'Award'}
                className="w-full h-full object-contain bg-white/5 p-4"
              />
            </div>
          );
        })}
      </div>

      {/* Dot indicators — only shown when there are multiple images */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to award ${index + 1}`}
              className={`rounded-full transition-all duration-300 focus:outline-none ${
                index === currentIndex
                  ? 'w-5 h-1.5 bg-white/70'
                  : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsCarousel;
