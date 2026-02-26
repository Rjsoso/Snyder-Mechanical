import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import ServicesGrid from '../components/home/ServicesGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ReviewsSection from '../components/home/ReviewsSection';
import ProcessSection from '../components/home/ProcessSection';
import CTABanner from '../components/home/CTABanner';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      {/* Spacer matches hero height so scroll length is correct; content scrolls over fixed hero */}
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-10 bg-white">
        <StatsBar />
        <ServicesGrid />
        <WhyChooseUs />
        <ReviewsSection />
        <ProcessSection />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
