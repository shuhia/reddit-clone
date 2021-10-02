import React from "react";
import "./Comment.css";

function Comment({ comment }) {
  const { body, author, created_utc } = comment;
  const timeStamp = new Date(created_utc);
  const hour = timeStamp.getHours();
  return (
    <div class="comment">
      <div class="comment-header">
        <span class="comment-author">{author + " "}</span>
        <span class="comment-time-stamp">{hour} hours ago</span>
      </div>

      <div class="comment-body">{body}</div>
    </div>
  );
}

export default Comment;
