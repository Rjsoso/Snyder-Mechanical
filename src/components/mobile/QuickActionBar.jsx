import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import companyData from '../../data/company.json';

const QuickActionBar = () => {
  const actions = [
    {
      id: 'call',
      label: 'Call',
      icon: Phone,
      href: `tel:${companyData.phone}`,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'text',
      label: 'Text',
      icon: MessageSquare,
      href: `sms:${companyData.phone}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      href: `mailto:${companyData.email}`,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t-2 border-secondary-200 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="grid grid-cols-3 gap-2 p-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.id}
              href={action.href}
              className={`${action.color} text-white rounded-lg py-3 flex flex-col items-center justify-center transition-all active:scale-95`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold">{action.label}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActionBar;
