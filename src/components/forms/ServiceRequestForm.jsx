import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Snowflake, Droplets, Wrench,
  Calendar, CheckCircle, AlertCircle,
  Building2, Home, ChevronRight,
} from 'lucide-react';

const STEP = {
  PROJECT_TYPE: 'project-type',
  SERVICE: 'service',
  TIMEFRAME: 'timeframe',
  CONTACT: 'contact',
  CONFIRMATION: 'confirmation',
};

const STEP_LABELS = {
  [STEP.PROJECT_TYPE]: 'Project Type',
  [STEP.SERVICE]: 'Select Service',
  [STEP.TIMEFRAME]: 'Choose Timeframe',
  [STEP.CONTACT]: 'Your Information',
  [STEP.CONFIRMATION]: 'Confirmation',
};

const getFlow = (projectType) => {
  if (projectType === 'commercial') {
    return [STEP.PROJECT_TYPE, STEP.CONTACT, STEP.CONFIRMATION];
  }
  return [STEP.PROJECT_TYPE, STEP.SERVICE, STEP.TIMEFRAME, STEP.CONTACT, STEP.CONFIRMATION];
};

const services = [
  { id: 'heating',  label: 'Heating',  icon: Flame },
  { id: 'cooling',  label: 'Cooling',  icon: Snowflake },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets },
  { id: 'other',    label: 'Other',    icon: Wrench },
];

const timeframes = [
  { id: 'asap',      label: 'As Soon As Possible', sub: "We'll prioritize your request" },
  { id: 'today',     label: 'Today',               sub: 'Same-day service available' },
  { id: 'this-week', label: 'This Week',            sub: 'Flexible scheduling this week' },
  { id: 'schedule',  label: 'Schedule Later',       sub: "We'll find a time that works" },
];

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const ServiceRequestForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(STEP.PROJECT_TYPE);
  const [projectType, setProjectType] = useState('');
  const [formData, setFormData] = useState({
    projectType: '',
    service: '',
    timeframe: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    details: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const flow = getFlow(projectType);
  const currentIndex = flow.indexOf(currentStep);
  const totalSteps = flow.length - 1;
  const currentStepNum = Math.min(currentIndex + 1, totalSteps);
  const progressPct = (currentStepNum / totalSteps) * 100;

  const goNext = () => {
    const next = flow[currentIndex + 1];
    if (next) setCurrentStep(next);
  };

  const goBack = () => {
    const prev = flow[currentIndex - 1];
    if (prev) setCurrentStep(prev);
  };

  const handleProjectTypeSelect = (type) => {
    const newFlow = getFlow(type);
    setProjectType(type);
    setFormData((f) => ({ ...f, projectType: type }));
    setCurrentStep(newFlow[1]);
  };

  const handleServiceSelect = (id) => {
    setFormData((f) => ({ ...f, service: id }));
    goNext();
  };

  const handleTimeframeSelect = (id) => {
    setFormData((f) => ({ ...f, timeframe: id }));
    goNext();
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
      goNext();
      setTimeout(() => onClose(), 4000);
    } catch {
      setSubmitError('Network error. Please try again or call us.');
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl">
      {/* Progress bar */}
      {currentStep !== STEP.CONFIRMATION && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary-400">
              {projectType
                ? `Step ${currentStepNum} of ${totalSteps}`
                : 'Step 1'}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-secondary-400 uppercase">
              {STEP_LABELS[currentStep]}
            </span>
          </div>
          <div className="h-px bg-secondary-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary-900"
              initial={{ width: '0%' }}
              animate={{ width: `${projectType ? progressPct : 8}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">

        {/* ── Step: Project Type ── */}
        {currentStep === STEP.PROJECT_TYPE && (
          <motion.div
            key="project-type"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl text-secondary-900 mb-1.5">
              What type of project is this?
            </h2>
            <p className="text-sm text-secondary-400 mb-8">
              This helps us assign the right team to your request.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleProjectTypeSelect('residential')}
                className="group relative p-8 border border-secondary-200 rounded-xl hover:border-secondary-900 hover:bg-secondary-900 transition-all duration-200 text-center"
              >
                <Home className="w-10 h-10 mx-auto mb-4 text-secondary-300 group-hover:text-white transition-colors" />
                <span className="block font-semibold text-base text-secondary-900 group-hover:text-white transition-colors">
                  Residential
                </span>
                <span className="block text-xs text-secondary-400 group-hover:text-white/60 transition-colors mt-1">
                  Home service &amp; repair
                </span>
              </button>
              <button
                onClick={() => handleProjectTypeSelect('commercial')}
                className="group relative p-8 border border-secondary-200 rounded-xl hover:border-secondary-900 hover:bg-secondary-900 transition-all duration-200 text-center"
              >
                <Building2 className="w-10 h-10 mx-auto mb-4 text-secondary-300 group-hover:text-white transition-colors" />
                <span className="block font-semibold text-base text-secondary-900 group-hover:text-white transition-colors">
                  Commercial
                </span>
                <span className="block text-xs text-secondary-400 group-hover:text-white/60 transition-colors mt-1">
                  Business &amp; industrial
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step: Service Selection ── */}
        {currentStep === STEP.SERVICE && (
          <motion.div
            key="service"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl text-secondary-900 mb-1.5">
              What service do you need?
            </h2>
            <p className="text-sm text-secondary-400 mb-8">
              Select the option that best describes your situation.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {services.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleServiceSelect(id)}
                  className="group p-6 border border-secondary-200 rounded-xl hover:border-secondary-900 hover:bg-secondary-900 transition-all duration-200 text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-secondary-300 group-hover:text-white transition-colors" />
                  <span className="font-semibold text-secondary-900 group-hover:text-white transition-colors">
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <BackButton onClick={goBack} />
          </motion.div>
        )}

        {/* ── Step: Timeframe ── */}
        {currentStep === STEP.TIMEFRAME && (
          <motion.div
            key="timeframe"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl text-secondary-900 mb-1.5">
              When do you need service?
            </h2>
            <p className="text-sm text-secondary-400 mb-8">
              We'll do our best to accommodate your schedule.
            </p>
            <div className="space-y-2.5">
              {timeframes.map(({ id, label, sub }) => (
                <button
                  key={id}
                  onClick={() => handleTimeframeSelect(id)}
                  className="group w-full px-5 py-4 border border-secondary-200 rounded-xl hover:border-secondary-900 hover:bg-secondary-900 transition-all duration-200 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="block font-semibold text-sm text-secondary-900 group-hover:text-white transition-colors">
                      {label}
                    </span>
                    <span className="block text-xs text-secondary-400 group-hover:text-white/60 transition-colors mt-0.5">
                      {sub}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-secondary-300 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
            <BackButton onClick={goBack} />
          </motion.div>
        )}

        {/* ── Step: Contact Info ── */}
        {currentStep === STEP.CONTACT && (
          <motion.div
            key="contact"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl text-secondary-900 mb-1.5">
              Your Contact Information
            </h2>
            <p className="text-sm text-secondary-400 mb-8">
              {projectType === 'commercial'
                ? 'A project specialist will be in touch to discuss your commercial needs.'
                : 'A team member will reach out within 30 minutes during business hours.'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Name *</FieldLabel>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <FieldLabel>Phone *</FieldLabel>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                    className={inputCls}
                    placeholder="(775) 555-1234"
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  className={inputCls}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <FieldLabel>Address *</FieldLabel>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData((f) => ({ ...f, address: e.target.value }))}
                  className={inputCls}
                  placeholder={projectType === 'commercial' ? '123 Business Pkwy, Elko, NV' : '123 Main St, Elko, NV'}
                />
              </div>

              <div>
                <FieldLabel>Additional Details</FieldLabel>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData((f) => ({ ...f, details: e.target.value }))}
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder={
                    projectType === 'commercial'
                      ? 'Describe your commercial project or service needs...'
                      : 'Tell us more about your service needs...'
                  }
                />
              </div>

              {submitError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={submitting}
                  className="text-sm text-secondary-400 hover:text-secondary-900 font-medium transition-colors disabled:opacity-40"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3.5 bg-secondary-900 hover:bg-secondary-700 text-white font-semibold text-sm rounded-xl tracking-wide transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Submit Request'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── Step: Confirmation ── */}
        {currentStep === STEP.CONFIRMATION && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl text-secondary-900 mb-3">Request Received</h2>
            <p className="text-secondary-600 mb-1">
              Thank you, {formData.name}. We'll contact you shortly at {formData.phone}.
            </p>
            <p className="text-sm text-secondary-400">
              {projectType === 'commercial'
                ? 'A project specialist will be in touch within 1 business day.'
                : 'One of our team members will reach out within 30 minutes during business hours.'}
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

const inputCls =
  'w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg text-secondary-900 placeholder-secondary-400 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-900 focus:border-transparent transition-all';

const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-secondary-500 mb-1.5">
    {children}
  </label>
);

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-6 text-sm text-secondary-400 hover:text-secondary-900 font-medium transition-colors"
  >
    ← Back
  </button>
);

export default ServiceRequestForm;
