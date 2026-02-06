import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companyData from '../../data/company.json';

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`tel:${companyData.phone}`}
          className="fixed bottom-6 right-6 z-50 lg:hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="bg-primary-600 text-white rounded-full p-4 shadow-2xl hover:bg-primary-700 transition-colors flex items-center justify-center">
            <Phone className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCallButton;
