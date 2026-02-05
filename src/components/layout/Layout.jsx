import { useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotPlaceholder from './ChatbotPlaceholder';
import FloatingCallButton from '../mobile/FloatingCallButton';
import QuickActionBar from '../mobile/QuickActionBar';
import ModalManager from '../shared/ModalManager';

const Layout = ({ children }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const logScrollInfo = () => {
      const { scrollHeight, clientHeight, scrollTop } = el;
      const style = window.getComputedStyle(el);
      console.log('[Layout scroll debug]', {
        scrollHeight,
        clientHeight,
        scrollTop,
        overflowY: style.overflowY,
        canScroll: scrollHeight > clientHeight,
        viewportHeight: window.innerHeight
      });
    };

    logScrollInfo();
    const ro = new ResizeObserver(logScrollInfo);
    ro.observe(el);
    window.addEventListener('resize', logScrollInfo);
    el.addEventListener('scroll', () => console.log('[Layout scroll] scrollTop:', el.scrollTop));

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', logScrollInfo);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen flex flex-col min-h-0 overflow-y-auto overflow-x-hidden"
    >
      <div className="flex-shrink-0 h-24 md:h-28">
        <Header />
      </div>
      <main className="flex-shrink-0 pb-20 lg:pb-0 pt-0 bg-white">
        {children}
      </main>
      {/* Debug: remove once footer is confirmed visible when scrolling to bottom */}
      <div className="flex-shrink-0 h-1 bg-red-500" aria-hidden="true" />
      <div className="flex-shrink-0 relative z-20">
        <Footer />
      </div>
      <ChatbotPlaceholder />
      <FloatingCallButton />
      <QuickActionBar />
      <ModalManager />
    </div>
  );
};

export default Layout;
