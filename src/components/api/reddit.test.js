import { render, screen } from "@testing-library/react";
import { getPostComments, getSubreddits, getSubredditPosts } from "./reddit";

test("fetches subreddits", () => {
  const subreddits = getSubreddits();

  console.log(subreddits);
});
