import React, { useEffect, useState } from "react";
import "./TrendingPosts.css";
import { TrendingPost as Post } from "./TrendingPost";
import { getTrendingPosts } from "../api/reddit"; // Import the API function
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    arrows: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const dataToRender = posts.length ? posts : FALLBACK_TRENDING;

  return (
    <section className="trending-posts-container" aria-labelledby="trending-title">
      <div className="trending-header">
        <div>
          <p className="eyebrow">Happening now</p>
          <h3 id="trending-title">Trending on Reddit</h3>
        </div>
        <div className="chip">Live</div>
      </div>
      {isLoading ? (
        <div className="trending-skeleton-grid">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="trending-skeleton-card">
              <div className="trending-skeleton-img shimmer"></div>
              <div className="trending-skeleton-text shimmer"></div>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {dataToRender.map((post, index) => (
            <Post key={`trending-post-${index}`} post={post}></Post>
          ))}
        </Slider>
      )}
    </section>
  );
}

export default TrendingPosts;
