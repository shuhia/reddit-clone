import logo from "./logo.svg";
import bigLogo from "./reddit_logo_horizontal_on_orangered.png";
import personIcon from "./person_black_24dp.svg";
import arrowDownIcon from "./keyboard_arrow_down_black_24dp.svg";
import searchIcon from "./search_black_24dp.svg";
import clearIcon from "./clear_black_24dp.svg";
import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [popup, setPopup] = useState([]);

  const handleSearch = (e) => {
    console.log(e.target.value);
    const search = e.target.value;
    setSearch(search);
  };

  const handleClear = (e) => {
    setSearch("");
  };

  const handleToggleDropdown = (e) => {
    setDropdown((prev) => !prev);
  };

  const handleLogin = (e) => {
    console.log("login");
  };

  const handleClosePopup = (e) => {
    console.log("close popup");
    setPopup([]);
  };

  const handleOpenLoginForm = (e) => {
    const loginForm = (
      <div className="popup">
        <div
          class="popup-background"
          style={{
            opacity: 0.5,
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            backgroundColor: "grey",
          }}
        ></div>
        <div
          class="popup-window"
          style={{
            position: "fixed",
            height: "50%",
            width: "50%",
            backgroundColor: "grey",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1000,
          }}
        >
          <form id="login" onSubmit={handleLogin}>
            <h1>Login</h1>
          </form>
          <div onClick={handleClosePopup}>
            <img
              src={clearIcon}
              alt=""
              style={{
                position: "fixed",
                right: 0,
                top: 0,
                transform: "translate(-50%,50%)",
              }}
            ></img>
          </div>
        </div>
      </div>
    );
    setPopup(loginForm);
  };

  useEffect(() => {
    return () => {};
  }, [search]);

  return (
    <div className="App">
      {popup}
      <div className="header">
        <div className="navigation">
          <div className="reddit">
            <div className="logo">
              <img src={bigLogo} alt="reddit logo " height="40px"></img>
            </div>
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
          <div className="user-panel flex center">
            <div className="authentication">
              <button
                id="login-button"
                class="button"
                onClick={handleOpenLoginForm}
              >
                Login In
              </button>
              <button id="signup-button" class="button">
                Sign Up
              </button>
            </div>
            <div className="profile">
              <div
                className="dropdown flex center"
                onClick={handleToggleDropdown}
              >
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
        </div>
      </div>
    </div>
  );
}

export default App;
