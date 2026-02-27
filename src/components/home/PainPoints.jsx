import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Building2 } from 'lucide-react';

const painPoints = [
  {
    icon: Thermometer,
    problem: 'No Heat in Winter',
    solution: 'We dispatch same-day. No family sleeps cold.',
  },
  {
    icon: Droplets,
    problem: 'Burst Pipes or Leaks',
    solution: 'Licensed plumbers on-call. Fast containment, no guesswork.',
  },
  {
    icon: Wind,
    problem: 'AC Out in Summer',
    solution: 'Quick diagnosis, most repairs done in a single visit.',
  },
  {
    icon: Building2,
    problem: 'Business Downtime',
    solution: 'Commercial-grade response. Minimal disruption, maximum uptime.',
  },
];

const PainPoints = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle top rule */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="copper-rule" />
              <p className="text-secondary-500 font-semibold text-xs uppercase tracking-[0.2em]">
                We've Seen It All
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary-900 leading-tight tracking-tight">
              Whatever's Wrong,<br className="hidden sm:block" /> We Fix It Fast
            </h2>
          </div>
          <p className="text-secondary-500 text-base leading-relaxed max-w-sm md:text-right">
            Home or business — when something breaks, you need a crew that responds and gets it right.
          </p>
        </motion.div>

        {/* Pain point grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {painPoints.map(({ icon: Icon, problem, solution }, index) => (
            <motion.div
              key={problem}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-secondary-200 bg-secondary-50 hover:bg-white hover:border-secondary-300 hover:shadow-md hover:shadow-secondary-100/80 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  background: 'rgba(184,115,51,0.09)',
                  border: '1px solid rgba(184,115,51,0.18)',
                }}
              >
                <Icon className="w-5 h-5" style={{ color: '#b87333' }} />
              </div>

              {/* Copy */}
              <div>
                <p className="font-bold text-primary-900 text-base mb-1 tracking-tight">
                  {problem}
                </p>
                <p
                  className="text-sm leading-relaxed pl-3"
                  style={{
                    color: '#64748b',
                    borderLeft: '2px solid rgba(184,115,51,0.35)',
                  }}
                >
                  {solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
