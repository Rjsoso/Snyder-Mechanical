import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import TrustBadges from '../shared/TrustBadges';
import companyData from '../../data/company.json';

const Hero = () => {
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
                <span>Looking for commercial services?</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comfort & Reliability for Your Home
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-6 text-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Expert HVAC & Plumbing Services in Northeastern Nevada
            </motion.p>
            
            <motion.p 
              className="text-lg mb-8 text-primary-100 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Trusted by homeowners across Elko and Spring Creek since 1981. From installations to repairs, we're here to keep your home comfortable.
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
                href={`tel:${companyData.phone}`}
                className="flex items-center justify-center space-x-3 px-8 py-4 text-lg font-semibold bg-accent-600 hover:bg-accent-700 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-accent-100">Call Now</div>
                  <div>{companyData.phone}</div>
                </div>
              </a>
              <Button 
                to="/?modal=schedule" 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Schedule Service
              </Button>
              <Button 
                to="/?modal=estimate" 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Get Free Quote
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
