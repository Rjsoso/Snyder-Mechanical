import { motion } from 'framer-motion';
import { useCompanyData } from '../../hooks/useSanityData';
import CountUp from './CountUp';

const StatsBar = () => {
  const { data: companyData } = useCompanyData();
  const yearsInBusiness = new Date().getFullYear() - 1981;

  const stats = [
    {
      to: companyData?.stats?.yearsInBusiness
        ? parseInt(companyData.stats.yearsInBusiness)
        : yearsInBusiness,
      suffix: '+',
      label: 'Years in Business',
      separator: '',
    },
    {
      to: 5000,
      suffix: '+',
      label: 'Projects Completed',
      separator: ',',
    },
    {
      to: 3,
      suffix: '',
      label: 'Service Areas',
      sublabel: 'Counties',
    },
  ];

  return (
    <section className="bg-white border-y border-secondary-200 py-14">
      <div className="container-custom">
        <div className="grid grid-cols-3 gap-8">
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
                <CountUp
                  from={0}
                  to={stat.to}
                  separator={stat.separator}
                  duration={1.8}
                  delay={index * 0.1}
                />
                {stat.suffix}
              </div>
              <div className="w-10 h-1 bg-primary-700 rounded-full mx-auto my-3" />
              <div className="text-secondary-500 font-medium text-sm uppercase tracking-wide">
                {stat.label}
                {stat.sublabel && <span className="block normal-case">{stat.sublabel}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
