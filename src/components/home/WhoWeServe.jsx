import { motion } from 'framer-motion';
import { Home, Building2, ArrowRight, Thermometer, Wrench, Wind, HardHat, Settings, Zap } from 'lucide-react';
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

const WhoWeServe = () => {
  return (
    <section className="relative overflow-hidden" aria-label="Who We Serve">
      {/* Section label above */}
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

      {/* Split panels */}
      <div className="flex flex-col md:flex-row min-h-[520px] group/panels">

        {/* ── Residential Panel ── */}
        <motion.div
          className="relative flex-1 md:flex-[1] md:hover:flex-[1.15] transition-[flex] duration-500 ease-in-out overflow-hidden cursor-pointer"
          style={{ background: '#f7f4f0' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Warm background accent shape */}
          <div
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(184,115,51,0.08) 0%, transparent 70%)',
              transform: 'translate(30%, 30%)',
            }}
            aria-hidden="true"
          />

          <Link to="/services/heating" className="group block h-full p-10 md:p-14 flex flex-col justify-between relative z-10">
            <div>
              {/* Icon + eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(184,115,51,0.10)', borderColor: 'rgba(184,115,51,0.25)' }}>
                  <Home className="w-5 h-5" style={{ color: '#b87333' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary-400">Homeowners</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-black text-primary-900 leading-tight tracking-tight mb-4">
                Comfort<br />for Your Home
              </h2>

              <p className="text-secondary-500 text-base leading-relaxed max-w-sm mb-8">
                Trusted HVAC and plumbing for Elko &amp; Spring Creek families. Fast, clean, done right the first time — since 1981.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-10">
                {residentialFeatures.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium text-secondary-600">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(184,115,51,0.10)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: '#b87333' }} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 text-sm font-bold text-primary-800 group-hover:text-primary-900 transition-colors">
              <span>Explore Residential Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Right edge accent line */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,115,51,0.25), transparent)' }}
            aria-hidden="true" />
        </motion.div>

        {/* ── Commercial Panel ── */}
        <motion.div
          className="relative flex-1 md:flex-[1] md:hover:flex-[1.15] transition-[flex] duration-500 ease-in-out overflow-hidden cursor-pointer bg-primary-800"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Industrial grid pattern */}
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

          {/* Copper diagonal accent */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(184,115,51,0.06) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />

          <Link to="/commercial" className="group block h-full p-10 md:p-14 flex flex-col justify-between relative z-10">
            <div>
              {/* Icon + eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{ background: 'rgba(184,115,51,0.12)', borderColor: 'rgba(184,115,51,0.30)' }}>
                  <Building2 className="w-5 h-5" style={{ color: '#cd8b5a' }} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Commercial</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
                Built for<br />Business Scale
              </h2>

              <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8">
                Design/build expertise, commercial HVAC systems, and mechanical contracting for businesses across Northeastern Nevada.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-10">
                {commercialFeatures.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/70">
                    <span className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(184,115,51,0.12)', border: '1px solid rgba(184,115,51,0.20)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: '#cd8b5a' }} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 text-sm font-bold text-white/80 group-hover:text-white transition-colors">
              <span>View Commercial Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServe;
