import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Thermometer, Droplet, AlertCircle, Wrench, Building, Wind, Factory, CircleDot, Settings, Package } from 'lucide-react';
import { useServiceCategories } from '../hooks/useSanityData';
import servicesDataFallback from '../data/services.json';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const iconMap = {
  'thermometer': Thermometer,
  'droplet': Droplet,
  'alert-circle': AlertCircle,
  'wrench': Wrench,
  'building': Building,
  'wind': Wind,
  'pipe': Factory,
  'factory': Factory,
  'circle-dot': CircleDot,
  'tool': Settings,
  'package': Package,
};

const serviceMap = {
  'residential': 'residential',
  'commercial': 'commercial',
  'pumps-equipment': 'pumpsEquipment'
};

const ServicePage = () => {
  const { slug } = useParams();
  const { data: sanityCategories, loading } = useServiceCategories();
  const service = sanityCategories?.[slug] || servicesDataFallback[serviceMap[slug]];

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

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Service Not Found</h1>
          <Button to="/services/residential">View Our Services</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {service.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <p className="text-xl text-secondary-700 text-center max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-secondary-900">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded">
                              {item.badge}
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

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact Snyder Mechanical today for expert {service.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              to="/?modal=schedule" 
              variant="accent" 
              size="lg"
            >
              Schedule Service
            </Button>
            <Button 
              to="/?modal=estimate" 
              variant="outline"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Request Estimate
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
