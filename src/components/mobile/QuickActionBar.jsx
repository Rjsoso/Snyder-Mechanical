import { Phone, CalendarCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import companyData from '../../data/company.json';

const QuickActionBar = () => {
  const phone = companyData?.phone || '(775) 738-5616';
  const email = companyData?.email || 'info@snydermechanical.com';

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ background: '#0a0a0a' }}
    >
      <div className="grid grid-cols-3">
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center gap-1.5 py-4 text-white hover:bg-white/10 transition-colors duration-200 active:bg-white/20 min-h-[56px]"
          aria-label={`Call us at ${phone}`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide">Call Us</span>
        </a>
        <Link
          to="/?modal=schedule"
          className="flex flex-col items-center justify-center gap-1.5 py-4 bg-white text-primary-900 hover:bg-secondary-100 transition-colors duration-200 active:bg-secondary-200 min-h-[56px]"
          aria-label="Schedule a service visit"
        >
          <CalendarCheck className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide">Schedule</span>
        </Link>
        <a
          href={`mailto:${email}`}
          className="flex flex-col items-center justify-center gap-1.5 py-4 text-white hover:bg-white/10 transition-colors duration-200 active:bg-white/20 min-h-[56px]"
          aria-label={`Email us at ${email}`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide">Email</span>
        </a>
      </div>
    </motion.div>
  );
};

export default QuickActionBar;
