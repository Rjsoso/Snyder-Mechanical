import { motion } from 'framer-motion';
import { PhoneCall, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: PhoneCall,
    title: 'Call or Request Online',
    description: 'Give us a call or submit a service request through our website. Tell us what\'s going on and we\'ll get you scheduled fast.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'We Schedule a Visit',
    description: 'A certified technician will arrive at your home at the agreed time, ready with the right tools and parts for the job.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Fast, Clean, Quality Work',
    description: 'We complete the work efficiently, clean up after ourselves, and make sure everything is working perfectly before we leave.',
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-primary-900 relative overflow-hidden">
      {/* Background industrial grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative flex flex-col md:flex-row md:items-start gap-0 md:gap-8 py-10 border-b border-white/[0.07] last:border-b-0"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Large watermark number */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none text-white/[0.035] hidden md:block"
                  style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Step icon badge */}
                <div className="flex-shrink-0 flex items-center gap-4 md:block md:w-16">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <Icon className="w-4.5 h-4.5 text-white/70" />
                  </div>
                  <span className="text-white/20 font-black text-sm tracking-widest md:hidden">{step.number}</span>
                </div>

                {/* Content */}
                <div className="relative flex-1 md:max-w-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white/25 font-black text-xs tracking-widest hidden md:block">{step.number}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                  <p
                    className="text-white/55 text-base leading-relaxed pl-4"
                    style={{ borderLeft: '2px solid rgba(255,255,255,0.25)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Link
            to="/?modal=schedule"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-900 hover:bg-secondary-100 rounded-md font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
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
