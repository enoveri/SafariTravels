import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  // Active link style function
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-amber-600 font-semibold"
      : "text-gray-700 hover:text-amber-600 transition-colors";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-amber-600">
          HiddenSafari
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center ${activeStyle({ isActive })}`
            }
          >
            <i className="fa fa-home mr-2"></i> Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `flex items-center ${activeStyle({ isActive })}`
            }
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `flex items-center ${activeStyle({ isActive })}`
            }
          >
            <i className="fa fa-users mr-2"></i> Team
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center ${activeStyle({ isActive })}`
            }
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center ${activeStyle({ isActive })}`
            }
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </NavLink>

          {/* Search button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-700 hover:text-amber-600 transition-colors"
            aria-label="Search"
          >
            <i className="fa fa-search"></i>
          </button>

          {/* Authentication Links */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-amber-700">
                Hi, {currentUser?.firstName || currentUser?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                <i className="fa fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center ${activeStyle({ isActive })}`
                }
              >
                <i className="fa fa-sign-in-alt mr-2"></i> Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex items-center px-4 py-1 rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors`
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile nav and search buttons */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-700 hover:text-amber-600 transition-colors"
            aria-label="Search"
          >
            <i className="fa fa-search"></i>
          </button>
          <button
            className="text-gray-700 focus:outline-none transition-all duration-200"
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
        </div>
      </div>

      {/* Search form with transition */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "max-h-16 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for adventures..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Search query"
          />
          <button 
            type="submit" 
            className="bg-amber-600 text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition-colors"
            aria-label="Search"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* Mobile menu with transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4 pb-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 pt-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 ${activeStyle({ isActive })}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-home mr-2"></i> Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `block py-2 ${activeStyle({ isActive })}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-calendar mr-2"></i> Events
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `block py-2 ${activeStyle({ isActive })}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-users mr-2"></i> Team
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 ${activeStyle({ isActive })}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-info-circle mr-2"></i> About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block py-2 ${activeStyle({ isActive })}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa fa-phone mr-2"></i> Contact
          </NavLink>
          
          {/* Mobile Authentication Links */}
          {isAuthenticated ? (
            <>
              <div className="py-2 text-amber-700 font-medium">
                Hi, {currentUser?.firstName || currentUser?.name || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <i className="fa fa-sign-out-alt mr-2"></i> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block py-2 ${activeStyle({ isActive })}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa fa-sign-in-alt mr-2"></i> Login
              </NavLink>
              <NavLink
                to="/register"
                className="block py-2 px-3 mt-2 text-center rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
