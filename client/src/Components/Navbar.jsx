import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  FaTachometerAlt,
  FaSignInAlt,
  FaUserPlus,
  FaPaintBrush,
  FaBars,
  FaTimes,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
  FaBoxOpen,
  FaCog,
} from "react-icons/fa";

const NavItem = ({ href, text, icon, badge }) => (
  <li className="mx-4">
    <Link
      to={href}
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
      {badge && (
        <span className="bg-blue-600 text-white rounded-full px-2 py-1 ml-2">
          {badge}
        </span>
      )}
    </Link>
  </li>
);

const Header = ({ cartAmount, toggleMenu, isMenuOpen }) => {
  const { isLogin, isAdmin, user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="bg-gray-100">
        <div className="flex justify-between items-center py-2 px-4">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaTachometerAlt className="inline-block mr-1" />
              Dashboard
            </Link>
          )}
          <div className="ml-auto relative" ref={dropdownRef}>
            {isLogin ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`}
                    alt={user.first_name}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="inline-block mr-2" />
                      Your Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onisLoginFormClick={() => setIsDropdownOpen(false)}
                    >
                      <FaClipboardList className="inline-block mr-2" />
                      Orders
                    </Link>
                    <Link
                      to="/track-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaBoxOpen className="inline-block mr-2" />
                      Track Orders
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCog className="inline-block mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 mr-2"
                >
                  <FaSignInAlt className="inline-block mr-1" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaUserPlus className="inline-block mr-1" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-blue-600 text-3xl font-bold">
            <FaPaintBrush className="mr-2" />
            <span>ColorCraft</span>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center">
              <NavItem href="/" text="Home" />
              <NavItem href="/shop" text="Products" />
              <NavItem href="#services" text="Services" />
              <NavItem href="#about" text="About" />
              <NavItem href="#contact" text="Contact" />
              <NavItem
                href="#wishlist"
                icon={<FaHeart className="mr-1" />}
                text="Wishlist"
              />
              <NavItem
                href="#cart"
                icon={<FaShoppingCart className="mr-1" />}
                text="Cart"
                badge={cartAmount}
              />
            </ul>
          </div>
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <NavItem href="/" text="Home" />
              <NavItem href="/shop" text="Products" />
              <NavItem href="#services" text="Services" />
              <NavItem href="#about" text="About" />
              <NavItem href="#contact" text="Contact" />
              <NavItem
                href="#wishlist"
                icon={<FaHeart className="mr-1" />}
                text="Wishlist"
              />
              <NavItem
                href="#cart"
                icon={<FaShoppingCart className="mr-1" />}
                text="Cart"
                badge={cartAmount}
              />
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
