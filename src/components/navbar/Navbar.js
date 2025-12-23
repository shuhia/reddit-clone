import React, { useState, useEffect, useRef } from "react";

import bigLogo from "./assets/reddit_logo_horizontal_on_orangered.png";
import searchIcon from "./assets/search_black_24dp.svg";
import clearIcon from "./assets/clear_black_24dp.svg";
import personIcon from "./assets/person_black_24dp.svg";
import arrowDownIcon from "./assets/keyboard_arrow_down_black_24dp.svg";

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
    const handleScroll = () => setIsCondensed(window.scrollY > 8);
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
          <div className="nav-left">
            <a href="/" className="nav-brand" aria-label="Reddit Home">
              <img src={bigLogo} alt="Reddit Logo" loading="lazy" className="nav-logo" />
            </a>
            <button className="nav-home" aria-label="Open home feed options">
              <span className="nav-home__label">Home</span>
              <img src={arrowDownIcon} alt="" aria-hidden="true" />
            </button>
          </div>

          <div className="nav-search ui-input" role="search">
            <img src={searchIcon} alt="" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search Reddit"
              aria-label="Search Reddit"
            />
            {search && (
              <button onClick={handleClear} aria-label="Clear search">
                <img src={clearIcon} alt="" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="nav-actions" aria-label="User actions">
            <button className="nav-action nav-action--ghost" aria-label="Create a post">
              <i className="bi bi-plus-square" aria-hidden="true"></i>
              <span className="nav-action__label">Create</span>
            </button>
            <button className="nav-action" aria-label="Messages">
              <i className="bi bi-chat-dots" aria-hidden="true"></i>
            </button>
            <button className="nav-action" aria-label="Notifications">
              <i className="bi bi-bell" aria-hidden="true"></i>
            </button>
            <button className="nav-user" aria-label="User menu">
              <img src={personIcon} alt="" aria-hidden="true" className="nav-user__icon" />
              <span className="nav-user__name">Log In</span>
              <img src={arrowDownIcon} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
