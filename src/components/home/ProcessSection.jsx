import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Call or Request Online',
    description: 'Give us a call or submit a service request through our website. Tell us what\'s going on and we\'ll get you scheduled fast.',
  },
  {
    number: '02',
    title: 'We Schedule a Visit',
    description: 'A certified technician will arrive at your home at the agreed time, ready with the right tools and parts for the job.',
  },
  {
    number: '03',
    title: 'Fast, Clean, Quality Work',
    description: 'We complete the work efficiently, clean up after ourselves, and make sure everything is working perfectly before we leave.',
  },
];

const EASE = [0.16, 1, 0.3, 1];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-primary-900 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none bg-grid-subtle"
        aria-hidden="true"
      />

      <div className="container-custom relative">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="accent-rule" />
            <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">The Process</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-lg">
            Simple From<br />Start to Finish
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col md:flex-row md:items-start gap-0 md:gap-10 py-10 border-b border-white/[0.07] last:border-b-0"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: EASE }}
            >
              {/* Large watermark number */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-mono font-black leading-none text-white/[0.03] hidden md:block"
                style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Step number badge — mono, no icon */}
              <div className="flex-shrink-0 flex items-center gap-4 md:block">
                <div
                  className="w-16 h-16 rounded-[6px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <span className="font-mono font-black text-xl text-white/50 tracking-tighter">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 md:max-w-xl mt-4 md:mt-0 md:pt-3">
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                <p
                  className="text-white/55 text-base leading-relaxed pl-4"
                  style={{ borderLeft: '3px solid rgba(255,255,255,0.35)' }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
        >
          <Link
            to="/?modal=schedule"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-900 hover:bg-secondary-100 rounded-[6px] font-bold text-sm transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
          >
            <CalendarCheck className="w-5 h-5" />
            Schedule Your Service
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
