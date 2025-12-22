import { useState, useEffect } from "react";

import reddit from "../api/reddit";

import Navbar from "../navbar/Navbar";
import Index from "../pages/index/Index";
import { getSubreddits, getSubredditPosts } from "../api/reddit";

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("hot");
  const [posts, setPosts] = useState([]);
  const [subReddits, setSubreddits] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSidebarClick = (subReddit) => {
    getSubredditPosts(subReddit.url)
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  };

  useEffect(() => {
    reddit
      .search(search, 5, filter)
      .then((fetchedPosts) => setPosts(fetchedPosts))
      .catch(() => setPosts([]));
  }, [filter, search]);

  useEffect(() => {
    getSubreddits().then((data) => {
      setSubreddits(data);
    });
  }, []);

  const navbarProps = {
    search,
    handleSearch,
    handleClear: () => setSearch(""),
  };

  return (
    <div className="ui-shell">
      <Navbar {...navbarProps} />
      <Index
        posts={posts}
        subReddits={subReddits}
        onSidebarClick={handleSidebarClick}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}

export default App;
