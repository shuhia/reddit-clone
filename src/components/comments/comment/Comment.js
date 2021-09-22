import React from "react";
import "Comment.css";

function Comment(props) {
  const { comment = {} } = props;
  return <div class="comment"></div>;
}

export default Comment;
