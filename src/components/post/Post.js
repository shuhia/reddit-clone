import React from "react";
import "./Post.css";
import { useState } from "react";

function Post(props) {
  const {
    author = "shuhia",
    linkSubbreddit = "#",
    timeStamp = "2 hours ago",
    handleJoin,
    handleLike = () => {
      handleSetLike("like");
    },
    handleDislike = () => {
      handleSetLike("dislike");
    },
    title = "title",
    url = "#",
    ups: likes = 0,
    subreddit_name_prefixed: subbredditNamePrefixed,
  } = props;

  const [rating, setRating] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userLike, setLike] = useState(0);

  function handleSetLike(type) {
    if (userLike === 1 || userLike === -1) {
      setLike(0);
    } else {
      if (type === "like") {
        setLike(1);
      } else if (type === "dislike") {
        setLike(-1);
      }
    }
  }

  return (
    <div className="post-container">
      <div className="post white">
        <div class="post-rating-container">
          <div className="rating-container">
            <div className="like-button" onClick={handleLike}>
              <i class="bi bi-arrow-up-circle"></i>
            </div>
            <div className="likes-counter">{likes + userLike}</div>
            <div className="dislike-button" onClick={handleDislike}>
              <i class="bi bi-arrow-down-circle"></i>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="post-header flex">
            <img src="" width="20" height="20" />
            <a href={subbredditNamePrefixed}>{subbredditNamePrefixed}</a>
            <span>Posted by</span>
            <span class="username">{author}</span>
            <span class="time">{timeStamp}</span>
            <div className="join">
              <button onClick={handleJoin}>Join+</button>
            </div>
          </div>
          <a className="post-link" href="#">
            <div class="post-content">
              <h2 class="title">{title}</h2>
              <p>Some text</p>
              {url && <img class="post-content-media" src={url} alt=""></img>}
            </div>
          </a>
          <div class="post-user-bar flex">
            <button class="comments post-user-bar-item">Comments</button>
            <button class="share post-user-bar-item">Share</button>
            <button class="save post-user-bar-item">save</button>
            <select class="options post-user-bar-item">
              <option value="...">...</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
