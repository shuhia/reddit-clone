import React from "react";
import Comment from "./comment/Comment";
import "Comments.css";

function Comments(props) {
  const { comments } = props;

  return (
    <div className="comments">
      <Comment></Comment>
    </div>
  );
}

export default Comments;
