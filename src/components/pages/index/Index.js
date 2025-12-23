import "./index.css";

import Post from "../../post/Post";
import TrendingPosts from "../../trending/TrendingPosts";
import Sidebar from "../../sidebar/Sidebar.js";
import Filters from "../../filters/Filters";

function Index({ posts = [], subReddits = [], onSidebarClick, activeFilter, onFilterChange }) {
  const hasPosts = posts && posts.length > 0;

  return (
    <main className="page-shell" id="main-content">
      <div className="ui-container ui-stack">
        <TrendingPosts />
        <div className="ui-row two-columns">
          <section aria-label="Home feed" className="feed">
            <div className="ui-card tight feed-header">
              <div>
                <p className="ui-subtle">Your personal Reddit frontpage</p>
                <h4 className="ui-title">Home</h4>
              </div>
              <Filters activeFilter={activeFilter} onFilterChange={onFilterChange} />
            </div>
            <div className="ui-stack">
              {hasPosts ? (
                posts.map((post) => <Post key={post.id || post.title} post={post} />)
              ) : (
                <>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div className="ui-card tight post-skeleton-card" key={`skeleton-${idx}`}>
                      <div className="post-skeleton-vote ui-skeleton"></div>
                      <div className="post-skeleton-body">
                        <div className="ui-skeleton line title"></div>
                        <div className="ui-skeleton line"></div>
                        <div className="ui-skeleton line"></div>
                        <div className="ui-skeleton line footer"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
          <Sidebar subReddits={subReddits} onSidebarClick={onSidebarClick} />
        </div>
      </div>
    </main>
  );
}

export default Index;
