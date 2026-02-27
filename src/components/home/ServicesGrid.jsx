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
    tags: ['Furnace Repair', 'Installation', 'Heat Pumps'],
    accent: true,
  },
  {
    id: 'cooling',
    title: 'Cooling Services',
    description: 'Stay cool all summer long. AC repair, new system installation, tune-ups, and ductless mini-splits for every home.',
    icon: Wind,
    link: '/services/cooling',
    tags: ['AC Repair', 'Installation', 'Tune-Ups'],
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'From leaky faucets to full water heater replacements, our licensed plumbers handle every residential plumbing need.',
    icon: Droplets,
    link: '/services/plumbing',
    tags: ['Water Heaters', 'Drain Cleaning', 'Leak Repair'],
  },
];

const ServicesGrid = () => {
  const [featured, ...secondary] = services;
  const FeaturedIcon = featured.icon;

  return (
    <section className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(184,115,51,0.04) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative">

        {/* Heading */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="copper-rule" />
              <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.2em]">Residential Services</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary-900 leading-tight tracking-tight">
              Everything Your<br className="hidden md:block" /> Home Needs
            </h2>
          </div>
          <p className="text-secondary-500 text-base leading-relaxed max-w-sm md:text-right">
            Heating, cooling, and plumbing — all from one trusted local team since 1981.
          </p>
        </motion.div>

        {/* ── Featured card (full-width horizontal) ── */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link to={featured.link} className="group block">
            <div className="relative bg-white border border-secondary-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary-200/80">
              {/* Copper top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-copper-500/0 group-hover:bg-copper-500 transition-all duration-300" />

              <div className="flex flex-col md:flex-row">
                {/* Left — icon + number */}
                <div className="md:w-56 flex-shrink-0 flex flex-col items-start justify-between p-8 md:p-10 border-b md:border-b-0 md:border-r border-secondary-100">
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: 'rgba(184,115,51,0.10)', border: '1px solid rgba(184,115,51,0.20)' }}>
                      <FeaturedIcon className="w-6 h-6" style={{ color: '#b87333' }} />
                    </div>
                    <span className="text-[80px] leading-none font-black text-secondary-100 select-none block" aria-hidden="true">01</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {featured.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium text-secondary-500 bg-secondary-100 border border-secondary-200 rounded-full px-2.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — content */}
                <div className="flex flex-col flex-1 p-8 md:p-10 justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-primary-900 mb-3 tracking-tight">{featured.title}</h3>
                    <p className="text-secondary-500 text-base leading-relaxed max-w-lg">{featured.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-sm font-bold text-primary-800 group-hover:text-primary-900 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Secondary cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {secondary.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (index + 1) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link to={service.link} className="group block h-full">
                  <div className="relative h-full bg-white border border-secondary-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-secondary-200/60">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-copper-500/0 group-hover:bg-copper-500 transition-all duration-300" />

                    <div className="relative p-7 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-11 h-11 rounded-full border border-secondary-200 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-700" />
                        </div>
                        <span className="text-[52px] leading-none font-black text-secondary-100 select-none -mt-2" aria-hidden="true">
                          0{index + 2}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-primary-900 mb-2 tracking-tight">{service.title}</h3>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-medium text-secondary-500 bg-secondary-100 border border-secondary-200 rounded-full px-2.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-secondary-500 text-sm leading-relaxed flex-1">{service.description}</p>

                      <div className="mt-7 pt-5 border-t border-secondary-100 flex items-center justify-between">
                        <span className="text-secondary-400 text-xs uppercase tracking-widest font-medium">Learn More</span>
                        <span className="w-8 h-8 rounded-full border border-secondary-200 flex items-center justify-center group-hover:bg-secondary-100 group-hover:border-secondary-300 transition-all duration-200">
                          <ArrowRight className="w-3.5 h-3.5 text-secondary-500 group-hover:translate-x-0.5 transition-transform duration-200" />
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
