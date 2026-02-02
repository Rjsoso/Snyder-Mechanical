import { motion } from 'framer-motion';
import { Thermometer, Snowflake, Droplet, AlertCircle, AlertTriangle, Phone, Clock } from 'lucide-react';
import Card from '../../components/shared/Card';
import Badge from '../../components/shared/Badge';
import companyData from '../../data/company.json';
import serviceData from '../../data/detailed-services.json';

const iconMap = {
  'thermometer': Thermometer,
  'snowflake': Snowflake,
  'droplet': Droplet,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'pipe': Droplet
};

const EmergencyServices = () => {
  const service = serviceData.emergency;

  return (
    <div className="min-h-screen">
      {/* Hero - Emergency Red Theme */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl text-center mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="warning" size="lg" className="mb-4">
              24/7 EMERGENCY SERVICE
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.hero.title}
            </h1>
            <p className="text-xl text-red-100 mb-6">
              {service.hero.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-2 mb-8 text-xl">
              <Clock className="w-6 h-6 text-red-200" />
              <span className="font-semibold">{service.responseTime}</span>
            </div>
            
            {/* Emergency Call Button - Large and Prominent */}
            <a
              href={`tel:${companyData.phone}`}
              className="inline-flex items-center justify-center space-x-3 px-12 py-6 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-all transform hover:scale-105 shadow-2xl text-2xl"
            >
              <Phone className="w-8 h-8" />
              <div className="text-left">
                <div className="text-sm text-red-500 font-normal">Call Now</div>
                <div>{companyData.phone}</div>
              </div>
            </a>
            
            <p className="text-sm text-red-200 mt-4">
              Available 24 hours a day, 7 days a week, 365 days a year
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white border-l-4 border-red-600">
        <div className="container-custom">
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto text-center">
            {service.description}
          </p>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            We Respond to These Emergencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.emergencies.map((emergency, index) => {
              const Icon = iconMap[emergency.icon] || AlertCircle;
              
              return (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`h-full ${emergency.urgent ? 'border-l-4 border-red-600' : ''}`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {emergency.title}
                      </h3>
                      <p className="text-secondary-600">
                        {emergency.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Call */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            When to Call for Emergency Service
          </h2>
          <Card className="bg-red-50 border-2 border-red-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.whenToCall.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-900">{item}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Emergency Tips */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            What to Do While You Wait
          </h2>
          {service.emergencyTips.map((section, index) => (
            <Card key={index} className="mb-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-3">
                    <span className="text-primary-600 font-bold mt-0.5">•</span>
                    <span className="text-secondary-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency CTA - Red Theme */}
      <section className="section-padding bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container-custom text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-6 text-red-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Wait - Get Help Now
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Our emergency response team is standing by 24/7. One call is all it takes.
          </p>
          <a
            href={`tel:${companyData.phone}`}
            className="inline-flex items-center justify-center space-x-3 px-12 py-6 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-all transform hover:scale-105 shadow-2xl text-2xl"
          >
            <Phone className="w-8 h-8" />
            <span>{companyData.phone}</span>
          </a>
          <p className="text-red-200 mt-6 text-lg">
            Average response time: {service.responseTime.split(': ')[1]}
          </p>
        </div>
      </section>
    </div>
  );
};

export default EmergencyServices;
