import { Phone, CalendarCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import companyData from '../../data/company.json';

const QuickActionBar = () => {
  const phone = companyData?.phone || '(775) 738-5616';
  const email = companyData?.email || 'info@snydermechanical.com';

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-secondary-200 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="grid grid-cols-3">
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center gap-1 py-3.5 bg-amber-500 hover:bg-amber-400 text-white transition-colors active:scale-95"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-bold">Call Us</span>
        </a>
        <Link
          to="/?modal=schedule"
          className="flex flex-col items-center justify-center gap-1 py-3.5 bg-primary-700 hover:bg-primary-800 text-white transition-colors active:scale-95"
        >
          <CalendarCheck className="w-5 h-5" />
          <span className="text-xs font-bold">Schedule</span>
        </Link>
        <a
          href={`mailto:${email}`}
          className="flex flex-col items-center justify-center gap-1 py-3.5 bg-primary-900 hover:bg-primary-800 text-white transition-colors active:scale-95"
        >
          <Mail className="w-5 h-5" />
          <span className="text-xs font-bold">Email</span>
        </a>
      </div>
    </motion.div>
  );
};

export default QuickActionBar;
