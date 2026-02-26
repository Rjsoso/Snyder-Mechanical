import { motion } from 'framer-motion';
import { Flame, Wind, Droplets, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'heating',
    label: '01',
    title: 'Heating Services',
    description: 'Keep your home warm through Nevada winters. Furnace repair, installation, heat pumps, and preventive maintenance by certified technicians.',
    icon: Flame,
    link: '/services/heating',
    tags: ['Furnace Repair', 'Installation', 'Heat Pumps'],
  },
  {
    id: 'cooling',
    label: '02',
    title: 'Cooling Services',
    description: 'Stay cool all summer long. AC repair, new system installation, tune-ups, and ductless mini-splits for every home.',
    icon: Wind,
    link: '/services/cooling',
    tags: ['AC Repair', 'Installation', 'Tune-Ups'],
  },
  {
    id: 'plumbing',
    label: '03',
    title: 'Plumbing Services',
    description: 'From leaky faucets to full water heater replacements, our licensed plumbers handle every residential plumbing need.',
    icon: Droplets,
    link: '/services/plumbing',
    tags: ['Water Heaters', 'Drain Cleaning', 'Leak Repair'],
  },
];

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">

        {/* Heading — left-aligned editorial */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-secondary-400 flex-shrink-0" />
              <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.2em]">What We Do</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary-900 leading-tight tracking-tight">
              Residential Services
            </h2>
          </div>
          <p className="text-secondary-500 text-base leading-relaxed max-w-sm md:text-right">
            Heating, cooling, and plumbing — all from one trusted local team since 1981.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link to={service.link} className="group block h-full">
                  <div className="relative h-full bg-primary-900 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/25">

                    {/* Top accent line — slides in on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />

                    {/* Decorative number */}
                    <div
                      className="absolute top-4 right-5 font-black text-white/[0.06] select-none pointer-events-none leading-none"
                      style={{ fontSize: '6rem' }}
                      aria-hidden="true"
                    >
                      {service.label}
                    </div>

                    {/* Card content */}
                    <div className="relative p-7 flex flex-col flex-1">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center mb-8">
                        <Icon className="w-5 h-5 text-white/80" />
                      </div>

                      {/* Title + tags */}
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-medium text-white/40 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-white/50 text-sm leading-relaxed flex-1">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                        <span className="text-white/40 text-xs uppercase tracking-widest font-medium">Learn More</span>
                        <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-200">
                          <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover:translate-x-0.5 transition-transform duration-200" />
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
          <p className="text-secondary-400 text-sm">
            Need commercial mechanical services?{' '}
            <Link to="/commercial" className="text-primary-700 font-semibold hover:text-primary-900 transition-colors">
              View Commercial Services →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
