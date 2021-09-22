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
      <a className="post-link" href="#">
        <div className="post flex white">
          <div class="container">
            <div className="rate">
              <div className="like-button" onClick={handleLike}>
                Like
              </div>
              <div className="rating">{likes + userLike}</div>
              <div className="dislike-button" onClick={handleDislike}>
                Dislike
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

            <div class="post-content">
              <h2 class="title">{title}</h2>
              <p>Some text</p>
              {url && <img class="post-content-media" src={url} alt=""></img>}
            </div>
            <div class="post-user-bar flex">
              <div class="comments">Comments</div>
              <div class="share">Share</div>
              <div class="save">save</div>
              <div class="options">...</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Post;
