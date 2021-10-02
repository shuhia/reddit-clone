import React from "react";
import "./Post.css";
import { useState } from "react";
import reddit from "../api/reddit";
import Comments from "../comments/Comments";

function Post(props) {
  const {
    author = "shuhia",
    linkSubbreddit = "#",
    created_utc = "",
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
    id,
    subreddit = "subbreddit",
    display_name_prefixed = "",
    permalink = "",
  } = props.post;

  const [userLike, setLike] = useState(0);
  const [comments, setComments] = useState(null);
  const [toggleComments, setToggleComments] = useState(false);
  const hours = new Date(created_utc).getUTCHours();

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

  const showComments = () => {
    if (comments) {
    } else {
      // Fetch comments
      console.log("fetching posts");
      reddit
        .getPostComments(permalink)
        .then((comments) => setComments(comments))
        .catch((error) => console.log(error));
    }
    setToggleComments((prev) => !prev);
  };

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
            <a href={subreddit}>{subreddit}</a>
            <span>Posted by</span>
            <span class="username">{author}</span>
            <span class="time">{hours}</span>
          </div>
          <a className="post-link" href="#">
            <div class="post-content">
              <h2 class="title">{title}</h2>
              <p>Some text</p>
              {url && <img class="post-content-media" src={url} alt=""></img>}
            </div>
          </a>
          <div class="post-user-bar flex">
            <button class="comments post-user-bar-item" onClick={showComments}>
              Comments
            </button>
            <button class="share post-user-bar-item">Share</button>
            <button class="save post-user-bar-item">save</button>
            <select class="options post-user-bar-item">
              <option value="...">...</option>
            </select>
          </div>
        </div>
      </div>
      {comments && toggleComments && <Comments comments={comments}></Comments>}
    </div>
  );
}

export default Post;
