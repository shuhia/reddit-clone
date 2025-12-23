import React, { useEffect, useState } from "react";
import "./TrendingPosts.css";
import { getTrendingPosts } from "../api/reddit";

const FALLBACK_TRENDING = [
  {
    backgroundUrl:
      "https://styles.redditmedia.com/t5_2qh33/styles/communityIcon_a8qzmm0lnb2b1.png",
    title: "r/AskReddit • What’s something that feels illegal but isn’t?",
    subreddit: "AskReddit",
  },
  {
    backgroundUrl:
      "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_1crpqqhqg5y41.png",
    title: "r/mildlyinteresting • Perfectly split sunset sky",
    subreddit: "mildlyinteresting",
  },
  {
    backgroundUrl:
      "https://styles.redditmedia.com/t5_2qh13/styles/communityIcon_v90b2yuw9w861.png",
    title: "r/aww • Dog refuses to leave the beach",
    subreddit: "aww",
  },
  {
    backgroundUrl:
      "https://styles.redditmedia.com/t5_2qh6g/styles/communityIcon_xslzkz0d23s61.png",
    title: "r/technology • EU sets new right-to-repair rules",
    subreddit: "technology",
  },
];

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setIsLoading(true);
        const trendingPosts = await getTrendingPosts();
        if (Array.isArray(trendingPosts) && trendingPosts.length) {
          setPosts(trendingPosts);
        } else {
          setPosts(FALLBACK_TRENDING);
        }
      } catch (error) {
        setPosts(FALLBACK_TRENDING);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  const dataToRender = posts.length ? posts : FALLBACK_TRENDING;

  return (
    <section className="trending ui-panel" aria-labelledby="trending-title">
      <div className="trending-header">
        <div>
          <p className="ui-subtle">Happening now</p>
          <h3 id="trending-title" className="trending-title">
            Trending today
          </h3>
        </div>
        <div className="ui-chip">Live</div>
      </div>
      {isLoading ? (
        <div className="trending-skeleton-grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="trending-skeleton-card ui-card tight">
              <div className="ui-skeleton trending-skeleton-img"></div>
              <div className="ui-skeleton trending-skeleton-text"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="trending-grid">
          {dataToRender.map((post, index) => (
            <article className="trending-card" key={`trending-post-${index}`}>
              <div
                className="trending-thumb"
                style={{ backgroundImage: `url(${post.backgroundUrl})` }}
                aria-hidden="true"
              ></div>
              <div className="trending-meta">
                <p className="trending-sub">r/{post.subreddit}</p>
                <h4 className="trending-title">{post.title}</h4>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingPosts;
