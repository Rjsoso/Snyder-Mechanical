import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, GraduationCap, Search, CheckCircle, Award, Quote, DollarSign, Heart, TrendingUp, Users } from 'lucide-react';
import { useAboutPageData } from '../hooks/useSanityData';
import aboutDataFallback from '../data/about.json';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const iconMap = {
  'shield': Shield,
  'graduation-cap': GraduationCap,
  'search': Search,
  'check-circle': CheckCircle,
  'award': Award,
  'quote': Quote,
  'dollar-sign': DollarSign,
  'heart': Heart,
  'trending-up': TrendingUp,
  'users': Users,
};

const AboutPage = () => {
  const { section } = useParams();
  const { data: sanityData, loading } = useAboutPageData(section);
  
  // Use Sanity data if available, otherwise fallback to JSON
  const pageData = sanityData || aboutDataFallback[section];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
          <Button to="/">Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <title>{pageData.hero?.title} | Snyder Mechanical – Elko, NV</title>
      <meta name="description" content={pageData.hero?.subtitle ? `${pageData.hero.subtitle} – Snyder Mechanical, northeastern Nevada's preferred mechanical contractor since 1981.` : "Learn more about Snyder Mechanical – northeastern Nevada's preferred mechanical contractor since 1981."} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-36 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-white/60 flex-shrink-0" />
              <span className="text-white/60 text-sm font-medium uppercase tracking-[0.18em]">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              {pageData.hero.title}
            </h1>
            <p className="text-lg text-white/75 max-w-xl">
              {pageData.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Background */}
      {section === 'company' && (
        <>
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: description */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {pageData.story.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="text-lg text-secondary-700"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
                {/* Right: Our Journey timeline */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl font-bold text-secondary-900 mb-8"
                  >
                    Our Journey
                  </motion.h2>
                  <div className="space-y-6">
                    {pageData.timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 w-20 h-14 rounded-lg bg-primary-900 text-white flex items-center justify-center font-black text-sm tracking-tight">
                          {item.year === 'current' ? new Date().getFullYear() : item.year}
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                          <p className="text-lg text-secondary-900">{item.event}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {(pageData.licenses?.length > 0 || pageData.abc) && (
            <section className="section-padding bg-white">
              <div className="container-custom max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {pageData.licenses?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">
                        Fully Licensed, Bonded & Insured
                      </h2>
                      <ul className="space-y-2 text-lg text-secondary-700">
                        {pageData.licenses.map((license, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            {license}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  {pageData.abc && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-secondary-100 rounded-lg p-8"
                    >
                      <h2 className="text-3xl font-bold text-secondary-900 text-center mb-6">
                        Associated Builders and Contractors, Inc. (ABC)
                      </h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex justify-center mb-6"
                      >
                        <img
                          src="/abc-logo.png"
                          alt="Associated Builders and Contractors, Inc."
                          className="max-h-24 w-auto object-contain"
                        />
                      </motion.div>
                      <p className="text-lg text-secondary-700">
                        {pageData.abc}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Safety */}
      {section === 'safety' && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            {/* Commitment lead text */}
            <motion.p
              className="text-xl text-secondary-600 text-center max-w-3xl mx-auto mb-14 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {pageData.commitment}
            </motion.p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-secondary-200" />
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 whitespace-nowrap">
                Our Safety Protocols
              </h2>
              <div className="flex-1 h-px bg-secondary-200" />
            </div>

            {/* Protocols grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pageData.protocols.map((protocol, index) => {
                const Icon = iconMap[protocol.icon] || Shield;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-5 p-6 rounded-lg border border-secondary-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900 mb-1">
                        {protocol.title}
                      </h3>
                      <p className="text-secondary-600 text-sm leading-relaxed">
                        {protocol.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Recognitions */}
      {section === 'recognitions' && (
        <>
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Awards & Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {pageData.awards.map((award, index) => (
                  <Card key={index} className="text-center">
                    <div className="w-14 h-14 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-4">
                      <Award className="w-7 h-7 text-primary-700" />
                    </div>
                    <p className="text-secondary-900 font-medium">{award}</p>
                  </Card>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Professional Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pageData.certifications.map((cert, index) => (
                  <Card key={index} className="text-center">
                    <div className="w-14 h-14 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-primary-700" />
                    </div>
                    <p className="text-secondary-900 font-medium">{cert}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-white border-t border-secondary-100">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pageData.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-secondary-700 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-secondary-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {testimonial.company || testimonial.location}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Careers */}
      {section === 'careers' && (
        <>
          <section className="section-padding bg-white">
            <div className="container-custom max-w-4xl text-center">
              <p className="text-xl text-secondary-700">
                {pageData.why}
              </p>
            </div>
          </section>

          <section className="section-padding bg-white border-t border-secondary-100">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Why Work With Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {pageData.benefits.map((benefit, index) => {
                  const Icon = iconMap[benefit.icon] || DollarSign;
                  
                  return (
                    <Card key={index} className="text-center">
                      <div className="w-14 h-14 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary-700" />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-secondary-600">
                        {benefit.description}
                      </p>
                    </Card>
                  );
                })}
              </div>

              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Current Openings
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                {pageData.positions.map((position, index) => (
                  <Card key={index}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-3 py-1 bg-primary-50 border border-primary-100 text-primary-700 text-sm rounded-md">
                            {position.type}
                          </span>
                          <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-md">
                            {position.location}
                          </span>
                        </div>
                        <p className="text-secondary-600">
                          {position.description}
                        </p>
                      </div>
                      <Button to="/contact">
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AboutPage;
