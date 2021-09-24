import React from "react";
import "./Sidebar.css";

function Sidebar(props) {
  const { subReddits = [], handleSidebarClick } = props;
  console.log(subReddits);
  return (
    <div className="sidebar-container">
      {subReddits.map((subreddit) => (
        <div
          className="sidebar-item"
          value={subreddit}
          onClick={() => handleSidebarClick(subreddit)}
        >
          <a href="#">{subreddit.url}</a>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
