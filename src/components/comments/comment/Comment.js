import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./Comment.css";

function Comment({ comment }) {
  const { body, author, created_utc } = comment;
  const timestamp = created_utc ? new Date(created_utc * 1000) : new Date();
  const readableTime = formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">u/{author}</span>
        <span className="comment-time-stamp">{readableTime}</span>
      </div>
      <div className="comment-body">{body}</div>
    </div>
  );
}

export default Comment;
