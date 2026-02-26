import { motion } from 'framer-motion';
import { Building2, Wrench, Factory, Droplets, CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';
import { useCompanyData, useServiceCategories, useCommercialPageData } from '../hooks/useSanityData';

// Icon mapping for Sanity data
const iconMap = {
  'Building2': Building2,
  'Wrench': Wrench,
  'Factory': Factory,
  'Droplets': Droplets
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

  // Fallback content if Sanity data is not available
  const hero = commercialPageData?.hero || {
    title: 'Commercial Mechanical Contracting Excellence',
    description: 'Trusted by businesses across Northeastern Nevada for over 45 years. From design/build projects to ongoing maintenance, we deliver professional commercial mechanical solutions.',
    backLinkText: '← Back to Home',
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
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-36 pb-20">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
      <section className="section-padding bg-white">
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
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {capabilitiesSection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilitiesSection.capabilities.map((capability, index) => {
              const Icon = iconMap[capability.icon] || Building2;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-t-2 border-primary-700">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">
                          {capability.title}
                        </h3>
                        <p className="text-secondary-600">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white border-t border-secondary-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                {whyChooseSection.heading}
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                {whyChooseSection.description}
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-md font-semibold transition-colors shadow-md"
              >
                {whyChooseSection.buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white">
                <h3 className="text-xl font-bold text-secondary-900 mb-6">
                  Commercial Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyChooseSection.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700 text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Links */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Explore Our Commercial Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/services/commercial">
              <Card hover className="h-full border-t-2 border-primary-700">
                <div className="text-center p-4">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-secondary-600" />
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {commercialService.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {commercialService.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/services/pumps-equipment">
              <Card hover className="h-full border-t-2 border-primary-700">
                <div className="text-center p-4">
                  <Droplets className="w-16 h-16 mx-auto mb-4 text-secondary-600" />
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    {pumpsService.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {pumpsService.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            {ctaSection.heading}
          </h2>
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">
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
