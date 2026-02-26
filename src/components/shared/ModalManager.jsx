import { useLocation, useNavigate } from 'react-router-dom';
import { X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceRequestForm from '../forms/ServiceRequestForm';
import QuickEstimateForm from '../forms/QuickEstimateForm';

const PHONE = '(775) 738-5616';

const ModalManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const params = new URLSearchParams(location.search);
  const activeModal = params.get('modal');

  const closeModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete('modal');
    navigate({ search: params.toString() }, { replace: true });
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'schedule':
        return <ServiceRequestForm onClose={closeModal} />;
      case 'estimate':
        return <QuickEstimateForm onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Call strip — shown on schedule modal (close button integrated here) */}
            {activeModal === 'schedule' ? (
              <div className="bg-primary-900 rounded-t-xl px-6 py-4 flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs uppercase tracking-[0.15em] font-medium mb-0.5">Prefer to talk?</p>
                    <p className="text-white font-semibold text-sm">Call us and we'll get you booked right away.</p>
                  </div>
                  <a
                    href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 bg-white text-primary-900 hover:bg-primary-50 px-5 py-2.5 rounded-md font-bold text-sm transition-colors flex-shrink-0 shadow"
                  >
                    <Phone className="w-4 h-4" />
                    {PHONE}
                  </a>
                </div>
                <button
                  onClick={closeModal}
                  className="flex-shrink-0 p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              /* Close Button */
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-md bg-white/80 hover:bg-secondary-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-secondary-700" />
              </button>
            )}

            {/* Form Content */}
            <div className="p-8">
              {renderModal()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalManager;
