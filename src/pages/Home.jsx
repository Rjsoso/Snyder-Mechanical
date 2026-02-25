import Hero from '../components/home/Hero';
import QuickServiceSelector from '../components/home/QuickServiceSelector';
import ServicesGrid from '../components/home/ServicesGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProcessSection from '../components/home/ProcessSection';
import ReviewsSection from '../components/home/ReviewsSection';
import StatsBar from '../components/home/StatsBar';
import CTABanner from '../components/home/CTABanner';
import SafetySection from '../components/home/SafetySection';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      {/* Spacer matches hero height so scroll length is correct; content scrolls over fixed hero */}
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-10 bg-white">
        <QuickServiceSelector />
        <ServicesGrid />
        <WhyChooseUs />
        <ProcessSection />
        <ReviewsSection />
        <StatsBar />
        <SafetySection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
