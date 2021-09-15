import logo from "./logo.svg";
import bigLogo from "./reddit_logo_horizontal_on_orangered.png";
import personIcon from "./person_black_24dp.svg";
import arrowDownIcon from "./keyboard_arrow_down_black_24dp.svg";
import searchIcon from "./search_black_24dp.svg";
import clearIcon from "./clear_black_24dp.svg";
import "./App.css";

import { useState } from "react";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="navigation">
          <div className="reddit">
            <div className="logo">
              <img src={bigLogo} alt="reddit logo " height="40px"></img>
            </div>
            <div className="search-bar">
              <img src={searchIcon} alt="search icon" />
              <input></input>
              <img src={clearIcon} alt="clear icon" />
            </div>
          </div>
          <div className="user-panel flex center">
            <div className="authentication">
              <button id="login-button" class="button">
                Login In
              </button>
              <button id="signup-button" class="button">
                Sign Up
              </button>
            </div>
            <div className="profile">
              <div
                className="dropdown-menu flex center"
                onClick={() => console.log("open dropdown")}
              >
                <img src={personIcon} alt=""></img>
                <img src={arrowDownIcon} alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
