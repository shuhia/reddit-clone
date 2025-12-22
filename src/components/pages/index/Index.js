import "./index.css";

import Post from "../../post/Post";
import { useState } from "react";
import TrendingPosts from "../../trending/TrendingPosts";
import Sidebar from "../../sidebar/Sidebar.js";
import Filters from "../../filters/Filters";

function Index(props) {
  const { posts = [], subReddits, handleSidebarClick } = props;
  const [filter, setFilter] = useState("hot");

  const handleFilter = (e) => {
    const filterTerm = e.target.value;
    setFilter(filterTerm);
  };

  return (
    <div className="page">
      <div className="page-inner">
        <TrendingPosts></TrendingPosts>
        <div className="main" id="main-content">
          <div className="posts">
            <div className="feed-header">
              <div>
                <p className="feed-eyebrow">Your personal Reddit frontpage</p>
                <h4 className="feed-title">Home</h4>
              </div>
              <Filters handleFilter={handleFilter} activeFilter={filter}></Filters>
            </div>
            <div className="post-stack">
              {posts.map((post) => {
                return <Post key={post.id || post.title} post={post}></Post>;
              })}
            </div>
          </div>
          <Sidebar
            subReddits={subReddits}
            handleSidebarClick={handleSidebarClick}
          ></Sidebar>
        </div>
      </div>
    </div>
  );
}

export default Index;
