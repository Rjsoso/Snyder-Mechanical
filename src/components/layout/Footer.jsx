import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useCompanyData, useSiteSettings } from '../../hooks/useSanityData';

const Footer = () => {
  const { data: companyData } = useCompanyData();
  const { data: siteSettings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  // Fallback footer data if Sanity data is not available
  const aboutLinks = siteSettings?.footer?.aboutLinks || [
    { label: 'Company Background', path: '/about/company' },
    { label: 'Safety', path: '/about/safety' },
    { label: 'Service Recognitions', path: '/about/recognitions' },
    { label: 'Careers', path: '/about/careers' }
  ];

  const servicesLinks = siteSettings?.footer?.servicesLinks || [
    { label: 'Residential Services', path: '/services/residential' },
    { label: 'Commercial Services', path: '/commercial' },
    { label: 'Payments', path: '/resources' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const footer = siteSettings?.footer || {
    hoursHeading: 'Business Hours',
    mondayFridayLabel: 'Monday - Friday',
    mondayFridayHours: '8:00 AM - 5:00 PM',
    saturdayText: 'Saturday: By Appointment',
    sundayText: 'Sunday: Closed',
    licensedText: 'Fully Licensed & Insured'
  };

  const name = companyData?.name || 'Snyder Mechanical';
  const description = companyData?.description || '';
  const phone = companyData?.phone || '(775) 738-5616';
  const address = companyData?.address?.display || 'Elko, Spring Creek, NV';
  const serviceArea = companyData?.serviceArea || 'Northeastern Nevada';

  return (
    <footer className="bg-gradient-to-b from-secondary-700 to-secondary-800 text-white border-t-4 border-secondary-500">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{name}</h3>
            <p className="text-secondary-300 mb-4">
              {description ? `${description.substring(0, 120)}...` : 'Professional HVAC and mechanical services'}
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href={`tel:${phone}`}
                className="flex items-center space-x-2 text-secondary-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
              <div className="flex items-center space-x-2 text-secondary-300">
                <MapPin className="w-4 h-4" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links - About */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-secondary-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-secondary-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footer.hoursHeading}</h4>
            <div className="space-y-2 text-secondary-300">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{footer.mondayFridayLabel}</p>
                  <p className="text-sm">{footer.mondayFridayHours}</p>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p>{footer.saturdayText}</p>
                <p>{footer.sundayText}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {currentYear} {name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-secondary-400 text-sm">
              <span>{footer.licensedText}</span>
              <span>•</span>
              <span>Serving {serviceArea}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
