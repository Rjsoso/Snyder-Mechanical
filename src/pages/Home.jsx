import Hero from '../components/home/Hero';
import QuickServiceSelector from '../components/home/QuickServiceSelector';
import ServicesGrid from '../components/home/ServicesGrid';
import ReviewsSection from '../components/home/ReviewsSection';
import StatsBar from '../components/home/StatsBar';
import SafetySection from '../components/home/SafetySection';

const Home = () => {
  return (
    <>
      <Hero />
      {/* Spacer matches hero height so scroll length is correct; content scrolls over fixed hero */}
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-10">
        <QuickServiceSelector />
        <ServicesGrid />
        <ReviewsSection />
        <StatsBar />
        <SafetySection />
      </div>
    </>
  );
};

export default Home;
