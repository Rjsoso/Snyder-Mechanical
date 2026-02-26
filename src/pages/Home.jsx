import { useEffect, useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import ServicesGrid from '../components/home/ServicesGrid';
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
      {/* Spacer matches hero height so scroll length is correct; content scrolls over fixed hero */}
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-20 bg-white">
        <StatsBar />
        <ServicesGrid />
      </div>
      {/* Sticky wrapper: 300vh gives 200vh of pinned scroll for the content to animate in */}
      <div ref={whyWrapperRef} className="relative z-10" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen">
          <WhyChooseUs scrollProgress={smoothProgress} />
        </div>
      </div>
      <div className="relative z-20 bg-white">
        <ReviewsSection />
        <ProcessSection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
