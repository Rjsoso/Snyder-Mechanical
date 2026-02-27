import { motion, useTransform } from 'framer-motion';
import { useHomePageData } from '../../hooks/useSanityData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AwardsCarousel from './AwardsCarousel';

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
  carousel:  [0.34, 0.52],
  row0:      [0.34, 0.50],
  row1:      [0.44, 0.60],
  row2:      [0.54, 0.70],
  row3:      [0.62, 0.78],
};

const Y_START = 48;

const MOBILE_VIEWPORT = { once: true, margin: '-60px' };
const mobileItemVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: Y_START },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] } },
});

const WhyChooseUs = ({ scrollProgress }) => {
  const { data: homePageData } = useHomePageData();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Desktop scroll-progress transforms
  const eyebrowOpacity  = useTransform(scrollProgress, SCHEDULE.eyebrow,   [0, 1]);
  const eyebrowY        = useTransform(scrollProgress, SCHEDULE.eyebrow,   [Y_START, 0]);
  const headingOpacity  = useTransform(scrollProgress, SCHEDULE.heading,   [0, 1]);
  const headingY        = useTransform(scrollProgress, SCHEDULE.heading,   [Y_START, 0]);
  const stmtOpacity     = useTransform(scrollProgress, SCHEDULE.statement, [0, 1]);
  const stmtY           = useTransform(scrollProgress, SCHEDULE.statement, [Y_START, 0]);
  const carouselOpacity = useTransform(scrollProgress, SCHEDULE.carousel,  [0, 1]);
  const carouselY       = useTransform(scrollProgress, SCHEDULE.carousel,  [Y_START, 0]);
  const row0Opacity = useTransform(scrollProgress, SCHEDULE.row0, [0, 1]);
  const row0Y       = useTransform(scrollProgress, SCHEDULE.row0, [Y_START, 0]);
  const row1Opacity = useTransform(scrollProgress, SCHEDULE.row1, [0, 1]);
  const row1Y       = useTransform(scrollProgress, SCHEDULE.row1, [Y_START, 0]);
  const row2Opacity = useTransform(scrollProgress, SCHEDULE.row2, [0, 1]);
  const row2Y       = useTransform(scrollProgress, SCHEDULE.row2, [Y_START, 0]);
  const row3Opacity = useTransform(scrollProgress, SCHEDULE.row3, [0, 1]);
  const row3Y       = useTransform(scrollProgress, SCHEDULE.row3, [Y_START, 0]);

  const desktopRowValues = [
    { opacity: row0Opacity, y: row0Y },
    { opacity: row1Opacity, y: row1Y },
    { opacity: row2Opacity, y: row2Y },
    { opacity: row3Opacity, y: row3Y },
  ];

  return (
    <section
      className="section-padding py-16 lg:py-0 lg:h-screen lg:max-h-screen flex items-center text-white relative z-10 lg:overflow-hidden"
      style={{ background: 'rgba(2, 6, 23, 0.20)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="container-custom relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-24 items-start">

          {/* Left column — eyebrow, tagline, company statement */}
          <div>
            {isDesktop ? (
              <motion.div
                className="flex items-center gap-3 mb-6"
                style={{ opacity: eyebrowOpacity, y: eyebrowY, willChange: 'transform, opacity' }}
              >
                <span className="w-8 h-px bg-white/25 flex-shrink-0" />
                <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-3 mb-6"
                variants={mobileItemVariants(0)}
                initial="hidden"
                whileInView="visible"
                viewport={MOBILE_VIEWPORT}
              >
                <span className="w-8 h-px bg-white/25 flex-shrink-0" />
                <p className="text-white/40 font-semibold text-xs uppercase tracking-[0.2em]">Why Snyder Mechanical</p>
              </motion.div>
            )}

            {isDesktop ? (
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8"
                style={{ opacity: headingOpacity, y: headingY, willChange: 'transform, opacity' }}
              >
                Safety. Quality.<br className="hidden md:block" /> Service. Construction.
              </motion.h2>
            ) : (
              <motion.h2
                className="text-4xl font-black text-white leading-tight tracking-tight mb-8"
                variants={mobileItemVariants(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={MOBILE_VIEWPORT}
              >
                Safety. Quality. Service. Construction.
              </motion.h2>
            )}

            {isDesktop ? (
              <motion.p
                className="text-white/55 text-base leading-relaxed max-w-[38ch]"
                style={{ opacity: stmtOpacity, y: stmtY, willChange: 'transform, opacity' }}
              >
                For over 40 years, Snyder Mechanical has been northern Nevada&rsquo;s preferred mechanical contractor and service provider for design/build projects. With both a commercial department and a residential service department, we meet the critical demands of our clients.
              </motion.p>
            ) : (
              <motion.p
                className="text-white/55 text-base leading-relaxed max-w-[38ch]"
                variants={mobileItemVariants(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={MOBILE_VIEWPORT}
              >
                For over 40 years, Snyder Mechanical has been northern Nevada&rsquo;s preferred mechanical contractor and service provider for design/build projects. With both a commercial department and a residential service department, we meet the critical demands of our clients.
              </motion.p>
            )}

            {isDesktop ? (
              <motion.div style={{ opacity: carouselOpacity, y: carouselY, willChange: 'transform, opacity' }}>
                <AwardsCarousel images={homePageData?.awardsCarousel || []} />
              </motion.div>
            ) : (
              <motion.div
                variants={mobileItemVariants(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={MOBILE_VIEWPORT}
              >
                <AwardsCarousel images={homePageData?.awardsCarousel || []} />
              </motion.div>
            )}
          </div>

          {/* Right column — all 4 pillars */}
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {pillars.map((pillar, i) => (
              isDesktop ? (
                <motion.div
                  key={pillar.title}
                  style={{ opacity: desktopRowValues[i].opacity, y: desktopRowValues[i].y, willChange: 'transform, opacity' }}
                  className="py-7 first:pt-0 last:pb-0"
                >
                  <h3 className="text-lg font-black text-white mb-2 tracking-tight">{pillar.title}</h3>
                  <p className="text-white/50 text-base leading-relaxed">{pillar.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={pillar.title}
                  className="py-7 first:pt-0 last:pb-0"
                  variants={mobileItemVariants(i * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={MOBILE_VIEWPORT}
                >
                  <h3 className="text-lg font-black text-white mb-2 tracking-tight">{pillar.title}</h3>
                  <p className="text-white/50 text-base leading-relaxed">{pillar.description}</p>
                </motion.div>
              )
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
