import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import TrustBadges from '../shared/TrustBadges';
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
    <section className="relative bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white section-padding overflow-hidden">
      <div className="container-custom">
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
                className="inline-flex items-center text-primary-100 hover:text-white transition-colors text-sm"
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
      
      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
