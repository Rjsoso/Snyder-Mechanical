import { motion, useTransform } from 'framer-motion';
import { ShieldCheck, MapPin, ThumbsUp, Award } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    number: '01',
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured in Nevada. Your home and family are in safe, qualified hands.',
  },
  {
    icon: MapPin,
    number: '02',
    title: 'Local & Family-Owned',
    description: 'Proudly serving Elko and Spring Creek since 1981. We live here too — your neighbors and your contractors.',
  },
  {
    icon: Award,
    number: '03',
    title: '40+ Years of Experience',
    description: 'Decades of hands-on expertise across residential heating, cooling, and plumbing. We\'ve seen it all and fixed it all.',
  },
  {
    icon: ThumbsUp,
    number: '04',
    title: '100% Satisfaction',
    description: 'We stand behind every job we do. If you\'re not satisfied, we\'ll make it right — no questions asked.',
  },
];

const EASE = [0.16, 1, 0.3, 1];

const SCHEDULE = {
  eyebrow:  [0.00, 0.18],
  heading:  [0.14, 0.35],
  featured: [0.28, 0.46],
  row0:     [0.38, 0.54],
  row1:     [0.48, 0.64],
  row2:     [0.58, 0.74],
};

const Y_START = 48;

const WhyChooseUs = ({ scrollProgress }) => {
  const eyebrowOpacity = useTransform(scrollProgress, SCHEDULE.eyebrow, [0, 1]);
  const eyebrowY      = useTransform(scrollProgress, SCHEDULE.eyebrow, [Y_START, 0]);

  const headingOpacity = useTransform(scrollProgress, SCHEDULE.heading, [0, 1]);
  const headingY      = useTransform(scrollProgress, SCHEDULE.heading, [Y_START, 0]);

  const featuredOpacity = useTransform(scrollProgress, SCHEDULE.featured, [0, 1]);
  const featuredY       = useTransform(scrollProgress, SCHEDULE.featured, [Y_START, 0]);

  const row0Opacity = useTransform(scrollProgress, SCHEDULE.row0, [0, 1]);
  const row0Y       = useTransform(scrollProgress, SCHEDULE.row0, [Y_START, 0]);
  const row1Opacity = useTransform(scrollProgress, SCHEDULE.row1, [0, 1]);
  const row1Y       = useTransform(scrollProgress, SCHEDULE.row1, [Y_START, 0]);
  const row2Opacity = useTransform(scrollProgress, SCHEDULE.row2, [0, 1]);
  const row2Y       = useTransform(scrollProgress, SCHEDULE.row2, [Y_START, 0]);

  const rowValues = [
    { opacity: row0Opacity, y: row0Y },
    { opacity: row1Opacity, y: row1Y },
    { opacity: row2Opacity, y: row2Y },
  ];

  const featured = pillars[0];
  const rest = pillars.slice(1);

  return (
    <section
      className="section-padding h-screen flex items-center text-white relative z-10 overflow-hidden"
      style={{ background: 'rgba(2, 6, 23, 0.72)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-16 lg:gap-24 items-start">

          {/* Left column — eyebrow, heading, featured pillar */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              style={{ opacity: eyebrowOpacity, y: eyebrowY, willChange: 'transform, opacity' }}
            >
              <span className="w-8 h-px bg-white/25 flex-shrink-0" />
              <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-14"
              style={{ opacity: headingOpacity, y: headingY, willChange: 'transform, opacity' }}
            >
              The Trusted Choice in Northeastern Nevada
            </motion.h2>

            {/* Featured pillar — large, editorial */}
            <motion.div
              style={{ opacity: featuredOpacity, y: featuredY, willChange: 'transform, opacity' }}
            >
              <div
                className="pl-6"
                style={{ borderLeft: '2px solid rgba(255,255,255,0.18)' }}
              >
                <span
                  className="block font-mono text-[3.5rem] leading-none text-white/[0.07] mb-3 select-none"
                  aria-hidden="true"
                >
                  {featured.number}
                </span>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{featured.title}</h3>
                <p className="text-white/55 text-base leading-relaxed">{featured.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Right column — remaining pillars as stacked rows */}
          <div className="flex flex-col divide-y divide-white/[0.08] lg:pt-[7.5rem]">
            {rest.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                style={{ opacity: rowValues[i].opacity, y: rowValues[i].y, willChange: 'transform, opacity' }}
                className="py-8 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-8">
                  <span
                    className="font-mono text-sm text-white/20 tracking-widest flex-shrink-0 mt-1 w-8"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-white mb-2 tracking-tight">{pillar.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
