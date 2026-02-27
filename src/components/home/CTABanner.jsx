import { motion } from 'framer-motion';
import { Phone, CalendarCheck, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyData from '../../data/company.json';

const trustItems = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: MapPin, label: 'Local Since 1981' },
];

const CTABanner = () => {
  const phone = companyData?.phone || '(775) 738-5616';

  return (
    <section className="relative overflow-hidden bg-primary-900">
      {/* Layered background depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, rgba(184,115,51,0.08) 0%, transparent 45%),
            linear-gradient(to right, rgba(2,6,23,0.6) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Industrial grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Copper diagonal stripe — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(184,115,51,0.015) 80px, rgba(184,115,51,0.015) 81px)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16">

          {/* Left — headline + trust */}
          <motion.div
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative rule with copper dot */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px max-w-[3rem]"
                style={{ background: 'rgba(184,115,51,0.5)' }} />
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#b87333' }} />
              <div className="flex-1 h-px max-w-[3rem]"
                style={{ background: 'rgba(184,115,51,0.5)' }} />
            </div>

            <p className="text-white/50 font-semibold text-xs uppercase tracking-[0.22em] mb-4">
              Ready to Get Started?
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              Let's Get Your Home<br className="hidden lg:block" /> Comfortable Again
            </h2>

            <p className="text-white/55 text-base leading-relaxed max-w-md mb-8">
              Serving Elko, Spring Creek, and all of Northeastern Nevada. Call us or request service online today.
            </p>

            {/* Trust micro-items */}
            <div className="flex flex-wrap gap-5">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-widest">
                  <Icon className="w-3.5 h-3.5" style={{ color: '#cd8b5a' }} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTAs */}
          <motion.div
            className="flex flex-col gap-4 flex-shrink-0 md:min-w-[280px]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold text-base shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider leading-none mb-0.5">Call Us Now</div>
                <div className="leading-none text-lg font-black">{phone}</div>
              </div>
            </a>

            <Link
              to="/?modal=schedule"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(184,115,51,1)',
                color: 'white',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#9e6429'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(184,115,51,1)'}
            >
              <CalendarCheck className="w-5 h-5" />
              Request Service Online
            </Link>

            <p className="text-center text-white/25 text-xs font-medium mt-1">
              Free estimates · No obligation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
