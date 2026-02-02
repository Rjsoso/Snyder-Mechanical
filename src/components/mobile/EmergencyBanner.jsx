import { useState, useEffect } from 'react';
import { AlertCircle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companyData from '../../data/company.json';

const EmergencyBanner = () => {
  // Initialize state from sessionStorage
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem('emergencyBannerDismissed') === 'true';
  });

  useEffect(() => {
    if (isDismissed) {
      return;
    }

    // Show banner during off-hours (after 5 PM or before 8 AM) or on weekends
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      // Show if: after 5 PM, before 8 AM, or weekend (0 = Sunday, 6 = Saturday)
      const isOffHours = hour >= 17 || hour < 8 || day === 0 || day === 6;
      setIsVisible(isOffHours);
    };

    checkTime();
    // Check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('emergencyBannerDismissed', 'true');
  };

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 lg:top-auto lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl lg:rounded-xl overflow-hidden">
          <div className="relative p-4">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-red-800 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start space-x-3 pr-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">24/7 Emergency Service</h3>
                <p className="text-sm text-red-100 mb-3">
                  HVAC or plumbing emergency? We're available right now.
                </p>
                <a
                  href={`tel:${companyData.phone}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {companyData.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyBanner;
