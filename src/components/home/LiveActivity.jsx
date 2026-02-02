import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const activities = [
  { name: 'Sarah', location: 'Elko', service: 'AC maintenance', time: '5 minutes ago' },
  { name: 'Mike', location: 'Spring Creek', service: 'furnace repair', time: '12 minutes ago' },
  { name: 'Lisa', location: 'Elko', service: 'plumbing service', time: '18 minutes ago' },
  { name: 'Tom', location: 'Spring Creek', service: 'HVAC installation', time: '25 minutes ago' },
  { name: 'Jennifer', location: 'Elko', service: 'emergency repair', time: '32 minutes ago' }
];

const LiveActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentActivity}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl border border-secondary-100 p-4 max-w-xs"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-secondary-900">
                  <span className="text-primary-600">{activity.name}</span> in {activity.location}
                </p>
                <p className="text-sm text-secondary-600">
                  just scheduled {activity.service}
                </p>
                <p className="text-xs text-secondary-500 mt-1 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {activity.time}
                </p>
              </div>
            </div>
            
            {/* Live indicator */}
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="text-xs text-secondary-500 font-medium">LIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivity;
