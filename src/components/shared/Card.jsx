const Card = ({ children, className = '', hover = false }) => {
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-primary-300' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-secondary-200 p-6 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
