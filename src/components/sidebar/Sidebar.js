import React from "react";
import "./Sidebar.css";

function Sidebar({ subReddits = [], onSidebarClick }) {
  return (
    <aside className="ui-floating sidebar" aria-label="Communities">
      <div className="ui-panel sidebar-card">
        <div className="sidebar-card__header">
          <div>
            <p className="ui-subtle">Communities</p>
            <h5 className="sidebar-title">Top this week</h5>
          </div>
          <span className="ui-chip neutral">Live</span>
        </div>
        <div className="sidebar-list">
          {subReddits.map((subreddit, index) => (
            <button
              key={subreddit.id || subreddit.url}
              className="sidebar-item"
              onClick={() => onSidebarClick?.(subreddit)}
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
          <button className="ui-button primary">Create Post</button>
          <button className="ui-button ghost">Create Community</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
