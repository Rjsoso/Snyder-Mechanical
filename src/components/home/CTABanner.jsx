import { motion } from 'framer-motion';
import { Phone, CalendarCheck, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyData from '../../data/company.json';

const trustItems = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: MapPin, label: 'Local Since 1981' },
];

const EASE = [0.16, 1, 0.3, 1];

const CTABanner = () => {
  const phone = companyData?.phone || '(775) 738-5616';

  return (
    <section className="relative overflow-hidden" style={{ background: 'rgba(2, 6, 23, 0.20)' }}>
      {/* Single texture layer */}
      <div
        className="absolute inset-0 pointer-events-none bg-grid-subtle"
        aria-hidden="true"
      />
      {/* Faint light gradient from left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16">

          {/* Left — headline + trust */}
          <motion.div
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/40 flex-shrink-0" />
              <p className="text-white/50 font-semibold text-xs uppercase tracking-[0.22em]">Ready to Get Started?</p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              Let&rsquo;s Get Your Home<br className="hidden lg:block" /> Comfortable Again
            </h2>

            <p className="text-white/55 text-base leading-relaxed max-w-md mb-8">
              Serving Elko, Spring Creek, and all of Northeastern Nevada. Call us or request service online today.
            </p>

            {/* Trust micro-items */}
            <div className="flex flex-wrap gap-5">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-widest">
                  <Icon className="w-3.5 h-3.5 text-white/50" />
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
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          >
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-900 hover:bg-secondary-100 rounded-[6px] font-bold text-base shadow-xl transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider leading-none mb-0.5">Call Us Now</div>
                <div className="leading-none text-lg font-black">{phone}</div>
              </div>
            </a>

            <Link
              to="/?modal=schedule"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[6px] font-bold text-base transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 bg-white/10 border border-white/30 text-white hover:bg-white/20"
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
