import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useCompanyData, useContactPageData } from '../hooks/useSanityData';

const Contact = () => {
  const { data: companyData } = useCompanyData();
  const { data: contactPageData } = useContactPageData();

  // Fallback content if Sanity data is not available
  const hero = contactPageData?.hero || {
    title: 'Contact Us',
    subtitle: 'Get in touch with Snyder Mechanical today'
  };

  const formSection = contactPageData?.formSection || {
    heading: 'Send Us a Message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '(775) 123-4567',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us about your project...',
    submitButtonText: 'Send Message'
  };

  const contactInfoSection = contactPageData?.contactInfoSection || {
    heading: 'Contact Information',
    phoneCardSubtext: 'Call us anytime',
    locationCardSubtext: 'Serving',
    emailCardSubtext: "We'll respond within 24 hours"
  };

  const phone = companyData?.phone || '(775) 738-5616';
  const email = companyData?.email || 'info@snydermechanical.com';
  const address = companyData?.address?.display || 'Elko, Spring Creek, NV';
  const serviceArea = companyData?.serviceArea || 'Northeastern Nevada';
  const hours = companyData?.hours || {
    weekdays: 'Monday - Friday: 8:00 AM - 5:00 PM',
    saturday: 'Saturday: By Appointment',
    sunday: 'Sunday: Closed'
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {hero.subtitle}
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
                {formSection.heading}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {formSection.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={formSection.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {formSection.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={formSection.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {formSection.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={formSection.phonePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {formSection.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={formSection.messagePlaceholder}
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  {formSection.submitButtonText}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                {contactInfoSection.heading}
              </h2>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Phone</h3>
                    <a href={`tel:${phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {phone}
                    </a>
                    <p className="text-sm text-secondary-600 mt-1">{contactInfoSection.phoneCardSubtext}</p>
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
                    <p className="text-secondary-700">{address}</p>
                    <p className="text-sm text-secondary-600 mt-1">{contactInfoSection.locationCardSubtext} {serviceArea}</p>
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
                    <p className="text-secondary-700">{hours.weekdays}</p>
                    <p className="text-sm text-secondary-600 mt-1">{hours.saturday}</p>
                    <p className="text-sm text-secondary-600">{hours.sunday}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Email</h3>
                    <a href={`mailto:${email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {email}
                    </a>
                    <p className="text-sm text-secondary-600 mt-1">{contactInfoSection.emailCardSubtext}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
