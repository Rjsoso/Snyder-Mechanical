import { motion } from 'framer-motion';
import { Wrench, DollarSign, Droplet, Calendar, Phone, Receipt } from 'lucide-react';
import ResourceCard from '../components/resources/ResourceCard';
import InvoicePayment from '../components/resources/InvoicePayment';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useCompanyData, useResources } from '../hooks/useSanityData';
import companyDataFallback from '../data/company.json';
import resourcesDataFallback from '../data/resources.json';

const iconMap = {
  'wrench': Wrench,
  'dollar-sign': DollarSign,
  'droplet': Droplet,
  'calendar': Calendar
};

const Resources = () => {
  const { data: companyDataSanity } = useCompanyData();
  const { data: resourcesSanity, loading } = useResources();
  const companyData = companyDataSanity || companyDataFallback;
  const resourcesData = (!loading && resourcesSanity?.categories?.length)
    ? {
        hero: resourcesSanity.hero || resourcesDataFallback.hero,
        categories: resourcesSanity.categories,
        faqs: resourcesSanity.faqs || resourcesDataFallback.faqs || []
      }
    : resourcesDataFallback;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <title>Resources | Snyder Mechanical – Elko, NV</title>
      <meta name="description" content="Helpful resources from Snyder Mechanical including maintenance tips, FAQs, and service guides for heating, cooling, and plumbing systems in Nevada." />
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
              {resourcesData.hero?.title || resourcesDataFallback.hero.title}
            </h1>
            <p className="text-xl text-white/90">
              {resourcesData.hero?.subtitle || resourcesDataFallback.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Invoice Payment Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <motion.div
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900">
                Pay Your Invoice
              </h2>
              <p className="text-secondary-600">Securely pay your invoice online</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <InvoicePayment />
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      {(resourcesData.categories || []).map((category, categoryIndex) => {
        const Icon = iconMap[category.icon] || Wrench;
        
        return (
          <section
            key={category.id}
            className={`section-padding ${categoryIndex % 2 === 0 ? 'bg-secondary-50' : 'bg-white'}`}
          >
            <div className="container-custom">
              <motion.div
                className="flex items-center space-x-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-secondary-900">
                  {category.title}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((resource, index) => (
                  <ResourceCard key={resource.id} resource={resource} index={index} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQs */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(resourcesData.faqs || []).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
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
            Have More Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our experts are here to help. Contact us for personalized advice for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${companyData?.phone || companyDataFallback.phone}`}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call {companyData?.phone || companyDataFallback.phone}</span>
            </a>
            <Button
              to="/?modal=schedule"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
