import { motion } from 'framer-motion';
import { Wrench, Snowflake, Wind, Settings, CheckCircle, Phone } from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import companyData from '../../data/company.json';
import serviceData from '../../data/detailed-services.json';

const iconMap = {
  'wrench': Wrench,
  'snowflake': Snowflake,
  'wind': Wind,
  'settings': Settings
};

const CoolingServices = () => {
  const service = serviceData.cooling;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {service.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${companyData.phone}`}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
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
                Schedule Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <p className="text-xl text-secondary-700 max-w-3xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">
            Our Cooling Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.services.map((item, index) => {
              const Icon = iconMap[item.icon] || Wrench;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-secondary-900">
                            {item.title}
                          </h3>
                          {item.startingPrice && (
                            <span className="text-sm font-semibold text-primary-600 whitespace-nowrap ml-2">
                              Starting at {item.startingPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-secondary-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Common AC Problems We Fix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.commonProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6 border border-secondary-200"
              >
                <h3 className="font-bold text-lg text-secondary-900 mb-2 flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                  {item.problem}
                </h3>
                <p className="text-secondary-600 ml-7">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
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
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Cool This Summer
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your AC tune-up before the heat arrives. Our experts will ensure your system is ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${companyData.phone}`}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>{companyData.phone}</span>
            </a>
            <Button
              to="/?modal=schedule"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Schedule Service Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoolingServices;
