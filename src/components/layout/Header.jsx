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

const NAV_LINK = 'text-[11px] font-bold uppercase tracking-[0.14em] transition-colors pb-0.5';
const NAV_ACTIVE = 'text-white border-b border-white';
const NAV_IDLE = 'text-white/60 hover:text-white';

const DROPDOWN_ITEM = 'block px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-secondary-600 hover:bg-secondary-50 hover:text-primary-900 transition-colors';

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
    <header className="bg-[#111111] shadow-md border-b border-white/10 fixed top-0 left-0 right-0 z-50 overflow-visible">
      <nav className="container-custom">
        <div className="flex items-start justify-between h-[68px]">
          {/* Logo — white badge box with top margin so the dark bar is visible above */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <div className="bg-white rounded-2xl shadow-xl px-5 pt-2 pb-4 mt-2">
              <img
                src="/logo.png"
                alt="Snyder Mechanical"
                className="h-[80px] md:h-[88px] w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center self-center gap-7">
            <Link
              to="/"
              className={`${NAV_LINK} ${isActive('/') ? NAV_ACTIVE : NAV_IDLE}`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button className={`flex items-center gap-1 ${NAV_LINK} ${NAV_IDLE}`}>
                <span>About</span>
                <ChevronDown className="w-3 h-3 mt-px" />
              </button>
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-52 bg-white rounded-sm shadow-xl border border-secondary-100 border-t-2 border-t-primary-900 py-1.5 z-50">
                  {aboutDropdown.map((item, index) => (
                    <Link key={index} to={item.path} className={DROPDOWN_ITEM}>
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
              <button className={`flex items-center gap-1 ${NAV_LINK} ${NAV_IDLE}`}>
                <span>Services</span>
                <ChevronDown className="w-3 h-3 mt-px" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-56 bg-white rounded-sm shadow-xl border border-secondary-100 border-t-2 border-t-primary-900 py-1.5 z-50">
                  <div className="px-5 pt-2 pb-1 text-[10px] font-black uppercase tracking-[0.18em] text-secondary-400">
                    Homeowners
                  </div>
                  {homeownersServices.map((item, index) => (
                    <Link key={index} to={item.path} className={DROPDOWN_ITEM}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="mx-4 my-1.5 border-t border-secondary-100" />
                  <div className="px-5 pt-1 pb-1 text-[10px] font-black uppercase tracking-[0.18em] text-secondary-400">
                    Commercial
                  </div>
                  {businessServices.map((item, index) => (
                    <Link key={index} to={item.path} className={DROPDOWN_ITEM}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`${NAV_LINK} ${isActive('/portfolio') ? NAV_ACTIVE : NAV_IDLE}`}
            >
              Portfolio
            </Link>

            <Link
              to="/contact"
              className={`${NAV_LINK} ${isActive('/contact') ? NAV_ACTIVE : NAV_IDLE}`}
            >
              Contact
            </Link>

            {/* Payments CTA */}
            <Link
              to="/resources"
              className="px-5 py-2 bg-white text-primary-900 text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-white/85 transition-colors rounded-sm"
            >
              {paymentsLabel}
            </Link>

            {/* Phone Number */}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xl:inline">{phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden self-center p-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-0 py-4 pb-40 border-t border-white/10 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="flex flex-col gap-5">
              <Link
                to="/"
                className={`${NAV_LINK} ${isActive('/') ? 'text-white' : 'text-white/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* About Submenu */}
              <div className="space-y-2">
                <div className={`${NAV_LINK} text-white/80`}>About</div>
                {aboutDropdown.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Services Submenu */}
              <div className="space-y-2">
                <div className={`${NAV_LINK} text-white/80`}>Services</div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30 pl-4 mt-2">Homeowners</div>
                {homeownersServices.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30 pl-4 mt-3">Commercial</div>
                {businessServices.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/portfolio"
                className={`${NAV_LINK} ${isActive('/portfolio') ? 'text-white' : 'text-white/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>

              <Link
                to="/contact"
                className={`${NAV_LINK} ${isActive('/contact') ? 'text-white' : 'text-white/60'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Link
                to="/resources"
                className="self-start px-5 py-2.5 bg-white text-primary-900 text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-white/85 transition-colors rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {paymentsLabel}
              </Link>

              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
