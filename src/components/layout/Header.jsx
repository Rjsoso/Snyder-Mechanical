import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import companyData from '../../data/company.json';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutCloseTimeout, setAboutCloseTimeout] = useState(null);
  const [servicesCloseTimeout, setServicesCloseTimeout] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // About dropdown handlers
  const handleAboutMouseEnter = () => {
    if (aboutCloseTimeout) clearTimeout(aboutCloseTimeout);
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    const timeout = setTimeout(() => setAboutDropdownOpen(false), 150);
    setAboutCloseTimeout(timeout);
  };

  // Services dropdown handlers
  const handleServicesMouseEnter = () => {
    if (servicesCloseTimeout) clearTimeout(servicesCloseTimeout);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => setServicesDropdownOpen(false), 150);
    setServicesCloseTimeout(timeout);
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-secondary-500 sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Snyder Mechanical" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'}`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button className="flex items-center space-x-1 font-medium text-secondary-700 hover:text-primary-600 transition-colors">
                <span>About</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-secondary-100">
                  <Link to="/about/company" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Company Background
                  </Link>
                  <Link to="/about/safety" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Safety
                  </Link>
                  <Link to="/about/recognitions" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Service Recognitions
                  </Link>
                  <Link to="/about/careers" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Careers
                  </Link>
                </div>
              )}
            </div>

            {/* Services Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button className="flex items-center space-x-1 font-medium text-secondary-700 hover:text-primary-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-4 border border-secondary-100">
                  <div className="grid grid-cols-2 gap-4 px-4">
                    {/* For Homeowners */}
                    <div>
                      <div className="text-xs font-bold text-secondary-500 uppercase tracking-wide mb-2 px-2">
                        For Homeowners
                      </div>
                      <Link to="/services/heating" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Heating Services
                      </Link>
                      <Link to="/services/cooling" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Cooling Services
                      </Link>
                      <Link to="/services/plumbing" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Plumbing Services
                      </Link>
                    </div>
                    
                    {/* For Businesses */}
                    <div className="border-l border-secondary-200 pl-4">
                      <div className="text-xs font-bold text-secondary-500 uppercase tracking-wide mb-2 px-2">
                        For Businesses
                      </div>
                      <Link to="/commercial" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Commercial Overview
                      </Link>
                      <Link to="/services/commercial" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Commercial HVAC
                      </Link>
                      <Link to="/services/commercial#design-build" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Design/Build Projects
                      </Link>
                      <Link to="/services/pumps-equipment" className="block px-2 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded">
                        Pumps & Equipment
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/portfolio" 
              className={`font-medium transition-colors ${isActive('/portfolio') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'}`}
            >
              Portfolio
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${isActive('/contact') ? 'text-primary-600' : 'text-secondary-700 hover:text-primary-600'}`}
            >
              Contact
            </Link>

            {/* Phone Number */}
            <a 
              href={`tel:${companyData.phone}`} 
              className="flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{companyData.phone}</span>
            </a>

            {/* Payments - Highlighted */}
            <Link 
              to="/resources"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/resources') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
              }`}
            >
              Payments
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-secondary-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-secondary-700 hover:text-primary-600">
                Home
              </Link>
              
              {/* About Submenu */}
              <div className="space-y-2">
                <div className="font-medium text-secondary-900">About</div>
                <Link to="/about/company" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Company Background
                </Link>
                <Link to="/about/safety" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Safety
                </Link>
                <Link to="/about/recognitions" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Service Recognitions
                </Link>
                <Link to="/about/careers" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Careers
                </Link>
              </div>

              {/* Services Submenu */}
              <div className="space-y-2">
                <div className="font-medium text-secondary-900">Services</div>
                <div className="text-xs font-bold text-secondary-500 uppercase tracking-wide pl-4 mt-2">For Homeowners</div>
                <Link to="/services/heating" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Heating Services
                </Link>
                <Link to="/services/cooling" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Cooling Services
                </Link>
                <Link to="/services/plumbing" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Plumbing Services
                </Link>
                <div className="text-xs font-bold text-secondary-500 uppercase tracking-wide pl-4 mt-3">For Businesses</div>
                <Link to="/commercial" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Commercial Overview
                </Link>
                <Link to="/services/commercial" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Commercial HVAC
                </Link>
                <Link to="/services/pumps-equipment" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Pumps & Equipment
                </Link>
              </div>

              <Link to="/portfolio" className="font-medium text-secondary-700 hover:text-primary-600">
                Portfolio
              </Link>
              <Link to="/contact" className="font-medium text-secondary-700 hover:text-primary-600">
                Contact
              </Link>
              
              <a 
                href={`tel:${companyData.phone}`} 
                className="flex items-center space-x-2 text-primary-600 font-semibold text-lg justify-center py-2"
              >
                <Phone className="w-5 h-5" />
                <span>{companyData.phone}</span>
              </a>

              <Link to="/resources" className="font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-lg text-center transition-colors">
                Payments
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
