import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Snowflake, Droplets, Wrench, Calendar, User, Phone, Mail, MapPin, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../shared/Button';

const services = [
  { id: 'heating', label: 'Heating', icon: Flame },
  { id: 'cooling', label: 'Cooling', icon: Snowflake },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets },
  { id: 'other', label: 'Other', icon: Wrench }
];

const timeframes = [
  { id: 'asap', label: 'ASAP' },
  { id: 'today', label: 'Today' },
  { id: 'this-week', label: 'This Week' },
  { id: 'schedule', label: 'Schedule Later' }
];

const ServiceRequestForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    timeframe: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    details: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleServiceSelect = (serviceId) => {
    setFormData({ ...formData, service: serviceId });
    nextStep();
  };

  const handleTimeframeSelect = (timeframeId) => {
    setFormData({ ...formData, timeframe: timeframeId });
    nextStep();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/service-request/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again or call us.');
        setSubmitting(false);
        return;
      }
      nextStep();
      setTimeout(() => onClose(), 3000);
    } catch {
      setSubmitError('Network error. Please try again or call us.');
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-secondary-600">
            Step {Math.min(step, 4)} of 4
          </span>
          <span className="text-sm text-secondary-500">
            {step === 1 && 'Select Service'}
            {step === 2 && 'Choose Timeframe'}
            {step === 3 && 'Your Information'}
            {step === 4 && 'Confirmation'}
          </span>
        </div>
        <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              What service do you need?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="p-6 border-2 border-secondary-200 rounded-xl hover:border-primary-600 hover:bg-primary-50 transition-all text-center group"
                  >
                    <Icon className="w-12 h-12 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-secondary-900">{service.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Timeframe */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              When do you need service?
            </h2>
            <div className="space-y-3">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.id}
                  onClick={() => handleTimeframeSelect(timeframe.id)}
                  className="w-full p-4 border-2 border-secondary-200 rounded-xl hover:border-primary-600 hover:bg-primary-50 transition-all text-left flex items-center space-x-3"
                >
                  <Calendar className="w-6 h-6 text-primary-600" />
                  <span className="font-semibold text-secondary-900">{timeframe.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={prevStep}
              className="mt-6 text-secondary-600 hover:text-secondary-900 font-medium"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Your Contact Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="(775) 555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="123 Main St, Elko, NV"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Additional Details
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  rows="3"
                  placeholder="Tell us more about your service needs..."
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-800 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}
              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={submitting}
                  className="text-secondary-600 hover:text-secondary-900 font-medium disabled:opacity-50"
                >
                  ← Back
                </button>
                <Button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Request Received!
            </h2>
            <p className="text-lg text-secondary-600 mb-2">
              Thank you, {formData.name}! We'll contact you shortly at {formData.phone}.
            </p>
            <p className="text-secondary-500">
              One of our team members will reach out within 30 minutes during business hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceRequestForm;
