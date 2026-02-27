import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Wrench, Factory, Droplets, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompanyData, useServiceCategories, useCommercialPageData } from '../hooks/useSanityData';

const iconMap = {
  'Building2': Building2,
  'Wrench': Wrench,
  'Factory': Factory,
  'Droplets': Droplets
};

const EASE = [0.16, 1, 0.3, 1];

const CommercialLanding = () => {
  useEffect(() => {
    document.title = 'Commercial Services | Snyder Mechanical – Elko, NV';
    return () => { document.title = 'Snyder Mechanical'; };
  }, []);

  const { data: companyData } = useCompanyData();
  const { data: servicesData } = useServiceCategories();
  const { data: commercialPageData } = useCommercialPageData();

  const commercialService = servicesData?.commercial || {
    title: 'Commercial Services',
    description: 'Design/build projects and commercial mechanical contracting for businesses and industrial facilities.'
  };
  const pumpsService = servicesData?.pumpsEquipment || {
    title: 'Pumps & Equipment',
    description: 'Professional pump installation, maintenance, and equipment supply for all applications.'
  };
  const phone = companyData?.phone || '(775) 738-5616';

  const hero = commercialPageData?.hero || {
    title: 'Commercial Mechanical Contracting Excellence',
    description: 'Trusted by businesses across Northeastern Nevada for over 45 years. From design/build projects to ongoing maintenance, we deliver professional commercial mechanical solutions.',
    primaryButtonText: 'Call Now',
    secondaryButtonText: 'Request Project Bid'
  };

  const capabilitiesSection = commercialPageData?.capabilitiesSection || {
    heading: 'Our Commercial Capabilities',
    description: 'Comprehensive mechanical solutions for businesses, industrial facilities, and new construction',
    capabilities: [
      {
        title: 'Design/Build Expertise',
        description: 'Complete mechanical system design and construction for new commercial projects from concept to completion.',
        icon: 'Building2'
      },
      {
        title: 'Commercial HVAC',
        description: 'Installation, maintenance, and repair of commercial heating and cooling systems of any size.',
        icon: 'Wrench'
      },
      {
        title: 'Industrial Systems',
        description: 'Specialized mechanical services for industrial and manufacturing facilities.',
        icon: 'Factory'
      },
      {
        title: 'Pumps & Equipment',
        description: 'Professional pump installation, maintenance, and equipment supply for commercial applications.',
        icon: 'Droplets'
      }
    ]
  };

  const whyChooseSection = commercialPageData?.whyChooseSection || {
    heading: 'Why Businesses Choose Snyder Mechanical',
    description: 'We understand the unique challenges of commercial mechanical systems. Our team brings decades of experience, professional certifications, and a commitment to minimizing downtime for your business.',
    buttonText: 'View Our Projects',
    advantages: [
      'Over 45 years of commercial experience',
      'Licensed for large-scale projects',
      'Fully insured with commercial liability coverage',
      'In-house design and engineering team',
      'Project management from start to finish',
      'Responsive service and support',
      'Energy-efficient solutions',
      'Code compliance expertise',
      'Safety-first approach',
      'Quality workmanship guaranteed'
    ]
  };

  const ctaSection = commercialPageData?.ctaSection || {
    heading: 'Ready to Discuss Your Commercial Project?',
    description: 'From design/build projects to routine maintenance, we are here to support your business.',
    primaryButtonText: 'Call Now',
    secondaryButtonText: 'Request Project Bid'
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative bg-primary-900 text-white pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-grid-subtle"
          aria-hidden="true"
        />
        {/* Subtle diagonal light from top-right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.025) 100%)' }}
          aria-hidden="true"
        />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium uppercase tracking-widest mb-8 transition-colors duration-200"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Home
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/60 flex-shrink-0" />
              <span className="text-white/60 text-sm font-medium uppercase tracking-[0.18em]">Commercial Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
              {hero.title}
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-[6px] font-bold transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>{phone}</span>
              </a>
              <Link
                to="/?modal=estimate"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/40 hover:border-white text-white hover:bg-white/10 rounded-[6px] font-semibold transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {hero.secondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities — numbered editorial rows */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="accent-rule-dark" />
              <p className="text-secondary-400 font-semibold text-xs uppercase tracking-[0.2em]">Capabilities</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary-900 tracking-tight">
              {capabilitiesSection.heading}
            </h2>
            <p className="text-secondary-500 mt-3 max-w-2xl leading-relaxed">
              {capabilitiesSection.description}
            </p>
          </motion.div>

          <div className="divide-y divide-secondary-100">
            {capabilitiesSection.capabilities.map((capability, index) => {
              const num = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
                  className="group relative flex flex-col sm:flex-row sm:items-start gap-6 py-10 hover:bg-secondary-50/60 transition-colors duration-200 -mx-4 px-4 rounded-[6px]"
                >
                  {/* Watermark number */}
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-black leading-none text-secondary-100 select-none pointer-events-none hidden sm:block"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>

                  {/* Number badge */}
                  <div className="flex-shrink-0 flex items-center gap-3 sm:block sm:w-16">
                    <span className="font-mono text-xs text-secondary-300 tracking-widest">{num}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 sm:max-w-lg">
                    <h3 className="text-xl font-black text-secondary-900 mb-2 tracking-tight group-hover:text-primary-800 transition-colors duration-200">
                      {capability.title}
                    </h3>
                    <p className="text-secondary-500 text-base leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-rule" />
                <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Choose Us</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight leading-tight">
                {whyChooseSection.heading}
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                {whyChooseSection.description}
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-primary-900 hover:bg-secondary-100 rounded-[6px] font-bold transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 shadow-md"
              >
                {whyChooseSection.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            >
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-6">
                Commercial Advantages
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-white/[0.07]">
                {whyChooseSection.advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="py-3.5 text-sm font-medium text-white/70 first:pt-0 last:pb-0 sm:[&:nth-child(odd)]:pr-6 sm:[&:nth-child(even)]:pl-6 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-l-white/[0.07]"
                  >
                    {advantage}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Service Links */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="accent-rule-dark" />
              <p className="text-secondary-400 font-semibold text-xs uppercase tracking-[0.2em]">Services</p>
            </div>
            <h2 className="text-3xl font-black text-secondary-900 tracking-tight">
              Explore Our Commercial Services
            </h2>
            <p className="text-secondary-500 mt-2">Detailed information on every service we offer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {[
              { to: '/services/commercial', service: commercialService, Icon: Building2 },
              { to: '/services/pumps-equipment', service: pumpsService, Icon: Droplets },
            ].map(({ to, service, Icon }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  to={to}
                  className="group flex items-start gap-5 p-6 bg-secondary-50 border border-secondary-200 rounded-[10px] hover:border-secondary-300 hover:bg-white hover:shadow-md transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <div className="w-11 h-11 rounded-[6px] bg-white border border-secondary-200 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-secondary-900 mb-1 tracking-tight group-hover:text-primary-800 transition-colors duration-200">{service.title}</h3>
                    <p className="text-sm text-secondary-500 leading-relaxed">{service.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-secondary-300 group-hover:text-secondary-600 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — left-aligned, single texture layer */}
      <section className="relative section-padding bg-primary-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-grid-subtle"
          aria-hidden="true"
        />

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16">

            <motion.div
              className="flex-1 max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/40 flex-shrink-0" />
                <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.22em]">Get in Touch</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                {ctaSection.heading}
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                {ctaSection.description}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 flex-shrink-0 md:min-w-[260px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            >
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary-900 hover:bg-secondary-100 rounded-[6px] font-bold text-base shadow-xl transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider leading-none mb-0.5">Call Us Now</div>
                  <div className="leading-none font-black">{phone}</div>
                </div>
              </a>
              <Link
                to="/?modal=estimate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/40 hover:border-white text-white hover:bg-white/10 rounded-[6px] font-semibold text-base transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {ctaSection.secondaryButtonText}
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialLanding;
