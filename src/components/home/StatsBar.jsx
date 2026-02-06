import { motion } from 'framer-motion';
import { Award, Briefcase, Shield } from 'lucide-react';
import { useCompanyData } from '../../hooks/useSanityData';

const StatsBar = () => {
  const { data: companyData } = useCompanyData();

  // Fallback stats if Sanity data is not available
  const stats = [
    {
      icon: Briefcase,
      value: companyData?.stats?.yearsInBusiness || `${new Date().getFullYear() - 1981}+`,
      label: 'Years in Business'
    },
    {
      icon: Award,
      value: companyData?.stats?.projectsCompleted || '5000+',
      label: 'Projects Completed'
    },
    {
      icon: Shield,
      value: companyData?.stats?.certifications || 'Fully Licensed & Insured',
      label: ''
    }
  ];
  return (
    <section className="section-padding bg-primary-800 text-white">
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                {stat.label && (
                  <div className="text-lg text-white/80">
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
