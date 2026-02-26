import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCompanyData } from '../../hooks/useSanityData';

const parseNumber = (val) => {
  if (typeof val === 'number') return val;
  const str = String(val).replace(/[^0-9.]/g, '');
  return parseFloat(str) || 0;
};

const formatValue = (num, template) => {
  const str = String(template);
  if (str.includes(',')) {
    return num.toLocaleString('en-US') + '+';
  }
  if (str.endsWith('+')) return Math.round(num) + '+';
  if (str.endsWith('%')) return Math.round(num) + '%';
  return String(Math.round(num));
};

const CountUp = ({ value, duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState('0');
  const target = parseNumber(value);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatValue(target * eased, value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, value]);

  return <span ref={ref}>{display}</span>;
};

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
      label: '100% Satisfaction',
      suffix: '',
    },
  ];

  return (
    <section className="bg-white border-y border-secondary-200 py-14">
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
                <CountUp value={stat.value} />
                <span className="text-3xl md:text-4xl">{stat.suffix}</span>
              </div>
              <div className="w-10 h-1 bg-primary-700 rounded-full mx-auto my-3" />
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
