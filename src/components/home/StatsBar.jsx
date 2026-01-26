import { motion } from 'framer-motion';
import { Award, Briefcase, Shield } from 'lucide-react';
import companyData from '../../data/company.json';

const stats = [
  {
    icon: Briefcase,
    value: companyData.stats.yearsInBusiness,
    label: 'Years in Business'
  },
  {
    icon: Award,
    value: companyData.stats.projectsCompleted,
    label: 'Projects Completed'
  },
  {
    icon: Shield,
    value: companyData.stats.certifications,
    label: ''
  }
];

const StatsBar = () => {
  return (
    <section className="section-padding bg-secondary-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-secondary-900 mb-2">
                  {stat.value}
                </div>
                {stat.label && (
                  <div className="text-lg text-secondary-600">
                    {stat.label}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
