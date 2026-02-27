import { useEffect, useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import WhoWeServe from '../components/home/WhoWeServe';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ReviewsSection from '../components/home/ReviewsSection';
import ProcessSection from '../components/home/ProcessSection';
import CTABanner from '../components/home/CTABanner';
import Footer from '../components/layout/Footer';

const Home = () => {
  useEffect(() => {
    document.title = 'Snyder Mechanical | Elko, Spring Creek, NV | Mechanical Contractor';
  }, []);

  const whyWrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: whyWrapperRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <>
      <Hero />
      {/* Spacer matches hero height so content scrolls over the fixed hero */}
      <div className="h-screen" aria-hidden="true" />

      <div className="relative z-20">
        {/* Dark stats — immediate contrast after hero */}
        <StatsBar />

        {/* Residential / Commercial split — click residential to reveal all services inline */}
        <WhoWeServe />
      </div>

      {/* Sticky WhyChooseUs: 300vh gives 200vh of pinned scroll */}
      <div ref={whyWrapperRef} className="relative z-10" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen">
          <WhyChooseUs scrollProgress={smoothProgress} />
        </div>
      </div>

      <div className="relative z-20">
        <ReviewsSection />
        <ProcessSection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
