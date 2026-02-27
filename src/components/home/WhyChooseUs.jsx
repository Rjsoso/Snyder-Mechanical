import { motion, useTransform } from 'framer-motion';

const pillars = [
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured in Nevada. Your home and family are in safe, qualified hands.',
  },
  {
    title: 'Local & Family-Owned',
    description: 'Proudly serving Elko and Spring Creek since 1981. We live here too — your neighbors and your contractors.',
  },
  {
    title: '40+ Years of Experience',
    description: 'Decades of hands-on expertise across residential heating, cooling, and plumbing. We\'ve seen it all and fixed it all.',
  },
  {
    title: '100% Satisfaction',
    description: 'We stand behind every job we do. If you\'re not satisfied, we\'ll make it right — no questions asked.',
  },
];

const SCHEDULE = {
  eyebrow:   [0.00, 0.18],
  heading:   [0.12, 0.30],
  statement: [0.24, 0.42],
  row0:      [0.34, 0.50],
  row1:      [0.44, 0.60],
  row2:      [0.54, 0.70],
  row3:      [0.62, 0.78],
};

const Y_START = 48;

const WhyChooseUs = ({ scrollProgress }) => {
  const eyebrowOpacity  = useTransform(scrollProgress, SCHEDULE.eyebrow,   [0, 1]);
  const eyebrowY        = useTransform(scrollProgress, SCHEDULE.eyebrow,   [Y_START, 0]);

  const headingOpacity  = useTransform(scrollProgress, SCHEDULE.heading,   [0, 1]);
  const headingY        = useTransform(scrollProgress, SCHEDULE.heading,   [Y_START, 0]);

  const stmtOpacity     = useTransform(scrollProgress, SCHEDULE.statement, [0, 1]);
  const stmtY           = useTransform(scrollProgress, SCHEDULE.statement, [Y_START, 0]);

  const row0Opacity = useTransform(scrollProgress, SCHEDULE.row0, [0, 1]);
  const row0Y       = useTransform(scrollProgress, SCHEDULE.row0, [Y_START, 0]);
  const row1Opacity = useTransform(scrollProgress, SCHEDULE.row1, [0, 1]);
  const row1Y       = useTransform(scrollProgress, SCHEDULE.row1, [Y_START, 0]);
  const row2Opacity = useTransform(scrollProgress, SCHEDULE.row2, [0, 1]);
  const row2Y       = useTransform(scrollProgress, SCHEDULE.row2, [Y_START, 0]);
  const row3Opacity = useTransform(scrollProgress, SCHEDULE.row3, [0, 1]);
  const row3Y       = useTransform(scrollProgress, SCHEDULE.row3, [Y_START, 0]);

  const rowValues = [
    { opacity: row0Opacity, y: row0Y },
    { opacity: row1Opacity, y: row1Y },
    { opacity: row2Opacity, y: row2Y },
    { opacity: row3Opacity, y: row3Y },
  ];

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

          {/* Left column — eyebrow, tagline, company statement */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              style={{ opacity: eyebrowOpacity, y: eyebrowY, willChange: 'transform, opacity' }}
            >
              <span className="w-8 h-px bg-white/25 flex-shrink-0" />
              <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8"
              style={{ opacity: headingOpacity, y: headingY, willChange: 'transform, opacity' }}
            >
              Safety. Quality.<br className="hidden md:block" /> Service. Construction.
            </motion.h2>

            <motion.p
              className="text-white/55 text-base leading-relaxed max-w-[38ch]"
              style={{ opacity: stmtOpacity, y: stmtY, willChange: 'transform, opacity' }}
            >
              For over 40 years, Snyder Mechanical has been northern Nevada&rsquo;s preferred mechanical contractor and service provider for design/build projects. With both a commercial department and a residential service department, we meet the critical demands of our clients.
            </motion.p>
          </div>

          {/* Right column — all 4 pillars, no prefix decorations */}
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                style={{ opacity: rowValues[i].opacity, y: rowValues[i].y, willChange: 'transform, opacity' }}
                className="py-7 first:pt-0 last:pb-0"
              >
                <h3 className="text-lg font-black text-white mb-2 tracking-tight">{pillar.title}</h3>
                <p className="text-white/50 text-base leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
