import { motion, useTransform } from 'framer-motion';
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

// Scroll progress ranges for each element
const SCHEDULE = {
  eyebrow:  [0.00, 0.18],
  heading:  [0.14, 0.35],
  card0:    [0.32, 0.50],
  card1:    [0.42, 0.60],
  card2:    [0.52, 0.70],
  card3:    [0.62, 0.80],
};

const Y_START = 60;

const WhyChooseUs = ({ scrollProgress }) => {
  const eyebrowOpacity = useTransform(scrollProgress, SCHEDULE.eyebrow, [0, 1]);
  const eyebrowY      = useTransform(scrollProgress, SCHEDULE.eyebrow, [Y_START, 0]);

  const headingOpacity = useTransform(scrollProgress, SCHEDULE.heading, [0, 1]);
  const headingY      = useTransform(scrollProgress, SCHEDULE.heading, [Y_START, 0]);

  const card0Opacity = useTransform(scrollProgress, SCHEDULE.card0, [0, 1]);
  const card0Y       = useTransform(scrollProgress, SCHEDULE.card0, [Y_START, 0]);
  const card1Opacity = useTransform(scrollProgress, SCHEDULE.card1, [0, 1]);
  const card1Y       = useTransform(scrollProgress, SCHEDULE.card1, [Y_START, 0]);
  const card2Opacity = useTransform(scrollProgress, SCHEDULE.card2, [0, 1]);
  const card2Y       = useTransform(scrollProgress, SCHEDULE.card2, [Y_START, 0]);
  const card3Opacity = useTransform(scrollProgress, SCHEDULE.card3, [0, 1]);
  const card3Y       = useTransform(scrollProgress, SCHEDULE.card3, [Y_START, 0]);

  const cardOpacity = [card0Opacity, card1Opacity, card2Opacity, card3Opacity];
  const cardY       = [card0Y, card1Y, card2Y, card3Y];

  return (
    <section
      className="section-padding h-screen flex items-center text-white relative z-10 overflow-hidden"
      style={{ background: 'rgba(2, 6, 23, 0.40)' }}
    >
      <div className="container-custom relative w-full">
        {/* Heading */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-4"
            style={{ opacity: eyebrowOpacity, y: eyebrowY, willChange: 'transform, opacity' }}
          >
            <span className="w-8 h-px bg-white/25 flex-shrink-0" />
            <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-xl"
            style={{ opacity: headingOpacity, y: headingY, willChange: 'transform, opacity' }}
          >
            The Trusted Choice in Northeastern Nevada
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                style={{ opacity: cardOpacity[index], y: cardY[index], willChange: 'transform, opacity' }}
                className="group relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 overflow-hidden transition-colors duration-200 hover:bg-white/[0.07] hover:border-white/20"
                whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }}
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
