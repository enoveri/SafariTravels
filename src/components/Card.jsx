import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ 
  id,
  image, 
  title, 
  icons = [], 
  type = "default", 
  overlay = "",
  className = "" 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (id) {
      navigate(`/events/${id}`);
    }
  };
  
  // Trek card style with hover effect
  if (type === "trek") {
    return (
      <div 
        className={`relative overflow-hidden rounded-lg group ${className} cursor-pointer`}
        onClick={handleClick}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white font-bold text-lg md:text-xl">{title}</div>
        </div>
      </div>
    );
  }
  
  // Simple card with just title at bottom
  if (type === "simple") {
    return (
      <div 
        className={`bg-white rounded-lg overflow-hidden ${className} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={handleClick}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-56 object-cover"
        />
        <div className="p-3 md:p-4 text-center">
          <div className="text-base md:text-lg font-medium">{title}</div>
        </div>
      </div>
    );
  }
  
  // Card with overlay text in center
  if (type === "overlay") {
    return (
      <div 
        className={`relative overflow-hidden rounded-lg ${className} cursor-pointer`}
        onClick={handleClick}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
          <div className="text-white font-bold text-xl md:text-2xl">{overlay || title}</div>
        </div>
        {!overlay && (
          <div className="p-3 md:p-4 text-center">
            <div className="text-base md:text-lg font-medium">{title}</div>
          </div>
        )}
      </div>
    );
  }

  // Default card style (for events)
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-lg ${className} cursor-pointer hover:shadow-xl transition-shadow`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 md:h-64 object-cover"
      />
      <div className="p-3 md:p-4">
        <div className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</div>
        {icons.length > 0 && (
          <div className="flex justify-around text-gray-600">
            {icons.map((icon, index) => (
              <i key={index} className={`${icon} text-sm md:text-base`}></i>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card; 