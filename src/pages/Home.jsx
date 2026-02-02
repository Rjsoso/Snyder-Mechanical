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
      <QuickServiceSelector />
      <ServicesGrid />
      <ReviewsSection />
      <StatsBar />
      <SafetySection />
    </>
  );
};

export default Home;
