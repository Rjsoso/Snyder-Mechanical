import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import TrustBadges from '../shared/TrustBadges';
import HeroCarousel from './HeroCarousel';
import { useCompanyData } from '../../hooks/useSanityData';
import { useHomePageData } from '../../hooks/useSanityData';

const Hero = () => {
  const { data: companyData } = useCompanyData();
  const { data: homePageData } = useHomePageData();

  // Fallback content if Sanity data is not available
  const hero = homePageData?.hero || {
    title: 'Comfort & Reliability for Your Home',
    subtitle: 'Expert HVAC & Plumbing Services in Northeastern Nevada',
    description: 'Trusted by homeowners across Elko and Spring Creek since 1981. From installations to repairs, we\'re here to keep your home comfortable.',
    commercialLinkText: 'Looking for commercial services?',
    primaryButtonText: 'Call Now',
    scheduleButtonText: 'Schedule Service',
    quoteButtonText: 'Get Free Quote'
  };

  const phone = companyData?.phone || '(775) 738-5616';

  return (
    <section className="fixed inset-x-0 top-0 h-screen z-0 text-white overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel images={hero.backgroundImages} />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Content */}
      <div className="container-custom relative z-20 section-padding h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Audience Toggle */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link 
                to="/commercial"
                className="inline-flex items-center text-white hover:text-primary-50 transition-all text-base font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 shimmer-text"
              >
                <span>{hero.commercialLinkText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.title}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-6 text-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {hero.subtitle}
            </motion.p>
            
            <motion.p 
              className="text-lg mb-8 text-primary-100 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {hero.description}
            </motion.p>
            
            {/* Trust Badges */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TrustBadges />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a 
                href={`tel:${phone}`}
                className="flex items-center justify-center space-x-3 px-8 py-4 text-lg font-semibold bg-accent-600 hover:bg-accent-700 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-accent-100">{hero.primaryButtonText}</div>
                  <div>{phone}</div>
                </div>
              </a>
              <Button 
                to="/?modal=schedule" 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                {hero.scheduleButtonText}
              </Button>
              <Button 
                to="/?modal=estimate" 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                {hero.quoteButtonText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
