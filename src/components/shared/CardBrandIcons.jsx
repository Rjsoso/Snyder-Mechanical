import PropTypes from 'prop-types';

const CardBrandIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Visa */}
      <div className="h-6 w-10 flex items-center justify-center bg-white rounded border border-gray-200">
        <svg viewBox="0 0 48 32" className="h-4">
          <path fill="#1434CB" d="M21.3 19.2l1.6-9.8h2.6l-1.6 9.8h-2.6zm11.7-9.6c-.5-.2-1.4-.4-2.4-.4-2.6 0-4.5 1.4-4.5 3.3 0 1.4 1.3 2.2 2.3 2.7 1 .5 1.4.8 1.4 1.2 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.3c.6.3 1.8.5 3 .5 2.8 0 4.6-1.4 4.6-3.5 0-1.1-.7-2-2.1-2.6-1-.5-1.5-.8-1.5-1.3 0-.4.5-.9 1.5-.9.9 0 1.5.2 2 .4l.2.1.4-2.1zm6.5-2.2h-2c-.6 0-1.1.2-1.4.8l-3.9 9.1h2.8s.5-1.3.6-1.5c.3 0 3.2 0 3.6 0 .1.3.3 1.5.3 1.5h2.5l-2.2-9.9zm-3.4 6.4c.2-.6 1.1-3 1.1-3l.6 3h-1.7zM14.6 9.4l-2.5 6.7-.3-1.4c-.5-1.6-1.9-3.4-3.6-4.2l2.4 8.7h2.8l4.2-9.8h-2.8z"/>
          <path fill="#FCA121" d="M7.8 9.4H3.2l0 .2c3.3.8 5.5 2.8 6.4 5.2l-.9-4.6c-.2-.6-.6-.8-1.2-.8z"/>
        </svg>
      </div>

      {/* Mastercard */}
      <div className="h-6 w-10 flex items-center justify-center bg-white rounded border border-gray-200">
        <svg viewBox="0 0 48 32" className="h-4">
          <circle cx="15" cy="16" r="10" fill="#EB001B"/>
          <circle cx="33" cy="16" r="10" fill="#F79E1B"/>
          <path d="M24 8.8c-2 1.8-3.2 4.4-3.2 7.2s1.3 5.4 3.2 7.2c2-1.8 3.2-4.4 3.2-7.2s-1.3-5.4-3.2-7.2z" fill="#FF5F00"/>
        </svg>
      </div>

      {/* American Express */}
      <div className="h-6 w-10 flex items-center justify-center bg-white rounded border border-gray-200">
        <svg viewBox="0 0 48 32" className="h-4">
          <rect fill="#006FCF" width="48" height="32" rx="2"/>
          <text x="24" y="20" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">AMEX</text>
        </svg>
      </div>

      {/* Discover */}
      <div className="h-6 w-10 flex items-center justify-center bg-white rounded border border-gray-200">
        <svg viewBox="0 0 48 32" className="h-4">
          <rect fill="#FF6000" width="48" height="32" rx="2"/>
          <circle cx="38" cy="16" r="10" fill="#F9A000"/>
        </svg>
      </div>
    </div>
  );
};

CardBrandIcons.propTypes = {
  className: PropTypes.string,
};

export default CardBrandIcons;
