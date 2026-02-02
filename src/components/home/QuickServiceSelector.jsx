import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Snowflake, Droplets, AlertCircle } from 'lucide-react';

const services = [
  {
    id: 'heating',
    title: 'Heating',
    icon: Flame,
    link: '/services/heating',
    color: 'from-orange-500 to-red-500',
    description: 'Furnace & heating repairs'
  },
  {
    id: 'cooling',
    title: 'Cooling',
    icon: Snowflake,
    link: '/services/cooling',
    color: 'from-blue-400 to-cyan-500',
    description: 'AC installation & service'
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: Droplets,
    link: '/services/plumbing',
    color: 'from-blue-500 to-blue-600',
    description: 'Complete plumbing solutions'
  },
  {
    id: 'emergency',
    title: '24/7 Emergency',
    icon: AlertCircle,
    link: '/services/emergency',
    color: 'from-red-600 to-red-700',
    description: 'Immediate assistance'
  }
];

const QuickServiceSelector = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-secondary-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            What Do You Need?
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Select a service to get started or call us for immediate assistance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`bg-gradient-to-br ${service.color} p-8 text-white h-full min-h-[200px] flex flex-col items-center justify-center text-center`}>
                    <div className="w-16 h-16 mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-white/90">{service.description}</p>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickServiceSelector;
