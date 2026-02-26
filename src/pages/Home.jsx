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
      <title>Snyder Mechanical | Elko, Spring Creek, NV | Mechanical Contractor</title>
      <meta name="description" content="For over 40 years, Snyder Mechanical has been northern Nevada's preferred mechanical contractor and service provider for design/build projects in Elko and Spring Creek, NV." />
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
