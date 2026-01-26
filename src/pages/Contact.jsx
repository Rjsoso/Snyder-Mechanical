import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import companyData from '../data/company.json';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Get in touch with Snyder Mechanical today
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(775) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Contact Information
              </h2>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Phone</h3>
                    <a href={`tel:${companyData.phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {companyData.phone}
                    </a>
                    <p className="text-sm text-secondary-600 mt-1">Call us anytime</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Location</h3>
                    <p className="text-secondary-700">{companyData.address.display}</p>
                    <p className="text-sm text-secondary-600 mt-1">Serving {companyData.serviceArea}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Business Hours</h3>
                    <p className="text-secondary-700">{companyData.hours.weekdays}</p>
                    <p className="text-sm text-secondary-600 mt-1">{companyData.hours.emergency}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-accent-600 text-white">
                <h3 className="font-semibold text-lg mb-2">24/7 Emergency Service</h3>
                <p className="text-accent-100 mb-4">
                  Need immediate assistance? We're available 24/7 for emergency HVAC and plumbing services.
                </p>
                <Button 
                  href={`tel:${companyData.phone}`}
                  variant="outline"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-accent-600"
                >
                  Call Now: {companyData.phone}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
