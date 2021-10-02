import React from "react";

export const API_ROOT = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}/.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};

export async function search(searchTerm, searchLimit, sortBy) {
  try {
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    );
    const data = await res.json();
    return data.data.children.map((data_1) => data_1.data);
  } catch (err) {
    return console.log(err);
  }
}

const reddit = {
  search,
  getSubredditPosts,
  getSubreddits,
  getPostComments,
};

export default reddit;
