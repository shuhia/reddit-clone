import React from "react";
import "./TrendingPost.css";

function TrendingPost(props) {
  const { post } = props;
  const {
    backgroundUrl = "https://preview.redd.it/xwt5kmrlrdo71.jpg?auto=webp&s=bba3d318a958b2b7a20a48f9fd8f6e397ff56ad5",
    title = "Trending Post",
    subreddit = "r/unknown",
  } = post;

  return (
    <div className="trending-post">
      <a
        className="trending-post-link"
        href={`https://www.reddit.com/r/${subreddit}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="trending-post-image"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        ></div>
        <div className="trending-post-details">
          <h4 className="trending-post-title">{title}</h4>
          <p className="trending-post-subreddit">{subreddit}</p>
        </div>
      </a>
    </div>
  );
}

export { TrendingPost };
