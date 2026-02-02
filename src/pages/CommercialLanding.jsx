import { motion } from 'framer-motion';
import { Building2, Wrench, Factory, Droplets, CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import companyData from '../data/company.json';
import servicesData from '../data/services.json';

const CommercialLanding = () => {
  const commercialService = servicesData.commercial;
  const pumpsService = servicesData.pumpsEquipment;

  const capabilities = [
    {
      title: 'Design/Build Expertise',
      description: 'Complete mechanical system design and construction for new commercial projects from concept to completion.',
      icon: Building2
    },
    {
      title: 'Commercial HVAC',
      description: 'Installation, maintenance, and repair of commercial heating and cooling systems of any size.',
      icon: Wrench
    },
    {
      title: 'Industrial Systems',
      description: 'Specialized mechanical services for industrial and manufacturing facilities.',
      icon: Factory
    },
    {
      title: 'Pumps & Equipment',
      description: 'Professional pump installation, maintenance, and equipment supply for commercial applications.',
      icon: Droplets
    }
  ];

  const advantages = [
    'Over 40 years of commercial experience',
    'Licensed for large-scale projects',
    'Fully insured with commercial liability coverage',
    'In-house design and engineering team',
    'Project management from start to finish',
    '24/7 emergency commercial service',
    'Preventive maintenance programs',
    'Energy-efficient solutions',
    'Code compliance expertise',
    'Safety-first approach'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-secondary-200 hover:text-white transition-colors mb-6 text-sm"
            >
              ← Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Commercial Mechanical Contracting Excellence
            </h1>
            <p className="text-xl text-secondary-100 mb-8 max-w-3xl">
              Trusted by businesses across Northeastern Nevada for over 40 years. From design/build projects to ongoing maintenance, we deliver professional commercial mechanical solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${companyData.phone}`}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-accent-600 hover:bg-accent-700 rounded-lg font-semibold transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>{companyData.phone}</span>
              </a>
              <Button
                to="/?modal=estimate"
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-700"
              >
                Request Project Bid
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
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
              Our Commercial Capabilities
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Comprehensive mechanical solutions for businesses, industrial facilities, and new construction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-t-4 border-secondary-600">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-secondary-100 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-secondary-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">
                          {capability.title}
                        </h3>
                        <p className="text-secondary-600">
                          {capability.description}
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

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Why Businesses Choose Snyder Mechanical
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                We understand the unique challenges of commercial mechanical systems. Our team brings decades of experience, professional certifications, and a commitment to minimizing downtime for your business.
              </p>
              <Button
                to="/portfolio"
                variant="primary"
                size="lg"
                className="inline-flex items-center"
              >
                View Our Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white">
                <h3 className="text-xl font-bold text-secondary-900 mb-6">
                  Commercial Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Links */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Explore Our Commercial Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/services/commercial">
              <Card hover className="h-full border-t-4 border-secondary-600">
                <div className="text-center p-4">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-secondary-600" />
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {commercialService.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {commercialService.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/services/pumps-equipment">
              <Card hover className="h-full border-t-4 border-secondary-600">
                <div className="text-center p-4">
                  <Droplets className="w-16 h-16 mx-auto mb-4 text-secondary-600" />
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {pumpsService.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {pumpsService.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-700 to-secondary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discuss Your Commercial Project?
          </h2>
          <p className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto">
            From design/build projects to routine maintenance, we're here to support your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${companyData.phone}`}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-accent-600 hover:bg-accent-700 rounded-lg font-semibold transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>{companyData.phone}</span>
            </a>
            <Button
              to="/?modal=estimate"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-secondary-700"
            >
              Request Project Bid
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialLanding;
