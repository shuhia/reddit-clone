import React, { useEffect, useState } from "react";
import "./TrendingPosts.css";
import { TrendingPost as Post } from "./TrendingPost";
import { getTrendingPosts } from "../api/reddit"; // Import the API function
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TrendingPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const trendingPosts = await getTrendingPosts();
      setPosts(trendingPosts);
    };

    fetchTrendingPosts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

  return (
    <section className="trending-posts-container" aria-labelledby="trending-title">
      <div className="trending-header">
        <div>
          <p className="eyebrow">Happening now</p>
          <h3 id="trending-title">Trending on Reddit</h3>
        </div>
        <div className="chip">Live</div>
      </div>
      <Slider {...settings}>
        {posts.map((post, index) => (
          <Post key={`trending-post-${index}`} post={post}></Post>
        ))}
      </Slider>
    </section>
  );
}

export default TrendingPosts;
