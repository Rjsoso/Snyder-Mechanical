import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, ThumbsUp, Award } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured in Nevada. Your home and family are in safe, qualified hands.',
  },
  {
    icon: MapPin,
    title: 'Local & Family-Owned',
    description: 'Proudly serving Elko and Spring Creek since 1981. We live here too — your neighbors and your contractors.',
  },
  {
    icon: Award,
    title: '40+ Years of Experience',
    description: 'Decades of hands-on expertise across residential heating, cooling, and plumbing. We\'ve seen it all and fixed it all.',
  },
  {
    icon: ThumbsUp,
    title: '100% Satisfaction',
    description: 'We stand behind every job we do. If you\'re not satisfied, we\'ll make it right — no questions asked.',
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="section-padding min-h-screen flex items-center text-white relative z-10 overflow-hidden"
      style={{ background: 'rgba(2, 6, 23, 0.40)' }}
    >
      <div className="container-custom relative w-full">
        {/* Heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-white/25 flex-shrink-0" />
            <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-xl">
            The Trusted Choice in Northeastern Nevada
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="group relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 overflow-hidden transition-colors duration-300 hover:bg-white/[0.07] hover:border-white/20"
                whileHover={{ y: -5, boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-11 h-11 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white/70" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 tracking-tight">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
