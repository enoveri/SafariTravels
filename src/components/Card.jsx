import React from "react";

const Card = ({ 
  image, 
  title, 
  icons = [], 
  type = "default", 
  overlay = "",
  className = "" 
}) => {
  // Trek card style with hover effect
  if (type === "trek") {
    return (
      <div className={`relative overflow-hidden rounded-lg group ${className}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white font-bold text-xl">{title}</div>
        </div>
      </div>
    );
  }
  
  // Simple card with just title at bottom
  if (type === "simple") {
    return (
      <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4 text-center">
          <div className="text-lg font-medium">{title}</div>
        </div>
      </div>
    );
  }
  
  // Card with overlay text in center
  if (type === "overlay") {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-white font-bold text-2xl">{overlay || title}</div>
        </div>
        {!overlay && (
          <div className="p-4 text-center">
            <div className="text-lg font-medium">{title}</div>
          </div>
        )}
      </div>
    );
  }

  // Default card style (for events)
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-lg ${className}`}>
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <div className="text-xl font-semibold mb-3">{title}</div>
        {icons.length > 0 && (
          <div className="flex justify-around text-gray-600">
            {icons.map((icon, index) => (
              <i key={index} className={icon}></i>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card; 