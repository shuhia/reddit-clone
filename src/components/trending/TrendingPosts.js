import React from "react";
import "./TrendingPosts.css";
import { TrendingPost as Post } from "./TrendingPost";

function TrendingPosts(props) {
  const {
    posts = [
      {
        backgroundUrl:
          "https://preview.redd.it/xwt5kmrlrdo71.jpg?auto=webp&s=bba3d318a958b2b7a20a48f9fd8f6e397ff56ad5",
      },
      {
        backgroundUrl:
          "https://external-preview.redd.it/zUgdgae59xAkkK8dTh9JoIGScU5qBP3QhLZ-XqBHNE0.png?format=pjpg&auto=webp&s=5569b39f12f2efeccc54d44a8820ff048206bb7d",
      },
      {
        backgroundUrl:
          "https://external-preview.redd.it/y6dQCSRlMVi05LxnQro8Wp4zxNniR1MEpVJ24gZDCnY.jpg?auto=webp&s=a24742935172db4bc904417b4f1349fe8bde1d37",
      },
      {
        backgroundUrl:
          "https://preview.redd.it/96litd38nbo71.gif?format=png8&s=aa74900e7db83fc20d4a1c1a0441bfafa6b7eedf",
      },
    ],
  } = props;

  return (
    <div className="trending-posts-container">
      <h3>Popular posts</h3>
      <div className="trending-posts">
        {posts.map((post) => (
          <Post post={post}></Post>
        ))}
      </div>
    </div>
  );
}

export default TrendingPosts;
