import React from "react";

import bigLogo from "./assets/reddit_logo_horizontal_on_orangered.png";
import personIcon from "./assets/person_black_24dp.svg";
import arrowDownIcon from "./assets/keyboard_arrow_down_black_24dp.svg";
import searchIcon from "./assets/search_black_24dp.svg";
import clearIcon from "./assets/clear_black_24dp.svg";

import "./Navbar.css";

function navbar({
  search,
  handleSearch,
  handleOpenLoginForm,
  handleClear,
  dropdown,
  handleToggleDropdown,
}) {
  const userPanel = (
    <div className="user-panel flex center">
      <div className="authentication">
        <button id="login-button" class="button" onClick={handleOpenLoginForm}>
          Login In
        </button>
        <button id="signup-button" class="button">
          Sign Up
        </button>
      </div>
      <div className="profile">
        <div className="dropdown flex center" onClick={handleToggleDropdown}>
          <img src={personIcon} alt=""></img>
          <img src={arrowDownIcon} alt=""></img>
        </div>
        {dropdown && (
          <div className="dropdown-menu">
            <h3>VIEW OPTIONS</h3>
            <div class="item">
              <img alt="" width="20px" height="20px"></img>
              <span>Night Mode</span>
              <button>toggle</button>
            </div>
            <h3>MORE STUFF</h3>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="reddit">
          <a href="#" className="logo">
            <img src={bigLogo} alt="reddit logo " height="40px"></img>
          </a>
          <div
            className="search-bar"
            style={{ background: search ? "white" : "" }}
          >
            <img src={searchIcon} alt="search icon" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search Reddit"
            ></input>
            <img
              src={clearIcon}
              alt="clear icon"
              onClick={handleClear}
              style={{ opacity: search ? 1 : 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
