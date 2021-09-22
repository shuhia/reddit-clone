import clearIcon from "./clear_black_24dp.svg";

import "./App.css";

import Header from "../header/Header";
import Post from "../post/Post";

import { useState, useEffect } from "react";
import Filter from "../filter/Filter";
import TrendingPosts from "../trending/TrendingPosts";
import Sidebar from "../sidebar/Sidebar.js";
import reddit from "../api/reddit";

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

  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    const filterTerm = e.target.value;
    console.log(filterTerm);
    setFilter(filterTerm);
  };

  function createPost() {}

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return () => {};
  }, [search]);

  useEffect(() => {
    // Filter posts

    return () => {};
  }, [filter]);

  useEffect(() => {
    reddit.search(search, 5, filter).then((posts) => setPosts(posts));
    return () => {};
  }, [filter, search]);

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
      <TrendingPosts></TrendingPosts>
      <div
        className="main"
        style={{
          maxWidth: 1024,
          margin: "auto",
          display: "flex",
          padding: 20,
          gap: 20,
        }}
      >
        <div className="posts">
          <h4>Popular posts</h4>
          <Filter handleFilter={handleFilter}></Filter>
          {posts.map((post) => {
            const { author, title, url, ups, subreddit_name_prefixed } = post;

            console.log(post);
            return <Post {...post}></Post>;
          })}
          <Post></Post>
        </div>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}

export default App;
