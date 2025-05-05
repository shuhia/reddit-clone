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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    swipe: false,
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
    <div className="trending-posts-container">
      <h3>Trending posts</h3>
      <Slider {...settings}>
        {posts.map((post, index) => (
          <Post key={`trending-post-${index}`} post={post}></Post>
        ))}
      </Slider>
    </div>
  );
}

export default TrendingPosts;
