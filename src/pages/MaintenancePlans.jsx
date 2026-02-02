import { motion } from 'framer-motion';
import { DollarSign, Shield, Clock, Star, Percent, Heart, Phone } from 'lucide-react';
import PricingTable from '../components/shared/PricingTable';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import companyData from '../data/company.json';
import plansData from '../data/maintenance-plans.json';

const iconMap = {
  'dollar-sign': DollarSign,
  'shield': Shield,
  'clock': Clock,
  'star': Star,
  'percent': Percent,
  'heart': Heart
};

const MaintenancePlans = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {plansData.hero.title}
            </h1>
            <p className="text-xl text-primary-100 mb-4">
              {plansData.hero.subtitle}
            </p>
            <p className="text-lg text-primary-200">
              {plansData.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Pricing Table */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              All plans include professional service from our certified technicians
            </p>
          </motion.div>

          <PricingTable plans={plansData.plans} />
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose a Maintenance Plan?
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Preventive maintenance is the key to keeping your systems running smoothly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plansData.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || Star;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-secondary-600">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Plan',
                description: 'Select the maintenance plan that fits your needs and budget'
              },
              {
                step: '2',
                title: 'We Schedule Service',
                description: "We'll contact you to schedule your tune-ups at convenient times"
              },
              {
                step: '3',
                title: 'Enjoy the Benefits',
                description: 'Lower bills, fewer repairs, and peace of mind all year long'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {plansData.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <h3 className="font-bold text-lg text-secondary-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-secondary-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners who trust Snyder Mechanical for their maintenance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${companyData.phone}`}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call {companyData.phone}</span>
            </a>
            <Button
              to="/?modal=schedule"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Enroll Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaintenancePlans;
