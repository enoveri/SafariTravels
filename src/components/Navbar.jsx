import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-amber-600">HiddenSafari</div>
      <div className="flex space-x-6">
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
    </nav>
  );
};

export default Navbar; 