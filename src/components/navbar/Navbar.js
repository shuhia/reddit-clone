import React, { useState, useEffect, useRef } from "react";

import bigLogo from "./assets/reddit_logo_horizontal_on_orangered.png";
import searchIcon from "./assets/search_black_24dp.svg";
import clearIcon from "./assets/clear_black_24dp.svg";

import "./Navbar.css";

function Navbar({ search, handleSearch, handleClear }) {
  const [isCondensed, setIsCondensed] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsCondensed(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="ui-skip-link">
        Skip to main content
      </a>
      <header className={`nav-shell ${isCondensed ? "nav-shell--scrolled" : ""}`}>
        <div className="ui-container nav-bar">
          <a href="/" className="nav-brand" aria-label="Reddit Home">
            <div className="nav-logo">
              <img src={bigLogo} alt="Reddit Logo" loading="lazy" width="120" height="32" />
            </div>
            <div className="nav-meta">
              <span className="nav-title">Open Reddit Clone</span>
              <span className="nav-subtitle">Remixed with Aurora UI</span>
            </div>
          </a>
          <div className="nav-search ui-input" role="search">
            <img src={searchIcon} alt="" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search Reddit for communities, posts, or users (Ctrl/Cmd + K)"
              aria-label="Search Reddit"
            />
            {search && (
              <button onClick={handleClear} aria-label="Clear search">
                <img src={clearIcon} alt="" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="nav-actions">
            <span className="ui-chip ghost">New Aurora look</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
