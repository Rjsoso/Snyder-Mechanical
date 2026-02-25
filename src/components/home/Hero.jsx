import { motion } from 'framer-motion';
import { Phone, ArrowRight, Calendar, FileText, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';
import { useCompanyData } from '../../hooks/useSanityData';
import { useHomePageData } from '../../hooks/useSanityData';

const Hero = () => {
  const { data: companyData } = useCompanyData();
  const { data: homePageData } = useHomePageData();

  const hero = homePageData?.hero || {
    title: 'Comfort & Reliability for Your Home',
    subtitle: 'Expert HVAC & Plumbing Services in Northeastern Nevada',
    description: 'Trusted by homeowners across Elko and Spring Creek since 1981. From installations to repairs, we keep your home comfortable year-round.',
    commercialLinkText: 'Looking for commercial services?',
    primaryButtonText: 'Call Now',
    scheduleButtonText: 'Schedule Service',
    quoteButtonText: 'Get Free Quote'
  };

  const phone = companyData?.phone || '(775) 738-5616';
  const yearsInBusiness = new Date().getFullYear() - 1981;

  return (
    <section className="fixed inset-x-0 top-0 h-screen z-0 text-white overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel images={hero.backgroundImages} />

      {/* Gradient overlay — stronger at bottom for text, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl pt-20 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Pill badges row */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-amber-500/90 text-white text-sm font-semibold px-3.5 py-1 rounded-full">
                <BadgeCheck className="w-4 h-4" />
                {yearsInBusiness}+ Years Serving Nevada
              </span>
              <Link
                to="/commercial"
                className="inline-flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                {hero.commercialLinkText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-3 text-white/95 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              className="text-base md:text-lg mb-8 text-white/80 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {hero.description}
            </motion.p>

            {/* Trust badges strip */}
            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm text-white/75"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {['Licensed & Insured', 'Free Estimates', 'Local & Family-Owned', 'Since 1981'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {/* Primary: Call */}
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-3 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-900/30 hover:shadow-xl transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-normal text-amber-100 leading-none mb-0.5">{hero.primaryButtonText}</div>
                  <div className="leading-none">{phone}</div>
                </div>
              </a>

              {/* Secondary: Schedule */}
              <Link
                to="/?modal=schedule"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold text-base transition-all hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                {hero.scheduleButtonText}
              </Link>

              {/* Tertiary: Quote */}
              <Link
                to="/?modal=estimate"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-transparent hover:bg-white/10 border-2 border-white/50 hover:border-white text-white rounded-xl font-semibold text-base transition-all"
              >
                <FileText className="w-5 h-5" />
                {hero.quoteButtonText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
