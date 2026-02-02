import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import companyData from '../../data/company.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-secondary-700 to-secondary-800 text-white border-t-4 border-secondary-500">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{companyData.name}</h3>
            <p className="text-secondary-300 mb-4">
              {companyData.description.substring(0, 120)}...
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href={`tel:${companyData.phone}`}
                className="flex items-center space-x-2 text-secondary-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{companyData.phone}</span>
              </a>
              <div className="flex items-center space-x-2 text-secondary-300">
                <MapPin className="w-4 h-4" />
                <span>{companyData.address.display}</span>
              </div>
            </div>
          </div>

          {/* Quick Links - About */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about/company" className="text-secondary-300 hover:text-white transition-colors">
                  Company Background
                </Link>
              </li>
              <li>
                <Link to="/about/safety" className="text-secondary-300 hover:text-white transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/about/recognitions" className="text-secondary-300 hover:text-white transition-colors">
                  Service Recognitions
                </Link>
              </li>
              <li>
                <Link to="/about/careers" className="text-secondary-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/residential" className="text-secondary-300 hover:text-white transition-colors">
                  Residential Services
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="text-secondary-300 hover:text-white transition-colors">
                  Commercial Services
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-secondary-300 hover:text-white transition-colors">
                  Resources & Tips
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-secondary-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-secondary-300">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Monday - Friday</p>
                  <p className="text-sm">8:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <p>Saturday: By Appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {currentYear} {companyData.name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-secondary-400 text-sm">
              <span>Fully Licensed & Insured</span>
              <span>•</span>
              <span>Serving {companyData.serviceArea}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
