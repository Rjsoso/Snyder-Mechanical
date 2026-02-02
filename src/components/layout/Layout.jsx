import Header from './Header';
import Footer from './Footer';
import ChatbotPlaceholder from './ChatbotPlaceholder';
import FloatingCallButton from '../mobile/FloatingCallButton';
import QuickActionBar from '../mobile/QuickActionBar';
import EmergencyBanner from '../mobile/EmergencyBanner';
import LiveActivity from '../home/LiveActivity';
import ModalManager from '../shared/ModalManager';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <EmergencyBanner />
      <main className="flex-grow pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <ChatbotPlaceholder />
      <FloatingCallButton />
      <QuickActionBar />
      <LiveActivity />
      <ModalManager />
    </div>
  );
};

export default Layout;
