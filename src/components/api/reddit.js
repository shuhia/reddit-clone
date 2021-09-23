import React from "react";

const reddit = {
  async fetchPosts() {
    // Posts object
    const url = "";
    const header = {};
    const options = { header };
    const data = await fetch(url, options);
    const jsonData = data.json();
    const post = {};
    return post;
  },

  search(searchTerm, searchLimit, sortBy) {
    return fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data.data.children.map((data) => data.data);
      })
      .catch((err) => console.log(err));
  },
};

export default reddit;
