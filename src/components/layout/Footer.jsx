import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useCompanyData, useSiteSettings } from '../../hooks/useSanityData';

const DEFAULT_ABOUT_LINKS = [
  { label: 'Company Background', path: '/about/company' },
  { label: 'Safety', path: '/about/safety' },
  { label: 'Service Recognitions', path: '/about/recognitions' },
  { label: 'Careers', path: '/about/careers' }
];
const DEFAULT_SERVICES_LINKS = [
  { label: 'Heating Services', path: '/services/heating' },
  { label: 'Cooling Services', path: '/services/cooling' },
  { label: 'Plumbing Services', path: '/services/plumbing' },
  { label: 'Commercial Services', path: '/commercial' },
  { label: 'Pumps & Equipment', path: '/services/pumps-equipment' },
  { label: 'Portfolio', path: '/portfolio' },
];
const DEFAULT_FOOTER = {
  hoursHeading: 'Business Hours',
  mondayFridayLabel: 'Monday – Friday',
  mondayFridayHours: '8:00 AM – 5:00 PM',
  saturdayText: 'Saturday: By Appointment',
  sundayText: 'Sunday: Closed',
  licensedText: 'Fully Licensed & Insured'
};

const Footer = () => {
  const { data: companyData, loading: companyLoading, error: companyError } = useCompanyData();
  const { data: siteSettings, loading: settingsLoading, error: settingsError } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const useFallback = companyLoading || companyError || settingsLoading || settingsError;

  const aboutLinks = useFallback ? DEFAULT_ABOUT_LINKS : (siteSettings?.footer?.aboutLinks || DEFAULT_ABOUT_LINKS);
  const servicesLinks = useFallback ? DEFAULT_SERVICES_LINKS : (siteSettings?.footer?.servicesLinks || DEFAULT_SERVICES_LINKS);
  const footer = useFallback ? DEFAULT_FOOTER : (siteSettings?.footer || DEFAULT_FOOTER);
  const name = useFallback ? 'Snyder Mechanical' : (companyData?.name || 'Snyder Mechanical');
  const description = useFallback ? '' : (companyData?.description || '');
  const phone = useFallback ? '(775) 738-5616' : (companyData?.phone || '(775) 738-5616');
  const email = useFallback ? 'info@snydermechanical.com' : (companyData?.email || 'info@snydermechanical.com');
  const address = useFallback ? 'Elko, Spring Creek, NV' : (companyData?.address?.display || 'Elko, Spring Creek, NV');
  const serviceArea = useFallback ? 'Northeastern Nevada' : (companyData?.serviceArea || 'Northeastern Nevada');

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <Link to="/">
              <img
                src="/logo.png"
                alt={name}
                className="h-14 w-auto object-contain mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed mb-5">
              {description
                ? `${description.substring(0, 130)}...`
                : `${name} — Northeastern Nevada's trusted mechanical contractor since 1981.`}
            </p>
            <div className="flex flex-col space-y-2.5">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{email}</span>
              </a>
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">About Us</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Services</h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">{footer.hoursHeading}</h4>
            <div className="space-y-3 text-primary-200 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-300" />
                <div>
                  <p className="font-medium text-white">{footer.mondayFridayLabel}</p>
                  <p>{footer.mondayFridayHours}</p>
                </div>
              </div>
              <p>{footer.saturdayText}</p>
              <p>{footer.sundayText}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-primary-700">
              <Link
                to="/contact"
                className="inline-block w-full text-center py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white rounded-md font-semibold text-sm transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.ico"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain flex-shrink-0"
              />
              <p className="text-primary-300 text-sm">
                © {currentYear} {name}. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-primary-300 flex-shrink-0" />
              <span>Licensed, Bonded &amp; Insured in Nevada &mdash; Serving {serviceArea}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
