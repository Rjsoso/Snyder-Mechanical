import { useState } from 'react';
import { User, Phone, Mail, MapPin, Home, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../shared/Button';

const QuickEstimateForm = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    serviceType: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    homeSize: '',
    homeAge: '',
    equipmentAge: '',
    details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/quick-estimate/send', {
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
      setSubmitted(true);
      setTimeout(() => onClose(), 3000);
    } catch {
      setSubmitError('Network error. Please try again or call us.');
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          Estimate Request Received!
        </h2>
        <p className="text-lg text-secondary-600 mb-2">
          Thank you, {formData.name}! We'll prepare your free estimate.
        </p>
        <p className="text-secondary-500">
          Expect to hear from us within 24 hours with your detailed estimate.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">
        Get a Free Estimate
      </h2>
      <p className="text-secondary-600 mb-6">
        Tell us about your project and we'll provide a detailed, no-obligation estimate.
      </p>

      {submitError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-800 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Service Type *
          </label>
          <select
            required
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          >
            <option value="">Select a service...</option>
            <option value="hvac-installation">HVAC Installation</option>
            <option value="furnace-replacement">Furnace Replacement</option>
            <option value="ac-installation">AC Installation</option>
            <option value="water-heater">Water Heater Replacement</option>
            <option value="plumbing-project">Plumbing Project</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Service Address *
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Home className="w-4 h-4 inline mr-1" />
              Home Size (sq ft)
            </label>
            <input
              type="text"
              value={formData.homeSize}
              onChange={(e) => setFormData({ ...formData, homeSize: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="2,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Home Age
            </label>
            <input
              type="text"
              value={formData.homeAge}
              onChange={(e) => setFormData({ ...formData, homeAge: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="10 years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Equipment Age
            </label>
            <input
              type="text"
              value={formData.equipmentAge}
              onChange={(e) => setFormData({ ...formData, equipmentAge: e.target.value })}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="5 years"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Project Details
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            rows="4"
            placeholder="Tell us about your project, current issues, or specific requirements..."
          />
        </div>

        <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4" disabled={submitting}>
          {submitting ? 'Sending...' : 'Get Free Estimate'}
        </Button>

        <p className="text-xs text-secondary-500 text-center">
          We'll never share your information. No obligation, no pressure.
        </p>
      </form>
    </div>
  );
};

export default QuickEstimateForm;
