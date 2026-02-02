import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import HeatingServices from './pages/services/HeatingServices';
import CoolingServices from './pages/services/CoolingServices';
import PlumbingServices from './pages/services/PlumbingServices';
import EmergencyServices from './pages/services/EmergencyServices';
import Resources from './pages/Resources';
import CommercialLanding from './pages/CommercialLanding';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Specific Service Routes */}
          <Route path="/services/heating" element={<HeatingServices />} />
          <Route path="/services/cooling" element={<CoolingServices />} />
          <Route path="/services/plumbing" element={<PlumbingServices />} />
          <Route path="/services/emergency" element={<EmergencyServices />} />
          
          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          
          {/* Commercial Landing */}
          <Route path="/commercial" element={<CommercialLanding />} />
          
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
  );
}

export default App;
