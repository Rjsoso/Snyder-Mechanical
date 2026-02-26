import { useEffect } from 'react';
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

  return (
    <>
      <Hero />
      {/* Spacer matches hero height so scroll length is correct; content scrolls over fixed hero */}
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-10 bg-white">
        <StatsBar />
        <ServicesGrid />
      </div>
      <WhyChooseUs />
      <div className="relative z-10 bg-white">
        <ReviewsSection />
        <ProcessSection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
