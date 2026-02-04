import { motion } from 'framer-motion';
import { useHomePageData } from '../../hooks/useSanityData';
import FlowingMenu from './FlowingMenu';

const flowingMenuItems = [
  {
    link: '/services/heating',
    text: 'Heating',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    link: '/services/cooling',
    text: 'Cooling',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    link: '/services/plumbing',
    text: 'Plumbing',
    image: 'https://picsum.photos/600/400?random=3'
  }
];

const QuickServiceSelector = () => {
  const { data: homePageData } = useHomePageData();

  const section = homePageData?.quickServiceSelector || {
    heading: 'What Do You Need?',
    description: 'Select a service to get started or call us for assistance'
  };

  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-white to-secondary-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container-custom">
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {section.heading}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </motion.div>
      </div>

      <div className="w-full relative rounded-b-2xl overflow-hidden" style={{ height: '400px' }}>
        <FlowingMenu
          items={flowingMenuItems}
          speed={15}
          textColor="#e6f2ff"
          bgColor="#00002e"
          marqueeBgColor="#f5f5ff"
          marqueeTextColor="#00002e"
          borderColor="#000056"
          showMarqueeImage={false}
        />
      </div>
    </section>
  );
};

export default QuickServiceSelector;
