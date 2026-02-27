import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone } from 'lucide-react';
import companyData from '../../data/company.json';

const EASE = [0.16, 1, 0.3, 1];

const MAPS_QUERY = '4745+Manzanita+Dr,+Elko,+NV+89801';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const LocationSection = () => {
  const phone = companyData?.phone || '(775) 738-5616';
  const address = companyData?.address?.display || '4745 Manzanita Dr, Elko, NV 89801';

  return (
    <section className="bg-primary-900 border-t border-white/5">
      <div className="container-custom py-16 md:py-20">

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left — info */}
          <motion.div
            className="flex-shrink-0 lg:w-72"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/40 flex-shrink-0" />
              <p className="text-white/50 font-semibold text-xs uppercase tracking-[0.22em]">Our Location</p>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-4">
              Find Us in Elko, NV
            </h2>

            <div className="flex items-start gap-3 text-white/60 text-sm mb-3">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
              <span>{address}</span>
            </div>

            <div className="flex items-center gap-3 text-white/60 text-sm mb-8">
              <Phone className="w-4 h-4 flex-shrink-0 text-white/40" />
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[6px] bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </motion.div>

          {/* Right — map */}
          <motion.div
            className="w-full flex-1 min-h-[340px] md:min-h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          >
            <iframe
              title="Snyder Mechanical location map"
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ minHeight: '340px', border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
