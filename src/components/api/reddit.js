import React from "react";

function reddit() {
  async function fetchPosts() {
    // Posts object
    const url = "";
    const header = {};
    const options = { header };
    const data = await fetch(url, options);
    const jsonData = data.json();
    const post = {};
    return post;
  }

  async function fetchTrendingPosts() {}

  async function fetchSearch() {}
}

export default reddit;
