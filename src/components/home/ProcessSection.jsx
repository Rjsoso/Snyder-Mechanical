import { motion } from 'framer-motion';
import { PhoneCall, CalendarCheck, CheckCircle2 } from 'lucide-react';
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
    title: 'Fast, Clean, Guaranteed Fix',
    description: 'We complete the work efficiently, clean up after ourselves, and make sure everything is working perfectly before we leave.',
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-secondary-500 max-w-xl mx-auto">
            Getting your home comfortable again is straightforward with Snyder Mechanical.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px bg-secondary-200 -z-0" />
                )}

                <div className="relative z-10">
                  {/* Step number badge */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-2 border-primary-100 shadow-md mb-5 relative">
                    <Icon className="w-8 h-8 text-primary-700" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {step.number.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{step.title}</h3>
                  <p className="text-secondary-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/?modal=schedule"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <CalendarCheck className="w-5 h-5" />
            Schedule Your Service
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
