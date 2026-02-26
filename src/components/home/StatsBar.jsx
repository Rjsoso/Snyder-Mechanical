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
    <section className="bg-white border-y border-secondary-200 py-10">
      <div className="container-custom">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-900 leading-none tracking-tight">
                <CountUp
                  from={0}
                  to={stat.to}
                  separator={stat.separator}
                  duration={1.8}
                  delay={index * 0.1}
                />
                {stat.suffix}
              </div>
              <div className="w-6 h-px bg-secondary-300 mx-auto my-2.5" />
              <div className="text-secondary-500 text-xs font-medium uppercase tracking-widest">
                {stat.label}
                {stat.sublabel && <span className="block normal-case tracking-normal text-secondary-400 mt-0.5">{stat.sublabel}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
