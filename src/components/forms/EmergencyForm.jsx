import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import companyData from '../../data/company.json';
import Button from '../shared/Button';

const EmergencyForm = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    problem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Emergency request submitted:', formData);
    setSubmitted(true);
    
    // Close modal after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          Help is On the Way!
        </h2>
        <p className="text-lg text-secondary-600 mb-2">
          We've received your emergency request.
        </p>
        <p className="text-secondary-700 font-semibold mb-4">
          A technician will call you shortly at {formData.phone}
        </p>
        <p className="text-secondary-500 text-sm">
          Average response time: 45 minutes
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl">
      {/* Emergency Header */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900 mb-1">24/7 Emergency Service</h3>
            <p className="text-sm text-red-700">
              For life-threatening emergencies (gas leak, carbon monoxide), evacuate immediately and call 911 first.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-secondary-900 mb-4">
        Emergency Service Request
      </h2>

      {/* Call Now Button - Prominent */}
      <a
        href={`tel:${companyData.phone}`}
        className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors mb-6 text-lg"
      >
        <Phone className="w-6 h-6" />
        <div>
          <div className="text-xs text-red-100">Call Now for Immediate Help</div>
          <div>{companyData.phone}</div>
        </div>
      </a>

      <div className="text-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-secondary-500">or submit details online</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Your Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
            placeholder="(775) 555-1234"
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
            className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
            placeholder="123 Main St, Elko, NV"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Emergency Details *
          </label>
          <textarea
            required
            value={formData.problem}
            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
            className="w-full px-4 py-3 border-2 border-secondary-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
            rows="4"
            placeholder="Describe your emergency: What's wrong? Is anyone in danger? Any immediate safety concerns?"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">What happens next?</p>
              <ul className="space-y-1 text-blue-800">
                <li>• We'll call you within 5-10 minutes</li>
                <li>• A technician will be dispatched immediately</li>
                <li>• Average arrival time: 45 minutes</li>
              </ul>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold">
          Submit Emergency Request
        </Button>
      </form>
    </div>
  );
};

export default EmergencyForm;
