import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-amber-600">
          HiddenSafari
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none transition-all duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
          >
            <i className="fa fa-home mr-2"></i> Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
          >
            <i className="fa fa-users mr-2"></i> Team
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </NavLink>
        </div>
      </div>

      {/* Mobile menu with transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100 mt-4 pb-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 pt-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-home mr-2"></i> Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-users mr-2"></i> Team
          </NavLink>
          <NavLink
          
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-bold"
                : "text-gray-700 hover:text-amber-600 transition-colors"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
