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

  async search(searchTerm, searchLimit, sortBy) {
    try {
      const res = await fetch(
        `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
      );
      const data = await res.json();
      return data.data.children.map((data_1) => data_1.data);
    } catch (err) {
      return console.log(err);
    }
  },
};

export default reddit;
