import React from "react";
import Comment from "./comment/Comment";
import "./Comments.css";

function Comments({ comments, onError }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="comments-empty" role="status">
        No comments yet
      </div>
    );
  }

  return (
    <div className="comments" role="region" aria-label="Comments section">
      {comments.map((comment, index) => (
        <Comment 
          key={comment.id || index} 
          comment={comment} 
          onError={onError}
        />
      ))}
    </div>
  );
}

export default Comments;
