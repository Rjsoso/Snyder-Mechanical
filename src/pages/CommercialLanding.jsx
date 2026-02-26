import { motion } from 'framer-motion';
import { Building2, Wrench, Factory, Droplets, Check, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompanyData, useServiceCategories, useCommercialPageData } from '../hooks/useSanityData';

const iconMap = {
  'Building2': Building2,
  'Wrench': Wrench,
  'Factory': Factory,
  'Droplets': Droplets
};

const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

const CommercialLanding = () => {
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
      <title>Commercial Services | Snyder Mechanical – Elko, NV</title>
      <meta name="description" content="Snyder Mechanical is the area's preferred mechanical contractor for commercial design/build projects. Serving businesses and industrial facilities in northeastern Nevada." />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={DOT_PATTERN} />
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium uppercase tracking-widest mb-6 transition-colors"
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
            <p className="text-lg text-white/75 mb-8 max-w-2xl">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold transition-all shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>{phone}</span>
              </a>
              <Link
                to="/?modal=estimate"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold transition-all"
              >
                {hero.secondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="section-padding bg-secondary-50/60">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {capabilitiesSection.heading}
            </h2>
            <p className="text-lg text-secondary-500 max-w-3xl mx-auto">
              {capabilitiesSection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilitiesSection.capabilities.map((capability, index) => {
              const Icon = iconMap[capability.icon] || Building2;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-secondary-200 border-l-2 border-l-primary-700 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary-900/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900 mb-1.5">
                        {capability.title}
                      </h3>
                      <p className="text-secondary-500 text-sm leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                {whyChooseSection.heading}
              </h2>
              <p className="text-lg text-secondary-500 mb-8 leading-relaxed">
                {whyChooseSection.description}
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-md font-semibold transition-colors shadow-md"
              >
                {whyChooseSection.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary-50 rounded-xl p-8"
            >
              <h3 className="text-sm font-semibold text-secondary-500 uppercase tracking-widest mb-6">
                Commercial Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyChooseSection.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-secondary-800">{advantage}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Links */}
      <section className="section-padding bg-secondary-50/60">
        <div className="container-custom">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-3">
              Explore Our Commercial Services
            </h2>
            <p className="text-secondary-500">Detailed information on every service we offer</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { to: '/services/commercial', service: commercialService, Icon: Building2 },
              { to: '/services/pumps-equipment', service: pumpsService, Icon: Droplets },
            ].map(({ to, service, Icon }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={to}
                  className="group flex items-start gap-5 p-6 bg-white border border-secondary-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-secondary-900 mb-1 group-hover:text-primary-700 transition-colors">{service.title}</h3>
                    <p className="text-sm text-secondary-500 leading-relaxed">{service.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={DOT_PATTERN} />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            {ctaSection.heading}
          </h2>
          <p className="text-lg text-white/75 mb-8 max-w-2xl mx-auto">
            {ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold text-lg transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" />
              <span>{phone}</span>
            </a>
            <Link
              to="/?modal=estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold text-lg transition-all"
            >
              {ctaSection.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialLanding;
