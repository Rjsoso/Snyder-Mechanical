import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCompanyData, useSiteSettings } from '../../hooks/useSanityData';

const DEFAULT_ABOUT_DROPDOWN = [
  { label: 'Company Background', path: '/about/company' },
  { label: 'Safety', path: '/about/safety' },
  { label: 'Service Recognitions', path: '/about/recognitions' },
  { label: 'Careers', path: '/about/careers' }
];
const DEFAULT_HOMEOWNERS_SERVICES = [
  { label: 'Heating Services', path: '/services/heating' },
  { label: 'Cooling Services', path: '/services/cooling' },
  { label: 'Plumbing Services', path: '/services/plumbing' }
];
const DEFAULT_BUSINESS_SERVICES = [
  { label: 'Commercial Overview', path: '/commercial' },
  { label: 'Commercial HVAC', path: '/services/commercial' },
  { label: 'Design/Build Projects', path: '/services/commercial#design-build' },
  { label: 'Pumps & Equipment', path: '/services/pumps-equipment' }
];

const Header = () => {
  const { data: companyData, loading: companyLoading, error: companyError } = useCompanyData();
  const { data: siteSettings, loading: settingsLoading, error: settingsError } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutCloseTimeout, setAboutCloseTimeout] = useState(null);
  const [servicesCloseTimeout, setServicesCloseTimeout] = useState(null);
  const location = useLocation();

  const useFallback = companyLoading || companyError || settingsLoading || settingsError;

  const isActive = (path) => location.pathname === path;

  const aboutDropdown = useFallback ? DEFAULT_ABOUT_DROPDOWN : (siteSettings?.navigation?.aboutDropdown || DEFAULT_ABOUT_DROPDOWN);
  const homeownersServices = useFallback ? DEFAULT_HOMEOWNERS_SERVICES : (siteSettings?.navigation?.servicesDropdown?.homeownersServices || DEFAULT_HOMEOWNERS_SERVICES);
  const businessServices = useFallback ? DEFAULT_BUSINESS_SERVICES : (siteSettings?.navigation?.servicesDropdown?.businessServices || DEFAULT_BUSINESS_SERVICES);
  const paymentsLabel = useFallback ? 'Payments' : (siteSettings?.navigation?.paymentsLabel || 'Payments');
  const phone = useFallback ? '(775) 738-5616' : (companyData?.phone || '(775) 738-5616');

  const handleAboutMouseEnter = () => {
    if (aboutCloseTimeout) clearTimeout(aboutCloseTimeout);
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    const timeout = setTimeout(() => setAboutDropdownOpen(false), 150);
    setAboutCloseTimeout(timeout);
  };

  const handleServicesMouseEnter = () => {
    if (servicesCloseTimeout) clearTimeout(servicesCloseTimeout);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => setServicesDropdownOpen(false), 150);
    setServicesCloseTimeout(timeout);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Utility Bar */}
      <div className="bg-primary-900 text-white text-sm">
        <div className="container-custom py-1.5 flex items-center justify-between">
          <span className="text-primary-200 hidden sm:block">
            Serving Northeastern Nevada since 1981 &mdash; Licensed &amp; Insured
          </span>
          <span className="text-primary-200 sm:hidden text-xs">Licensed &amp; Insured · NV</span>
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{phone}</span>
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-secondary-100">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/logo.png"
                alt="Snyder Mechanical"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              <Link
                to="/"
                className={`font-medium text-sm transition-colors pb-1 border-b-2 ${
                  isActive('/') ? 'text-primary-700 border-primary-700' : 'text-secondary-700 hover:text-primary-700 border-transparent hover:border-primary-300'
                }`}
              >
                Home
              </Link>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
              >
                <button className={`flex items-center space-x-1 font-medium text-sm transition-colors pb-1 border-b-2 ${
                  location.pathname.startsWith('/about') ? 'text-primary-700 border-primary-700' : 'text-secondary-700 hover:text-primary-700 border-transparent hover:border-primary-300'
                }`}>
                  <span>About</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-secondary-100 z-50">
                    {aboutDropdown.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="block px-4 py-2.5 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button className={`flex items-center space-x-1 font-medium text-sm transition-colors pb-1 border-b-2 ${
                  location.pathname.startsWith('/services') ? 'text-primary-700 border-primary-700' : 'text-secondary-700 hover:text-primary-700 border-transparent hover:border-primary-300'
                }`}>
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-4 border border-secondary-100 z-50">
                    <div className="grid grid-cols-2 gap-2 px-4">
                      <div>
                        <div className="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-2 px-2">
                          For Homeowners
                        </div>
                        {homeownersServices.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block px-2 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-md"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-l border-secondary-100 pl-4">
                        <div className="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-2 px-2">
                          For Businesses
                        </div>
                        {businessServices.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block px-2 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-md"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/portfolio"
                className={`font-medium text-sm transition-colors pb-1 border-b-2 ${
                  isActive('/portfolio') ? 'text-primary-700 border-primary-700' : 'text-secondary-700 hover:text-primary-700 border-transparent hover:border-primary-300'
                }`}
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                className={`font-medium text-sm transition-colors pb-1 border-b-2 ${
                  isActive('/contact') ? 'text-primary-700 border-primary-700' : 'text-secondary-700 hover:text-primary-700 border-transparent hover:border-primary-300'
                }`}
              >
                Contact
              </Link>

              <Link
                to="/resources"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/resources')
                    ? 'bg-primary-700 text-white'
                    : 'bg-primary-700 text-white hover:bg-primary-800'
                }`}
              >
                {paymentsLabel}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-700 hover:text-primary-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-4 pb-40 border-t border-secondary-100 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Mobile phone CTA */}
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 w-full mb-4 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>Call {phone}</span>
              </a>

              <div className="flex flex-col space-y-1">
                <Link
                  to="/"
                  className="font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 px-3 py-2.5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <div className="space-y-1">
                  <div className="font-medium text-secondary-900 px-3 py-2">About</div>
                  {aboutDropdown.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block pl-6 pr-3 py-2 text-secondary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="font-medium text-secondary-900 px-3 py-2">Services</div>
                  <div className="text-xs font-bold text-secondary-400 uppercase tracking-wider pl-6 pt-1 pb-1">For Homeowners</div>
                  {homeownersServices.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block pl-6 pr-3 py-2 text-secondary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="text-xs font-bold text-secondary-400 uppercase tracking-wider pl-6 pt-2 pb-1">For Businesses</div>
                  {businessServices.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block pl-6 pr-3 py-2 text-secondary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/portfolio"
                  className="font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 px-3 py-2.5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/contact"
                  className="font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 px-3 py-2.5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/resources"
                  className="font-medium text-white bg-primary-700 hover:bg-primary-800 px-3 py-2.5 rounded-lg text-center transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {paymentsLabel}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
