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
  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {certificationsData.badges.map((badge, index) => {
        const Icon = iconMap[badge.icon] || ShieldCheck;
        
        return (
          <motion.div
            key={badge.id}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Icon className="w-5 h-5 text-accent-300" />
            <div>
              <div className="font-semibold text-sm">{badge.title}</div>
              <div className="text-xs text-primary-200">{badge.description}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
