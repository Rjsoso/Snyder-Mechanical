import { motion } from 'framer-motion';
import { useCompanyData } from '../../hooks/useSanityData';

const StatsBar = () => {
  const { data: companyData } = useCompanyData();
  const yearsInBusiness = new Date().getFullYear() - 1981;

  const stats = [
    {
      value: companyData?.stats?.yearsInBusiness || `${yearsInBusiness}+`,
      label: 'Years in Business',
      suffix: '',
    },
    {
      value: companyData?.stats?.projectsCompleted || '5,000+',
      label: 'Projects Completed',
      suffix: '',
    },
    {
      value: '3',
      label: 'Service Areas',
      suffix: ' Counties',
    },
    {
      value: '100%',
      label: 'Satisfaction Guarantee',
      suffix: '',
    },
  ];

  return (
    <section className="bg-white border-y border-secondary-100 py-14">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold text-primary-700 leading-none mb-1">
                {stat.value}
                <span className="text-3xl md:text-4xl">{stat.suffix}</span>
              </div>
              {/* Amber accent underline */}
              <div className="w-10 h-1 bg-amber-500 rounded-full mx-auto my-3" />
              <div className="text-secondary-500 font-medium text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
