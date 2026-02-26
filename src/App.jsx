import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('App error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center px-6 max-w-lg">
            <h1 className="text-2xl font-bold text-secondary-900 mb-3">Something went wrong</h1>
            <pre className="text-xs text-left bg-secondary-50 border border-secondary-200 rounded p-4 mb-4 overflow-auto max-h-48 text-red-600">{this.state.error?.message}{'\n'}{this.state.error?.stack}</pre>
            <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-primary-900 text-white rounded-md font-semibold hover:bg-primary-800 transition-colors">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import HeatingServices from './pages/services/HeatingServices';
import CoolingServices from './pages/services/CoolingServices';
import PlumbingServices from './pages/services/PlumbingServices';
import Resources from './pages/Resources';
import CommercialLanding from './pages/CommercialLanding';
import InvoiceSyncDashboard from './pages/admin/InvoiceSyncDashboard';

function App() {
  return (
    <ErrorBoundary>
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Specific Service Routes */}
          <Route path="/services/heating" element={<HeatingServices />} />
          <Route path="/services/cooling" element={<CoolingServices />} />
          <Route path="/services/plumbing" element={<PlumbingServices />} />
          
          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          
          {/* Commercial Landing */}
          <Route path="/commercial" element={<CommercialLanding />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/invoice-sync" element={<InvoiceSyncDashboard />} />
          
          {/* General Service Routes */}
          <Route path="/services/:slug" element={<ServicePage />} />
          
          {/* About Routes */}
          <Route path="/about/:section" element={<AboutPage />} />
          
          {/* Other Routes */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-secondary-600 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
