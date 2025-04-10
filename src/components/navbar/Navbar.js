import React, { useState, useEffect, useRef } from "react";

import bigLogo from "./assets/reddit_logo_horizontal_on_orangered.png";
import searchIcon from "./assets/search_black_24dp.svg";
import clearIcon from "./assets/clear_black_24dp.svg";

import "./Navbar.css";

function Navbar({
  search,
  handleSearch,
  handleClear,
}) {
  const [isSticky, setIsSticky] = useState(false);
  const searchInputRef = useRef(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle scroll events for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className={`navbar-container ${isSticky ? 'sticky' : ''}`}>
        <div className="navbar">
          <div className="reddit">
            <a href="/" className="logo" aria-label="Reddit Home">
              <img 
                src={bigLogo} 
                alt="Reddit Logo" 
                loading="lazy"
                width="120"
                height="32"
              />
            </a>
            <div className="search-bar">
              <img src={searchIcon} alt="" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search Reddit (Ctrl/Cmd + K)"
                aria-label="Search Reddit"
                role="searchbox"
              />
              {search && (
                <button
                  className="clear-button"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  <img src={clearIcon} alt="" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
