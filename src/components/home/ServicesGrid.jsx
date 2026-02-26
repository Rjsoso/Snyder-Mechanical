import { motion } from 'framer-motion';
import { Flame, Wind, Droplets, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'heating',
    title: 'Heating Services',
    description: 'Keep your home warm through Nevada winters. Furnace repair, installation, heat pumps, and preventive maintenance by certified technicians.',
    icon: Flame,
    link: '/services/heating',
    highlight: 'Furnace Repair · Installation · Heat Pumps',
  },
  {
    id: 'cooling',
    title: 'Cooling Services',
    description: 'Stay cool all summer long. AC repair, new system installation, tune-ups, and ductless mini-splits for every home.',
    icon: Wind,
    link: '/services/cooling',
    highlight: 'AC Repair · Installation · Tune-Ups',
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'From leaky faucets to full water heater replacements, our licensed plumbers handle every residential plumbing need.',
    icon: Droplets,
    link: '/services/plumbing',
    highlight: 'Water Heaters · Drain Cleaning · Leak Repair',
  },
];

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Residential Services
          </h2>
          <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
            Comprehensive home comfort solutions — heating, cooling, and plumbing — all from one trusted local team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: index === 0 ? -30 : index === 2 ? 30 : 0, y: index === 1 ? 30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link to={service.link} className="group block h-full">
                  <div className="h-full rounded-lg overflow-hidden border border-secondary-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
                    {/* Gradient header band */}
                    <div className="bg-gradient-to-br from-primary-800 to-primary-600 px-6 pt-8 pb-6">
                      <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-primary-200 text-xs font-medium">{service.highlight}</p>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5 flex flex-col flex-1">
                      <p className="text-secondary-600 text-sm leading-relaxed mb-4 flex-1">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-end pt-4 border-t border-secondary-100">
                        <span className="flex items-center gap-1 text-primary-700 font-semibold text-sm group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Commercial link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-secondary-500 text-sm">
            Need commercial mechanical services?{' '}
            <Link to="/commercial" className="text-primary-700 font-semibold hover:underline">
              View Commercial Services →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
