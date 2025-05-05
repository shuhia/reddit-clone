export const BASE_URI = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${BASE_URI}${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${BASE_URI}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${BASE_URI}${permalink}/.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};

export const getUserInfo = async (username) => {
  try {
    const response = await fetch(`${BASE_URI}/user/${username}/about.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export async function search(searchTerm, searchLimit, sortBy) {
  try {
    const res = await fetch(
      `${BASE_URI}/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    );
    const data = await res.json();
    return data.data.children.map((data_1) => data_1.data);
  } catch (err) {
    return console.log(err);
  }
}

export const getTrendingPosts = async () => {
  try {
    const response = await fetch(`${BASE_URI}/r/popular.json?limit=16`);
    const json = await response.json();
    return json.data.children.map((post) => ({
      backgroundUrl: post.data.thumbnail || "",
      title: post.data.title,
      subreddit: post.data.subreddit,
    }));
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    return [];
  }
};

const reddit = {
  search,
  getSubredditPosts,
  getSubreddits,
  getPostComments,
  getUserInfo,
  getTrendingPosts,
};

export default reddit;
