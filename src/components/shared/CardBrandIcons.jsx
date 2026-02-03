import PropTypes from 'prop-types';

const CardBrandIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Visa */}
      <div className="h-6 w-10 flex items-center justify-center bg-white rounded border border-gray-200 px-1">
        <svg viewBox="0 0 750 471" className="w-full h-auto">
          <path fill="#1434CB" d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763h-53.334zm246.494-191.716c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-.299 28.13 26.514 43.82 46.752 53.185 20.771 9.597 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.116-31.924 19.116-21.355 0-32.701-2.967-50.225-10.274l-6.877-3.112-7.488 43.823c12.463 5.466 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.884.199-22.27-14.016-39.216-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.559-16.838 17.447-.271 30.088 3.534 39.936 7.5l4.781 2.259 7.232-42.428m137.31-4.223h-41.232c-12.773 0-22.332 3.486-27.941 16.234l-79.244 179.402h56.031s9.159-24.121 11.232-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.186-195.636zm-65.417 126.408c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.607 16.878s10.217 46.729 12.353 56.527h-44.294v.003zm-363.3-126.408l-52.239 133.493-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.386-56.524.005" />
          <path fill="#FCA121" d="M131.916 138.322H45.879l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.415l-18.709-89.96c-3.229-12.396-12.597-16.094-24.19-16.528" />
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
