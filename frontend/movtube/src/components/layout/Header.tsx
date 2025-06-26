import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";

interface HeaderProps {
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [genresMenuOpen, setGenresMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { genres } = useMovies();

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

  // Handle clicks outside of user menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && event.target instanceof Element) {
        const userMenuElement = document.getElementById("user-menu-dropdown");
        if (userMenuElement && !userMenuElement.contains(event.target)) {
          setUserMenuOpen(false);
        }
      }

      if (genresMenuOpen && event.target instanceof Element) {
        const genresMenuElement = document.getElementById(
          "genres-menu-dropdown"
        );
        if (genresMenuElement && !genresMenuElement.contains(event.target)) {
          setGenresMenuOpen(false);
        }
      }

      if (searchOpen && event.target instanceof Element) {
        const searchPopupElement = document.getElementById("search-popup");
        if (
          searchPopupElement &&
          !searchPopupElement.contains(event.target) &&
          !(event.target as Element).closest(".search-button")
        ) {
          setSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen, genresMenuOpen, searchOpen]);

  // Handle ESC key press to close search popup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen && searchInputRef.current) {
      // Delay để cho hiệu ứng transition hiển thị trước khi focus
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Thực hiện tìm kiếm và chuyển hướng đến trang kết quả
    console.log("Searching for:", searchQuery);

    // Sử dụng navigate để chuyển hướng sang trang Movies với query tìm kiếm
    setTimeout(() => {
      setIsSearching(false);
      setSearchOpen(false);
      navigate(`/movies?query=${encodeURIComponent(searchQuery)}`);
    }, 500); // Thêm timeout nhỏ để hiển thị hiệu ứng loading
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
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className={`text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/movies" ? "text-red-500" : ""
                  }`}
                >
                  Tất Cả Phim
                </Link>
              </li>
              <li className="relative" id="genres-menu-dropdown">
                <button
                  onClick={() => setGenresMenuOpen(!genresMenuOpen)}
                  className="text-white font-medium transition-colors hover:text-red-500 flex items-center"
                >
                  Danh mục
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                      genresMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>{" "}
                {genresMenuOpen && (
                  <div
                    className="absolute left-0 mt-2 w-72 rounded-md shadow-lg py-3 px-2 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 origin-top-left transform transition-all duration-200 ease-out"
                    role="menu"
                  >
                    {genres && genres.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1">
                        {genres.map((genre) => (
                          <Link
                            key={genre.id}
                            to={`/movies?genreId=${genre.id}`}
                            onClick={() => setGenresMenuOpen(false)}
                            className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-150"
                            role="menuitem"
                          >
                            {genre.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400">
                        Không có danh mục nào
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li>
                <a
                  href="#"
                  className="text-white font-medium transition-colors hover:text-red-500"
                >
                  Yêu thích
                </a>
              </li>
            </ul>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleSearchToggle}
              className="text-white hover:text-red-500 transition-transform duration-200 search-button"
              aria-label="Tìm kiếm"
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
            </button>{" "}
            <div className="relative" id="user-menu-dropdown">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold"
              >
                U
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 origin-top-right transform transition-all duration-200 ease-out"
                  role="menu"
                >
                  <a
                    href="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Thông tin cá nhân
                  </a>
                  <a
                    href="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Cài đặt
                  </a>
                  <a
                    href="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    Danh sách yêu thích
                  </a>
                  <hr className="my-1 border-gray-700" />
                  <a
                    href="#"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </a>
                </div>
              )}
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
                <button
                  onClick={() => {
                    handleSearchToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-white font-medium transition-colors hover:text-red-500 search-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  Tìm kiếm phim
                </button>
              </li>
              <li>
                <Link
                  to="/"
                  className={`block text-white font-medium transition-colors hover:text-red-500 ${
                    location.pathname === "/" ? "text-red-500" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trang Chủ
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
                  Tất Cả Phim
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setGenresMenuOpen(!genresMenuOpen)}
                  className="w-full text-left flex items-center text-white font-medium transition-colors hover:text-red-500"
                >
                  Danh mục
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                      genresMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>{" "}
                {genresMenuOpen && (
                  <div className="pl-2 mt-3 mb-2">
                    {genres && genres.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {" "}
                        {genres.map((genre) => (
                          <Link
                            key={genre.id}
                            to={`/movies?genreId=${genre.id}`}
                            onClick={() => {
                              setGenresMenuOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded bg-gray-800/60 hover:bg-gray-700/80"
                          >
                            {genre.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 pl-2">
                        Không có danh mục nào
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li>
                <a
                  href="#"
                  className="block text-white font-medium transition-colors hover:text-red-500"
                >
                  Yêu thích
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Search Popup */}
        <div
          id="search-popup"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ${
            searchOpen
              ? "bg-opacity-80 backdrop-blur-sm opacity-100 visible"
              : "bg-opacity-0 backdrop-blur-none opacity-0 invisible"
          }`}
        >
          <div
            className={`bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 transform transition-all duration-300 ${
              searchOpen
                ? "scale-100 translate-y-0"
                : "scale-95 -translate-y-10"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-500"
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
                Tìm kiếm phim
              </h2>
              <button
                onClick={handleSearchToggle}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Đóng tìm kiếm"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên phim"
                className="w-full px-5 py-3 pl-12 text-white bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                autoFocus
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
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
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="absolute inset-y-0 right-0 flex items-center px-4 font-medium rounded-r-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-70"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang tìm
                  </div>
                ) : (
                  "Tìm kiếm"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
