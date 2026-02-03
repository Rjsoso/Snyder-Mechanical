import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Button from '../shared/Button';
import { useHomePageData } from '../../hooks/useSanityData';

const SafetySection = () => {
  const { data: homePageData } = useHomePageData();

  // Fallback content if Sanity data is not available
  const section = homePageData?.safetySection || {
    heading: 'Committed to Safety',
    description: 'Safety is our top priority, each and every project. We maintain the highest safety standards to protect our team, our clients, and the communities we serve.',
    buttonText: 'Learn More About Our Safety Commitment'
  };

  return (
    <section className="section-padding bg-accent-600 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {section.heading}
            </h2>
            <p className="text-xl text-accent-100 mb-8">
              {section.description}
            </p>
            <Button 
              to="/about/safety" 
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-accent-600"
            >
              {section.buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
