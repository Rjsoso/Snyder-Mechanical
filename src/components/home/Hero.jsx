import { motion } from 'framer-motion';
import { Phone, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';
import { useCompanyData } from '../../hooks/useSanityData';
import { useHomePageData } from '../../hooks/useSanityData';

const Hero = () => {
  const { data: companyData } = useCompanyData();
  const { data: homePageData } = useHomePageData();

  const hero = homePageData?.hero || {
    title: 'Comfort & Reliability For Your Home',
    subtitle: 'Expert HVAC & Plumbing Services in Northeastern Nevada',
    description: 'Trusted by homeowners across Elko and Spring Creek since 1981. From installations to repairs, we keep your home comfortable year-round.',
    commercialLinkText: 'Looking for commercial services?',
    primaryButtonText: 'Call Now',
    scheduleButtonText: 'Schedule Service',
  };

  const phone = companyData?.phone || '(775) 738-5616';
  const yearsInBusiness = new Date().getFullYear() - 1981;

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

      {/* Content — left-aligned editorial layout */}
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-2xl pt-24 md:pt-28">

          {/* Eyebrow label with vertical accent line */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <span className="w-8 h-px bg-white/60 flex-shrink-0" />
            <span className="text-white/70 text-sm font-medium uppercase tracking-[0.18em]">
              Since 1981 · Elko, Nevada
            </span>
          </motion.div>

          {/* Headline — large, white, sharp */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.02] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            {hero.description}
          </motion.p>

          {/* CTA Buttons — sharper radius */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
          >
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-md font-bold text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider leading-none mb-0.5">{hero.primaryButtonText}</div>
                <div className="leading-none text-lg">{phone}</div>
              </div>
            </a>

            <Link
              to="/?modal=schedule"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/50 hover:border-white text-white hover:bg-white/10 rounded-md font-semibold text-base transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              {hero.scheduleButtonText}
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {['Licensed & Insured', 'Free Estimates', 'Local & Family-Owned'].map((badge, i) => (
              <span key={badge} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-3 bg-white/20" />}
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom-right floating stat card */}
      <motion.div
        className="absolute bottom-10 right-8 z-20 hidden lg:flex items-center gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <div className="text-center">
          <div className="text-2xl font-black text-white leading-none">{yearsInBusiness}+</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Years</div>
        </div>
        <div className="w-px h-8 bg-white/15" />
        <div className="text-center">
          <div className="text-2xl font-black text-white leading-none">5,000+</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Projects</div>
        </div>
        <div className="w-px h-8 bg-white/15" />
        <div className="text-center">
          <Link
            to="/commercial"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-xs font-medium transition-colors"
          >
            {hero.commercialLinkText}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
