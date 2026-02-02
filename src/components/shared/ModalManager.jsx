import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceRequestForm from '../forms/ServiceRequestForm';
import QuickEstimateForm from '../forms/QuickEstimateForm';
import EmergencyForm from '../forms/EmergencyForm';

const ModalManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Derive active modal from location instead of storing in state
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
      case 'emergency':
        return <EmergencyForm onClose={closeModal} />;
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
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-secondary-700" />
            </button>

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
