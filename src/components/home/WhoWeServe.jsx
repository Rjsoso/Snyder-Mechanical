import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Building2, ArrowRight, ArrowUp,
  Thermometer, Wrench, Wind,
  HardHat, Settings, Zap,
  Flame, Droplets,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const residentialFeatures = [
  { icon: Thermometer, label: 'Heating & Cooling' },
  { icon: Wrench, label: 'Plumbing Services' },
  { icon: Wind, label: 'Indoor Air Quality' },
];

const commercialFeatures = [
  { icon: HardHat, label: 'Design/Build Projects' },
  { icon: Settings, label: 'Commercial HVAC' },
  { icon: Zap, label: 'Pumps & Equipment' },
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={service.link} className="group block h-full">
        <div className="relative h-full bg-white border border-secondary-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary-200/70">
          {/* Copper top accent on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-copper-500/0 group-hover:bg-copper-500 transition-all duration-300" />

          <div className="p-7 flex flex-col flex-1">
            {/* Icon + number */}
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(184,115,51,0.09)',
                  border: '1px solid rgba(184,115,51,0.20)',
                }}
              >
                <Icon className="w-5 h-5" style={{ color: '#b87333' }} />
              </div>
              <span
                className="text-[52px] leading-none font-black select-none -mt-1"
                style={{ color: '#e2e8f0' }}
                aria-hidden="true"
              >
                0{index + 1}
              </span>
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
        className="bg-secondary-100 py-5 border-b border-secondary-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom flex items-center gap-3">
          <span className="copper-rule" />
          <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.22em]">Who We Serve</p>
        </div>
      </motion.div>

      {/* ── Split panels ── */}
      <div className="flex flex-col md:flex-row min-h-[520px]">

        {/* Residential Panel */}
        <motion.div
          className={`relative overflow-hidden cursor-pointer transition-[flex] duration-500 ease-in-out ${
            showServices ? 'flex-[1.15]' : 'flex-1 md:hover:flex-[1.1]'
          }`}
          style={{ background: showServices ? '#f0ece6' : '#f7f4f0' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={handleResidentialClick}
        >
          {/* Warm radial accent */}
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(184,115,51,0.10) 0%, transparent 70%)',
              transform: 'translate(30%, 30%)',
            }}
            aria-hidden="true"
          />

          <div className="group p-10 md:p-14 flex flex-col justify-between relative z-10 h-full">
            <div>
              {/* Icon + eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(184,115,51,0.10)', borderColor: 'rgba(184,115,51,0.25)' }}
                >
                  <Home className="w-5 h-5" style={{ color: '#b87333' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary-400">Homeowners</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-primary-900 leading-tight tracking-tight mb-4">
                Comfort<br />for Your Home
              </h2>

              <p className="text-secondary-500 text-base leading-relaxed max-w-sm mb-8">
                Trusted HVAC and plumbing for Elko &amp; Spring Creek families. Fast, clean, done right the first time — since 1981.
              </p>

              <ul className="space-y-3 mb-10">
                {residentialFeatures.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium text-secondary-600">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(184,115,51,0.10)' }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: '#b87333' }} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Toggle CTA */}
            <div className="flex items-center gap-3 text-sm font-bold text-primary-800 hover:text-primary-900 transition-colors select-none">
              {showServices ? (
                <>
                  <span>Hide Services</span>
                  <ArrowUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Explore Residential Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </>
              )}
            </div>
          </div>

          {/* Right edge accent */}
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,115,51,0.25), transparent)' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Commercial Panel */}
        <motion.div
          className="relative flex-1 md:hover:flex-[1.1] transition-[flex] duration-500 ease-in-out overflow-hidden cursor-pointer bg-primary-800"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Industrial grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
            aria-hidden="true"
          />

          {/* Copper diagonal */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(184,115,51,0.06) 0%, transparent 50%)' }}
            aria-hidden="true"
          />

          <Link to="/commercial" className="group block h-full p-10 md:p-14 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{ background: 'rgba(184,115,51,0.12)', borderColor: 'rgba(184,115,51,0.30)' }}
                >
                  <Building2 className="w-5 h-5" style={{ color: '#cd8b5a' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Commercial</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
                Built for<br />Business Scale
              </h2>

              <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8">
                Design/build expertise, commercial HVAC systems, and mechanical contracting for businesses across Northeastern Nevada.
              </p>

              <ul className="space-y-3 mb-10">
                {commercialFeatures.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/70">
                    <span
                      className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(184,115,51,0.12)', border: '1px solid rgba(184,115,51,0.20)' }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: '#cd8b5a' }} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-white/80 group-hover:text-white transition-colors">
              <span>View Commercial Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── Inline service drawer ── */}
      <AnimatePresence>
        {showServices && (
          <motion.div
            key="service-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
            style={{ background: '#f7f4f0', borderTop: '1px solid rgba(184,115,51,0.18)' }}
          >
            <div className="container-custom py-10">
              {/* Drawer header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="copper-rule" />
                <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.2em]">
                  Residential Services
                </p>
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {residentialServices.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>

              {/* Close affordance */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={e => { e.stopPropagation(); setShowServices(false); }}
                  className="flex items-center gap-2 text-xs font-semibold text-secondary-400 hover:text-secondary-600 uppercase tracking-widest transition-colors"
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
