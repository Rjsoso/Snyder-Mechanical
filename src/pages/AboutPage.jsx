import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import aboutData from '../data/about.json';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import * as Icons from 'lucide-react';

const AboutPage = () => {
  const { section } = useParams();
  const pageData = aboutData[section];

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageData.hero.title}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {pageData.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Background */}
      {section === 'company' && (
        <>
          <section className="section-padding bg-white">
            <div className="container-custom max-w-4xl">
              {pageData.story.map((paragraph, index) => (
                <p key={index} className="text-lg text-secondary-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="section-padding bg-secondary-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Our Journey
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                {pageData.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                      {item.year}
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                      <p className="text-lg text-secondary-900">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Safety */}
      {section === 'safety' && (
        <>
          <section className="section-padding bg-white">
            <div className="container-custom max-w-4xl text-center">
              <p className="text-xl text-secondary-700">
                {pageData.commitment}
              </p>
            </div>
          </section>

          <section className="section-padding bg-secondary-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Our Safety Protocols
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pageData.protocols.map((protocol, index) => {
                  const Icon = Icons[protocol.icon.split('-').map((word, i) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join('')] || Icons.Shield;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-accent-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-2">
                              {protocol.title}
                            </h3>
                            <p className="text-secondary-600">
                              {protocol.description}
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
        </>
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
                    <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                      <Icons.Award className="w-8 h-8 text-accent-600" />
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
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                      <Icons.CheckCircle className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="text-secondary-900 font-medium">{cert}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pageData.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <div className="mb-4">
                      <Icons.Quote className="w-8 h-8 text-primary-400" />
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

          <section className="section-padding bg-secondary-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
                Why Work With Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {pageData.benefits.map((benefit, index) => {
                  const Icon = Icons[benefit.icon.split('-').map((word, i) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join('')] || Icons.Star;
                  
                  return (
                    <Card key={index} className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary-600" />
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
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                            {position.type}
                          </span>
                          <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
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
