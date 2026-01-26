import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import StatsBar from '../components/home/StatsBar';
import SafetySection from '../components/home/SafetySection';

const Home = () => {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsBar />
      <SafetySection />
    </>
  );
};

export default Home;
