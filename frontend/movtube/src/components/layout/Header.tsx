import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the movie detail page for transparency
  const isMovieDetail =
    location.pathname.includes("/movies/") &&
    !location.pathname.endsWith("/movies/");

  // Handle scroll effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isMovieDetail
          ? "bg-gray-900 shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-red-600 text-2xl font-bold tracking-tight">
              Mov<span className="text-white">Tube</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className={`text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/" ? "text-red-500" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className={`text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/movies" ? "text-red-500" : ""
                  }`}
                >
                  Movies
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white font-medium transition-colors hover:text-red-500"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white font-medium transition-colors hover:text-red-500"
                >
                  New & Popular
                </a>
              </li>
            </ul>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="text-white hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              U
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-3 pb-3">
              <li>
                <Link
                  to="/"
                  className={`block text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/" ? "text-red-500" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className={`block text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/movies" ? "text-red-500" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Movies
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white font-medium transition-colors hover:text-red-500"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white font-medium transition-colors hover:text-red-500"
                >
                  New & Popular
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
