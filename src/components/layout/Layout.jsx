import Header from './Header';
import Footer from './Footer';
import ChatbotPlaceholder from './ChatbotPlaceholder';
import FloatingCallButton from '../mobile/FloatingCallButton';
import QuickActionBar from '../mobile/QuickActionBar';
import ModalManager from '../shared/ModalManager';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20 lg:pb-0 pt-24 md:pt-28 bg-white">
        {children}
      </main>
      <Footer />
      <ChatbotPlaceholder />
      <FloatingCallButton />
      <QuickActionBar />
      <ModalManager />
    </div>
  );
};

export default Layout;
