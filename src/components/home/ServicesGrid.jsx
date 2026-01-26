import { motion } from 'framer-motion';
import { Home, Building2, Droplets, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';

const services = [
  {
    id: 'residential',
    title: 'Residential Services',
    description: 'Expert HVAC and plumbing services for your home. Installation, repair, maintenance, and 24/7 emergency services.',
    icon: Home,
    link: '/services/residential',
    color: 'primary'
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    description: 'Design/build projects and commercial mechanical contracting for businesses and industrial facilities.',
    icon: Building2,
    link: '/services/commercial',
    color: 'secondary'
  },
  {
    id: 'pumps',
    title: 'Pumps & Equipment',
    description: 'Professional pump installation, maintenance, and equipment supply for all applications.',
    icon: Droplets,
    link: '/services/pumps-equipment',
    color: 'accent'
  }
];

const ServicesGrid = () => {
  return (
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
            Our Services
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Comprehensive mechanical solutions for residential, commercial, and industrial clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.link}>
                  <Card hover className="h-full">
                    <div className={`w-16 h-16 rounded-lg bg-${service.color}-100 flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 text-${service.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
