import { useState, useEffect } from 'react';
import { urlFor } from '../../lib/sanity';

const HeroCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="absolute inset-0 bg-primary-900" />;
  }

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => {
        const imageUrl = image.asset
          ? urlFor(image.asset).width(1920).height(1080).quality(85).url()
          : image.assetUrl || null;

        if (!imageUrl) return null;

        return (
          <div
            key={image.asset?._ref || index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          >
            <img
              src={imageUrl}
              alt={image.alt || 'Hero background'}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoaded(true)}
              loading="eager"
            />
          </div>
        );
      })}

      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-900" />
      )}
    </div>
  );
};

export default HeroCarousel;
