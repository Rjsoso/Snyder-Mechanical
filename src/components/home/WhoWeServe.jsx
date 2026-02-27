import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUp, Flame, Wind, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const residentialTags = ['Heating & Cooling', 'Plumbing', 'Indoor Air Quality'];

const commercialServices = [
  { number: '01', label: 'Design/Build Projects' },
  { number: '02', label: 'Commercial HVAC' },
  { number: '03', label: 'Pumps & Equipment' },
];

const residentialServices = [
  {
    id: 'heating',
    title: 'Heating Services',
    description: 'Furnace repair, heat pumps, and full installations. We keep Nevada families warm all winter.',
    icon: Flame,
    link: '/services/heating',
    tags: ['Furnace Repair', 'Heat Pumps', 'Installation'],
  },
  {
    id: 'cooling',
    title: 'Cooling Services',
    description: 'AC repair, tune-ups, and new system installations. Stay comfortable through every summer.',
    icon: Wind,
    link: '/services/cooling',
    tags: ['AC Repair', 'Tune-Ups', 'Mini-Splits'],
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    description: 'Water heaters, drain cleaning, leak repair — licensed plumbers for every residential need.',
    icon: Droplets,
    link: '/services/plumbing',
    tags: ['Water Heaters', 'Drain Cleaning', 'Leak Repair'],
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const offsets = ['mt-0', 'mt-4', 'mt-8'];
  return (
    <motion.div
      className={offsets[index] || 'mt-0'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={service.link} className="group block h-full">
        <div className="relative h-full bg-white border border-secondary-200 rounded-[10px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary-200/70">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-900/0 group-hover:bg-primary-900 transition-all duration-300" />

          <div className="p-7 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-11 h-11 rounded-[10px] flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.10)',
                }}
              >
                <Icon className="w-5 h-5 text-primary-700" />
              </div>
            </div>

            <h3 className="text-lg font-black text-primary-900 mb-2 tracking-tight">{service.title}</h3>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-secondary-500 bg-secondary-100 border border-secondary-200 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-secondary-500 text-sm leading-relaxed flex-1">{service.description}</p>

            <div className="mt-6 pt-4 border-t border-secondary-100 flex items-center justify-between">
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
};

const WhoWeServe = () => {
  const [showServices, setShowServices] = useState(false);

  const handleResidentialClick = () => {
    setShowServices(prev => !prev);
  };

  return (
    <section className="relative overflow-hidden" aria-label="Who We Serve">
      {/* Section label */}
      <motion.div
        className="py-5 border-b border-secondary-200"
        style={{ background: '#f5f3ef' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom flex items-center gap-3">
          <span className="accent-rule-dark" />
          <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.22em]">Who We Serve</p>
        </div>
      </motion.div>

      {/* Split panels */}
      <div className="flex flex-col md:flex-row min-h-[520px]">

        {/* Residential Panel */}
        <motion.div
          className={`relative overflow-hidden cursor-pointer transition-[flex] ease-[cubic-bezier(0.16,1,0.3,1)] duration-[400ms] min-h-[320px] md:min-h-0 ${
            showServices ? 'flex-[1.15]' : 'flex-1 md:hover:flex-[1.1]'
          }`}
          style={{ background: showServices ? '#f5f3ef' : '#faf9f7' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleResidentialClick}
        >
          {/* Warm corner accent */}
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(217,119,6,0.05) 0%, transparent 70%)',
              transform: 'translate(30%, 30%)',
            }}
            aria-hidden="true"
          />

          <div className="p-8 md:p-14 flex flex-col justify-between relative z-10 h-full gap-8">
            <div className="w-max max-w-full">
              {/* Eyebrow */}
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-secondary-400">Homeowners</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-primary-900 leading-tight tracking-tight mb-5">
                Comfort<br />for Your Home
              </h2>

              {/* Editorial copy with subtle warm left-border */}
              <div
                className="pl-4 mb-8"
                style={{ borderLeft: '2px solid rgba(217,119,6,0.25)' }}
              >
                <p className="text-secondary-600 text-base leading-relaxed">
                  Trusted HVAC and plumbing for Elko &amp; Spring Creek families. Fast, clean, done right the first time — since 1981.
                </p>
              </div>

              {/* Service tags — badges, not icon rows */}
              <div className="flex flex-wrap gap-2">
                {residentialTags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-secondary-600 bg-white border border-secondary-200 rounded-full px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Toggle CTA */}
            <div className="flex items-center gap-3 text-sm font-bold text-primary-800 hover:text-primary-900 transition-colors duration-200 select-none">
              {showServices ? (
                <>
                  <span>Hide Services</span>
                  <ArrowUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Explore Residential Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 hover:translate-x-1" />
                </>
              )}
            </div>
          </div>

          {/* Right edge divider */}
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.08), transparent)' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Commercial Panel */}
        <motion.div
          className="relative flex-1 md:hover:flex-[1.1] transition-[flex] ease-[cubic-bezier(0.16,1,0.3,1)] duration-[400ms] overflow-hidden cursor-pointer bg-primary-800 min-h-[320px] md:min-h-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none bg-grid-subtle"
            aria-hidden="true"
          />

          <Link to="/commercial" className="group block h-full p-8 md:p-14 flex flex-col justify-between relative z-10">
            <div className="w-max max-w-full">
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-white/40">Commercial</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-5">
                Built for<br />Business Scale
              </h2>

              <p className="text-white/70 text-base leading-relaxed max-w-sm mb-10">
                Design/build expertise, commercial HVAC systems, and mechanical contracting for businesses across Northeastern Nevada.
              </p>

              {/* Indexed service list — text-only, no icons */}
              <ul className="space-y-4">
                {commercialServices.map(({ number, label }) => (
                  <li key={number} className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-white/25 flex-shrink-0 w-6">{number}</span>
                    <span className="text-sm font-medium text-white/80">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-white/80 group-hover:text-white transition-colors duration-200 mt-10">
              <span>View Commercial Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Inline service drawer */}
      <AnimatePresence>
        {showServices && (
          <motion.div
            key="service-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
            style={{ background: '#faf9f7', borderTop: '1px solid rgba(0,0,0,0.07)' }}
          >
            <div className="container-custom py-12">
              {/* Drawer header */}
              <div className="flex items-center gap-3 mb-10">
                <span className="accent-rule-dark" />
                <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.2em]">
                  Residential Services
                </p>
              </div>

              {/* Service cards with staggered vertical offset */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
                {residentialServices.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>

              {/* Collapse affordance */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={e => { e.stopPropagation(); setShowServices(false); }}
                  className="flex items-center gap-2 text-xs font-semibold text-secondary-400 hover:text-secondary-600 uppercase tracking-widest transition-colors duration-200 py-2 px-4"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  Collapse
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhoWeServe;
