import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatbotPlaceholder from './ChatbotPlaceholder';
import QuickActionBar from '../mobile/QuickActionBar';
import ModalManager from '../shared/ModalManager';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0">
        <Header />
      </div>
      <main className="flex-shrink-0 pb-20 lg:pb-0 pt-36 md:pt-40 bg-white">
        {children}
      </main>
      {location.pathname !== '/' && (
        <div className="flex-shrink-0 relative z-10 bg-transparent" id="site-footer">
          <Footer />
        </div>
      )}
      <ChatbotPlaceholder />
      <QuickActionBar />
      <ModalManager />
    </div>
  );
};

export default Layout;
