import React from "react";
import "./Post.css";

function Post(props) {
  const {
    likes = 100,
    author = "shuhia",
    linkSubbreddit = "#",
    timeStamp = "2 hours ago",
    handleJoin,
    handleLike,
    handleDislike,
  } = props;
  return (
    <div className="post-container">
      <div className="post flex white">
        <div class="container">
          <div className="rate">
            <div className="like">^</div>
            <div className="rating">{likes}</div>
            <div className="dislike">V</div>
          </div>
        </div>
        <div className="main">
          <div className="post-header flex">
            <img src="" width="20" height="20" />
            <a href="#">Link</a>
            <span>Posted by</span>
            <span class="username">{author}</span>
            <span class="time">{timeStamp}</span>
            <div className="join">
              <button onClick={handleJoin}>Join+</button>
            </div>
          </div>

          <div class="post-content">
            <h2 class="title">Title</h2>
            <p>Some text</p>
          </div>
          <div class="post-user-bar flex">
            <div class="comments">Comments</div>
            <div class="share">Share</div>
            <div class="save">save</div>
            <div class="options">...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
