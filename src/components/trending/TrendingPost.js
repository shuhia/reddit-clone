import React from "react";
import "./TrendingPost.css";

function TrendingPost({ post }) {
  const {
    backgroundUrl = "https://preview.redd.it/xwt5kmrlrdo71.jpg?auto=webp&s=bba3d318a958b2b7a20a48f9fd8f6e397ff56ad5",
    title = "Trending Post",
    subreddit = "r/unknown",
  } = post;

  return (
    <article className="trending-post">
      <a
        className="trending-post-link"
        href={`https://www.reddit.com/r/${subreddit}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title}`}
      >
        <div
          className="trending-post-hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.6)), url(${backgroundUrl})`,
          }}
        >
          <span className="ui-chip neutral">r/{subreddit}</span>
        </div>
        <div className="trending-post-details">
          <h4 className="trending-post-title">{title}</h4>
          <p className="trending-post-meta">Tap to jump into the conversation →</p>
        </div>
      </a>
    </article>
  );
}

export { TrendingPost };
