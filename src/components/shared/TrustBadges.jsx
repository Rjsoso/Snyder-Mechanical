import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, ThumbsUp } from 'lucide-react';
import certificationsData from '../../data/certifications.json';

const iconMap = {
  'shield-check': ShieldCheck,
  'award': Award,
  'clock': Clock,
  'thumbs-up': ThumbsUp
};

const TrustBadges = ({ className = '' }) => {
  // Ensure badges array exists
  const badges = certificationsData?.badges || [];
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = iconMap[badge.icon] || ShieldCheck;
        
        return (
          <motion.div
            key={badge.id}
            className={`flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg ${index === 3 ? 'sm:col-start-1' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Icon className="w-5 h-5 text-white" />
            <div>
              <div className="font-semibold text-sm text-white">{badge.title}</div>
              <div className="text-xs text-white/90">{badge.description}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
