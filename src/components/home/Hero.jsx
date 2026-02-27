import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Phone, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';
import { useCompanyData } from '../../hooks/useSanityData';
import { useHomePageData } from '../../hooks/useSanityData';

const Hero = () => {
  const { data: companyData } = useCompanyData();
  const { data: homePageData } = useHomePageData();

  const hero = homePageData?.hero || {
    title: "Northeastern Nevada's Premier Mechanical Contractor Since 1981",
    subtitle: 'Expert HVAC & Plumbing Services in Northeastern Nevada',
    description: 'Trusted by homeowners across Elko and Spring Creek since 1981. From installations to repairs, we keep your home comfortable year-round.',
    commercialLinkText: 'Looking for commercial services?',
    primaryButtonText: 'Call Now',
    scheduleButtonText: 'Schedule Service',
  };

  const phone = companyData?.phone || '(775) 738-5616';

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const contentOpacity = useTransform(smoothScrollY, [0, window.innerHeight * 0.55], [1, 0]);
  const contentY = useTransform(smoothScrollY, [0, window.innerHeight * 0.55], [0, -70]);

  return (
    <section className="fixed inset-x-0 top-0 h-screen z-0 overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel images={hero.backgroundImages} />

      {/* Multi-layer overlay: top darkens for header legibility, bottom-left vignette for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

      {/* Faint year watermark — decorative background text */}
      <div
        className="absolute right-0 bottom-0 z-10 select-none pointer-events-none leading-none font-black text-white/[0.04]"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', lineHeight: 1 }}
        aria-hidden="true"
      >
        1981
      </div>

      {/* Content — left-aligned editorial layout; fades + rises as user scrolls away */}
      <motion.div
        className="container-custom relative z-20 h-full flex flex-col justify-center"
        style={{ opacity: contentOpacity, y: contentY, willChange: 'transform, opacity' }}
      >
        <div className="max-w-2xl pt-24 md:pt-28">

          {/* Eyebrow label with vertical accent line */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-8 h-px bg-white/60 flex-shrink-0" />
            <span className="text-white/70 text-sm font-medium uppercase tracking-[0.18em]">
              Since 1981 · Elko, Nevada
            </span>
          </motion.div>

          {/* Headline — large, white, sharp */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block font-light">Northeastern Nevada&rsquo;s Premier</span>
            <span className="block font-black">Mechanical Contractor</span>
            <span className="block font-black">Since 1981</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.description}
          </motion.p>

          {/* CTA Buttons — sharper radius */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-[6px] font-bold text-base shadow-lg transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-xl hover:-translate-y-0.5 min-h-[52px]"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider leading-none mb-0.5">{hero.primaryButtonText}</div>
                <div className="leading-none text-lg">{phone}</div>
              </div>
            </a>

            <Link
              to="/?modal=schedule"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-[6px] font-semibold text-base transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 min-h-[52px]"
            >
              <Calendar className="w-5 h-5" />
              {hero.scheduleButtonText}
            </Link>
          </motion.div>

          {/* Trust strip + commercial link */}
          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white/60 uppercase tracking-widest font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {['Licensed & Insured', 'Local & Family-Owned'].map((badge, i) => (
              <span key={badge} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-4 bg-white/25" />}
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Commercial services CTA — own line, distinct from trust badges */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/commercial"
              className="inline-flex items-center gap-2.5 text-base font-semibold text-white hover:text-white/80 transition-all group"
            >
              <span className="w-5 h-px bg-white/50 flex-shrink-0 group-hover:w-7 transition-all duration-300" />
              {hero.commercialLinkText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
