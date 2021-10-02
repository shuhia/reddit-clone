import reddit from "./reddit";

const { search, getSubredditPosts, getSubreddits, getPostComments } = reddit;

test("fetches subreddits", () => {
  const subreddits = getSubreddits();

  console.log(subreddits);
});
