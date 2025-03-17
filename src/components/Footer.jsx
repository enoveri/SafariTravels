import React from "react";

const Footer = () => {
  return (
    <footer className="bg-pink-200 text-gray-700 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            HiddenSafari
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a href="#teams" className="hover:text-amber-700">
              Teams
            </a>
            <a href="#about" className="hover:text-amber-700">
              About
            </a>
            <a href="#events" className="hover:text-amber-700">
              Events
            </a>
            <a href="#contact" className="hover:text-amber-700">
              Contact US
            </a>
            <a href="#terms" className="hover:text-amber-700">
              Terms and Condition
            </a>
          </div>

          {/* Email Subscription */}
          <div className="flex mb-4 md:mb-0">
            <input
              type="email"
              placeholder="Enter your Email"
              className="px-4 py-2 w-full text-gray-800 border border-gray-300 rounded-l focus:outline-none"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-r hover:bg-gray-700">
              <i className="fa fa-search"></i>
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-pink-600 hover:text-pink-800"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="#"
              className="text-red-600 hover:text-red-800"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 