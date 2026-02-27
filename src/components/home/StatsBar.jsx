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
    <section className="bg-primary-900 py-14 relative overflow-hidden">
      {/* Subtle background geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03]"
          style={{ background: 'linear-gradient(135deg, transparent 40%, #b87333 100%)' }} />
      </div>

      <div className="container-custom relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">

          {/* Left — editorial label */}
          <motion.div
            className="lg:w-56 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="copper-rule" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Snyder Mechanical</span>
            </div>
            <p className="text-2xl font-black text-white leading-tight tracking-tight">
              By the<br />Numbers
            </p>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px self-stretch bg-white/10 mx-12 flex-shrink-0" />

          {/* Right — stats row */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 flex-1">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex-1 sm:px-8 sm:border-l sm:border-white/10 first:border-none first:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-2">
                  <CountUp
                    from={0}
                    to={stat.to}
                    separator={stat.separator}
                    duration={1.8}
                    delay={index * 0.1}
                  />
                  <span className="text-copper-500">{stat.suffix}</span>
                </div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-widest">
                  {stat.label}
                  {stat.sublabel && (
                    <span className="block normal-case tracking-normal text-white/30 mt-0.5">{stat.sublabel}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
