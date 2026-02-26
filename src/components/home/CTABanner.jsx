import { motion } from 'framer-motion';
import { Phone, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyData from '../../data/company.json';

const CTABanner = () => {
  const phone = companyData?.phone || '(775) 738-5616';

  return (
    <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-20">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary-200 font-semibold text-sm uppercase tracking-wider mb-3">Ready to Get Started?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Get Your Home Comfortable
          </h2>
          <p className="text-primary-200 text-lg max-w-xl mx-auto mb-10">
            Serving Elko, Spring Creek, and all of Northeastern Nevada. Call us or request service online today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-700 hover:bg-primary-50 rounded-md font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              Call {phone}
            </a>
            <Link
              to="/?modal=schedule"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold text-lg transition-all"
            >
              <CalendarCheck className="w-5 h-5" />
              Request Service
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
