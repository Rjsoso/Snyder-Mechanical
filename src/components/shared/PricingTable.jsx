import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';

const PricingTable = ({ plans }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    primary: {
      bg: 'from-primary-50 to-primary-100',
      border: 'border-primary-400',
      button: 'bg-primary-600 hover:bg-primary-700'
    },
    accent: {
      bg: 'from-accent-50 to-accent-100',
      border: 'border-accent-400',
      button: 'bg-accent-600 hover:bg-accent-700'
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {plans.map((plan, index) => {
        const colors = colorClasses[plan.color] || colorClasses.primary;
        
        return (
          <motion.div
            key={plan.id}
            className={`relative ${plan.popular ? 'md:scale-105 md:z-10' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <Badge variant="accent" size="lg">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <div className={`h-full bg-white rounded-2xl shadow-xl border-2 ${colors.border} overflow-hidden ${
              plan.popular ? 'ring-2 ring-primary-600' : ''
            }`}>
              {/* Header */}
              <div className={`bg-gradient-to-br ${colors.bg} p-8 text-center`}>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-secondary-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-secondary-900">
                    {plan.price}
                  </span>
                </div>
                <p className="text-secondary-600 text-sm">{plan.period}</p>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  to="/?modal=schedule"
                  className={`w-full ${colors.button} text-white font-semibold`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PricingTable;
