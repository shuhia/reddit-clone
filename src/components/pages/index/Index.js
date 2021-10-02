import clearIcon from "./clear_black_24dp.svg";

import "./index.css";

import Post from "../../post/Post";

import { useState, useEffect } from "react";
import TrendingPosts from "../../trending/TrendingPosts";
import Sidebar from "../../sidebar/Sidebar.js";
import reddit from "../../api/reddit";
import Filters from "../../filters/Filters";
import Navbar from "../../navbar/Navbar";

function Index(props) {
  const { posts = [], subReddits, handleSidebarClick } = props;
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    const filterTerm = e.target.value;
    console.log(filterTerm);
    setFilter(filterTerm);
  };

  return (
    <div class="page">
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
          <Filters handleFilter={handleFilter}></Filters>
          {posts.map((post) => {
            return <Post post={post}></Post>;
          })}
        </div>
        <Sidebar
          subReddits={subReddits}
          handleSidebarClick={handleSidebarClick}
        ></Sidebar>
      </div>
    </div>
  );
}

export default Index;
