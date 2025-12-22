import React from "react";
import "./Sidebar.css";

function Sidebar(props) {
  const { subReddits = [], handleSidebarClick } = props;
  return (
    <div className="sidebar-container" aria-label="Communities">
      <div className="sidebar-card">
        <div className="sidebar-card__header">
          <h5>Top Communities</h5>
          <span className="sidebar-card__subtitle">Trending this week</span>
        </div>
        <div className="sidebar-list">
          {subReddits.map((subreddit, index) => (
            <button
              key={subreddit.id || subreddit.url}
              className="sidebar-item"
              value={subreddit}
              onClick={() => handleSidebarClick(subreddit)}
            >
              <div className="sidebar-item__rank">#{index + 1}</div>
              <div className="sidebar-item__meta">
                <span className="sidebar-item__name">
                  {subreddit.display_name_prefixed || subreddit.url}
                </span>
                <span className="sidebar-item__members">
                  {subreddit.subscribers?.toLocaleString() || "New community"}
                </span>
              </div>
              <span className="sidebar-item__chip">Join</span>
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="sidebar-footer__cta">Create Post</button>
          <button className="sidebar-footer__ghost">Create Community</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
