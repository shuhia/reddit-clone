export const BASE_URI = "https://www.reddit.com";

const appendQueryParam = (url, param) =>
  url.includes("?") ? `${url}&${param}` : `${url}?${param}`;

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    credentials: "omit",
  });

  if (!response.ok) {
    throw new Error(`Reddit request failed (${response.status})`);
  }

  return response.json();
};

const fetchJsonp = (url) =>
  new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("JSONP requests require a browser environment"));
      return;
    }

    const callbackName = `redditJsonp_${Date.now()}_${Math.random()
      .toString(16)
      .slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (data) => {
      resolve(data);
      cleanup();
    };

    script.onerror = () => {
      reject(new Error("Unable to reach Reddit. Please check your connection and try again."));
      cleanup();
    };

    script.src = appendQueryParam(url, `jsonp=${callbackName}`);
    document.body.appendChild(script);
  });

const getRedditJson = async (path) => {
  const urlWithRawJson = appendQueryParam(`${BASE_URI}${path}`, "raw_json=1");
  try {
    return await fetchJson(urlWithRawJson);
  } catch (error) {
    return fetchJsonp(urlWithRawJson);
  }
};

export const getSubredditPosts = async (subreddit) => {
  const json = await getRedditJson(`${subreddit}.json`);
  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const json = await getRedditJson(`/subreddits.json`);
  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const json = await getRedditJson(`${permalink}/.json`);
  return json[1].data.children.map((subreddit) => subreddit.data);
};

export const getUserInfo = async (username) => {
  try {
    const json = await getRedditJson(`/user/${username}/about.json`);
    return json;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export async function search(searchTerm, searchLimit, sortBy) {
  try {
    const encodedTerm = encodeURIComponent(searchTerm || "trending");
    const path = `/search.json?q=${encodedTerm}&sort=${sortBy || "hot"}&limit=${searchLimit || 10}`;
    const data = await getRedditJson(path);
    return data.data.children.map((data_1) => data_1.data);
  } catch (err) {
    console.error("Error searching posts:", err);
    return [];
  }
}

export const getTrendingPosts = async () => {
  try {
    const json = await getRedditJson(`/r/popular.json?limit=16`);
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
