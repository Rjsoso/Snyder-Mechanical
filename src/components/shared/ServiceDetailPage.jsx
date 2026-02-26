import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Thermometer, Wind, CheckCircle, Droplets, Flame, AlertCircle, Settings, Snowflake, Phone, CalendarCheck, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyData from '../../data/company.json';

const iconMap = {
  wrench: Wrench,
  thermometer: Thermometer,
  wind: Wind,
  'check-circle': CheckCircle,
  droplet: Droplets,
  flame: Flame,
  'alert-circle': AlertCircle,
  settings: Settings,
  snowflake: Snowflake,
};

const RELATED = {
  heating: [
    { title: 'Cooling Services', desc: 'AC repair, installation, and seasonal tune-ups.', link: '/services/cooling', color: 'from-sky-700 to-primary-700' },
    { title: 'Plumbing Services', desc: 'Water heaters, drain cleaning, leak repair, and more.', link: '/services/plumbing', color: 'from-teal-700 to-primary-700' },
  ],
  cooling: [
    { title: 'Heating Services', desc: 'Furnace repair, installation, heat pumps, and maintenance.', link: '/services/heating', color: 'from-primary-800 to-primary-600' },
    { title: 'Plumbing Services', desc: 'Water heaters, drain cleaning, leak repair, and more.', link: '/services/plumbing', color: 'from-teal-700 to-primary-700' },
  ],
  plumbing: [
    { title: 'Heating Services', desc: 'Furnace repair, installation, heat pumps, and maintenance.', link: '/services/heating', color: 'from-primary-800 to-primary-600' },
    { title: 'Cooling Services', desc: 'AC repair, installation, and seasonal tune-ups.', link: '/services/cooling', color: 'from-sky-700 to-primary-700' },
  ],
};

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border border-secondary-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-secondary-100 transition-colors"
      >
        <span className="font-semibold text-secondary-900 pr-4">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-white border-t border-secondary-200 text-secondary-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ServiceDetailPage = ({ service, serviceKey }) => {
  const phone = companyData?.phone || '(775) 738-5616';
  const related = RELATED[serviceKey] || [];

  return (
    <div className="min-h-screen">
      {/* Hero — navy gradient matching rest of site */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-36 pb-20">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/60 flex-shrink-0" />
              <span className="text-white/60 text-sm font-medium uppercase tracking-[0.18em]">Residential Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              {service.hero.title}
            </h1>
            <p className="text-lg text-white/75 mb-8 max-w-xl">
              {service.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold transition-all shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call {phone}
              </a>
              <Link
                to="/?modal=schedule"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold transition-all"
              >
                <CalendarCheck className="w-5 h-5" />
                Schedule Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white border-b border-secondary-100">
        <div className="container-custom">
          <p className="text-lg text-secondary-600 max-w-3xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white border-t border-secondary-100">
        <div className="container-custom">
          <motion.h2
            className="text-3xl font-bold text-secondary-900 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our {service.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.services.map((item, index) => {
              const Icon = iconMap[item.icon] || Wrench;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-secondary-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-white border border-secondary-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-secondary-900 mb-1.5">{item.title}</h3>
                      <p className="text-secondary-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.h2
            className="text-3xl font-bold text-secondary-900 mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Common Problems We Solve
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {service.commonProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white border border-secondary-200 rounded-lg p-5"
              >
                <h3 className="font-bold text-secondary-900 mb-1.5 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  {item.problem}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed ml-7">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding bg-white border-t border-secondary-100">
        <div className="container-custom max-w-3xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-secondary-900">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {service.faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.h2
              className="text-2xl font-bold text-secondary-900 mb-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Other Services We Offer
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((item, index) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={item.link} className="group block rounded-2xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-md transition-all">
                    <div className={`bg-gradient-to-br ${item.color} px-6 py-5 flex items-center justify-between`}>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="px-6 py-4 bg-white">
                      <p className="text-secondary-500 text-sm">{item.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Schedule?
            </h2>
            <p className="text-primary-200 text-lg max-w-xl mx-auto mb-8">
              Contact Snyder Mechanical today. We serve Elko, Spring Creek, and all of Northeastern Nevada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold text-lg transition-all shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call {phone}
              </a>
              <Link
                to="/?modal=schedule"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold text-lg transition-all"
              >
                <CalendarCheck className="w-5 h-5" />
                Request Service Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
