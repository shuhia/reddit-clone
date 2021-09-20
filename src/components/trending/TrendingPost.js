import React from "react";
import "./TrendingPost.css";

function TrendingPost(props) {
  const { post } = props;
  const {
    backgroundUrl = "https://preview.redd.it/xwt5kmrlrdo71.jpg?auto=webp&s=bba3d318a958b2b7a20a48f9fd8f6e397ff56ad5",
  } = post;

  return (
    <div
      className="trending-post"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${backgroundUrl})`,
      }}
    >
      <a className="trending-post-link" href="#">
        <div className="trending-post-content">
          <h1 className="trending-post-content-title">Artwork</h1>
          <div>Sktchy #6, me, digital, 2021</div>
          <div>r/Art and more</div>
        </div>
      </a>
    </div>
  );
}

export { TrendingPost };
