import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Button from '../shared/Button';
import companyData from '../../data/company.json';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white section-padding">
      <div className="container-custom">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {companyData.tagline}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8 text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {companyData.values.map((value, index) => (
                <span key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-accent-400 rounded-full mr-2"></span>
                  {value}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {companyData.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button 
                to="/?modal=schedule" 
                variant="accent" 
                size="lg"
                className="shadow-lg hover:shadow-xl"
              >
                Schedule Service
              </Button>
              <Button 
                to="/?modal=estimate" 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Request Estimate
              </Button>
              <a 
                href={`tel:${companyData.phone}`}
                className="flex items-center justify-center space-x-2 px-8 py-4 text-lg font-medium text-white hover:text-accent-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{companyData.phone}</span>
              </a>
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
