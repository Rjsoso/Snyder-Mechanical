import { motion } from 'framer-motion';
import { FileText, CheckSquare, Clock } from 'lucide-react';
import Card from '../shared/Card';
import Badge from '../shared/Badge';

const ResourceCard = ({ resource, index }) => {
  const typeIcons = {
    guide: FileText,
    checklist: CheckSquare
  };

  const Icon = typeIcons[resource.type] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-secondary-900 pr-2">
                {resource.title}
              </h3>
              <Badge variant="outline" size="sm" className="flex-shrink-0">
                {resource.type}
              </Badge>
            </div>
            <p className="text-secondary-600 mb-3">
              {resource.description}
            </p>
            <div className="flex items-center text-sm text-secondary-500">
              <Clock className="w-4 h-4 mr-1" />
              {resource.readTime}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;
