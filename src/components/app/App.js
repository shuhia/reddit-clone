import clearIcon from "./clear_black_24dp.svg";

import "./App.css";

import { useState, useEffect } from "react";

import reddit from "../api/reddit";

import Navbar from "../navbar/Navbar";
import Index from "../pages/index/Index";
import PostPage from "../pages/postPage/PostPage";
import SubReddit from "../pages/subreddit/SubReddit";
import { getSubreddits, getSubredditPosts } from "../api/reddit";
import { useGetPostQuery } from "../../features/reddit/redditApi";

function App() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [popup, setPopup] = useState([]);
  const [subReddits, setSubreddits] = useState([]);

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

  const handleSidebarClick = (subReddit) => {
    getSubredditPosts(subReddit.url).then((data) => setPosts(data));
  };

  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    const filterTerm = e.target.value;
    console.log(filterTerm);
    setFilter(filterTerm);
  };

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

  useEffect(() => {
    getSubreddits().then((data) => {
      setSubreddits(data);
      console.log(data);
    });
  }, []);

  const navbarProps = {
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
      <Navbar {...navbarProps}></Navbar>
      <Index
        posts={posts}
        subReddits={subReddits}
        setSubReddits={setSubreddits}
        handleSidebarClick={handleSidebarClick}
      ></Index>
      <SubReddit></SubReddit>
      <PostPage></PostPage>
    </div>
  );
}

export default App;
