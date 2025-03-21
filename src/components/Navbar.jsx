import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-amber-600">HiddenSafari</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <i className="fa fa-home mr-2"></i> Home
          </a>
          <a
            href="#events"
            className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </a>
          <a
            href="#team"
            className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <i className="fa fa-users mr-2"></i> Team
          </a>
          <a
            href="#about"
            className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </a>
          <a
            href="#contact"
            className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </a>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2 space-y-3">
          <a
            href="#home"
            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-home mr-2"></i> Home
          </a>
          <a
            href="#events"
            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </a>
          <a
            href="#team"
            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-users mr-2"></i> Team
          </a>
          <a
            href="#about"
            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </a>
          <a
            href="#contact"
            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 