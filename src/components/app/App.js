import clearIcon from "./clear_black_24dp.svg";

import "./App.css";

import Header from "../header/Header";

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

  const handleAppClick = (e) => {
    console.log("app click");
  };

  useEffect(() => {
    return () => {};
  }, [search]);

  const headerProps = {
    search,
    handleSearch,
    handleOpenLoginForm,
    handleClear,
    dropdown,
    handleToggleDropdown,
  };

  return (
    <div className="App" onClick={handleAppClick}>
      {popup}
      <Header {...headerProps}></Header>
      <div className="posts">
        <h1>Popular posts</h1>
        <div className="filters flex white">
          <div className="filter">
            <img src="" alt=""></img>
            <button>Hot</button>
          </div>
          <div className="filter">
            <img src="" alt=""></img>
            <button>Sweden</button>
          </div>
          <div className="filter">
            <img src="" alt=""></img>
            <button>New</button>
          </div>
          <div className="filter">
            <img src="" alt=""></img>
            <button>Top</button>
          </div>

          <div className="filter">
            <img src="" alt=""></img>
            <button>...</button>
          </div>
        </div>
        <div className="post flex white">
          <div className="rate">
            <div className="like">^</div>
            <div className="rating">123</div>
            <div className="dislike">V</div>
          </div>
          <div className="content">
            <div className="header">
              <div className="author"></div>
              <div className="join">
                <button>Join</button>
              </div>
            </div>
            <h1></h1>
            <p></p>
            <footer></footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
