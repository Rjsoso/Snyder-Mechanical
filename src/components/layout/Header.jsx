import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import companyData from '../../data/company.json';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-4 border-secondary-500 sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Snyder Mechanical" 
              className="h-20 md:h-24 w-auto max-w-[280px] md:max-w-[400px] object-contain"
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
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
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

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 font-medium text-secondary-700 hover:text-primary-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-secondary-100">
                  <Link to="/services/residential" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Residential
                  </Link>
                  <Link to="/services/commercial" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Commercial
                  </Link>
                  <Link to="/services/pumps-equipment" className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Pumps & Equipment
                  </Link>
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
              <span>{companyData.phone}</span>
            </a>

            {/* CTA Button */}
            <Link to="/?modal=schedule" className="btn-primary">
              Schedule Service
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
                <Link to="/services/residential" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Residential
                </Link>
                <Link to="/services/commercial" className="block pl-4 text-secondary-700 hover:text-primary-600">
                  Commercial
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
                className="flex items-center space-x-2 text-primary-600 font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>{companyData.phone}</span>
              </a>
              <Link to="/?modal=schedule" className="btn-primary text-center">
                Schedule Service
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
