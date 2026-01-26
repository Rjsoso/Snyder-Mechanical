const Card = ({ children, className = '', hover = false }) => {
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
