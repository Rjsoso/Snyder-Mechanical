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
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Header strip — always dark, always includes close */}
            <div className="bg-secondary-900 rounded-t-2xl px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-white/50 text-[10px] uppercase tracking-[0.18em] font-semibold mb-0.5">
                    Prefer to talk?
                  </p>
                  <p className="text-white/90 font-medium text-sm">
                    Call us and we'll get you booked right away.
                  </p>
                </div>
                <a
                  href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white text-secondary-900 hover:bg-secondary-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {PHONE}
                </a>
              </div>
              <button
                onClick={closeModal}
                className="flex-shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

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
