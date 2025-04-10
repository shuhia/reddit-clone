import React, { useState, useEffect } from "react";
import "./Post.css";
import reddit from "../api/reddit";
import Comments from "../comments/Comments";

function Post({ post, onError }) {
  const {
    author = "shuhia",
    linkSubbreddit = "#",
    created_utc = "",
    title = "title",
    url = "#",
    ups: likes = 0,
    id,
    subreddit = "subbreddit",
    display_name_prefixed = "",
    permalink = "",
  } = post;

  const [userLike, setLike] = useState(0);
  const [comments, setComments] = useState(null);
  const [toggleComments, setToggleComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [mediaType, setMediaType] = useState('image');
  const [processedUrl, setProcessedUrl] = useState('');
  const [subredditIconError, setSubredditIconError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);
  const [authorAvatar, setAuthorAvatar] = useState('https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png');
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
  };

  const formattedTime = formatTimeAgo(created_utc);

  function handleSetLike(type) {
    if (userLike === 1 || userLike === -1) {
      setLike(0);
    } else {
      if (type === "like") {
        setLike(1);
      } else if (type === "dislike") {
        setLike(-1);
      }
    }
  }

  const showComments = async () => {
    if (comments) {
      setToggleComments((prev) => !prev);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedComments = await reddit.getPostComments(permalink);
      setComments(fetchedComments);
      setToggleComments(true);
    } catch (err) {
      setError("Failed to load comments");
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (e) => {
    console.log('Image error details:', {
      src: e.target.src,
      error: e,
      timestamp: new Date().toISOString()
    });
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', {
      src: processedUrl,
      timestamp: new Date().toISOString()
    });
    setImageLoading(false);
    setImageError(false);
  };

  const getMediaType = (url) => {
    if (!url) return 'none';
    
    try {
      // Handle Reddit video URLs
      if (url.includes('v.redd.it')) return 'video';
      
      // Handle Reddit image URLs
      if (url.includes('i.redd.it')) return 'image';
      
      // Handle external image URLs
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image';
      
      // Handle Reddit gallery URLs
      if (url.includes('reddit.com/gallery/')) return 'gallery';
      
      // Handle YouTube URLs
      if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
      
      // Handle external links
      if (url.startsWith('http')) return 'link';
      
      return 'none';
    } catch (error) {
      console.error('Error determining media type:', error);
      return 'link';
    }
  };

  const processUrl = (url) => {
    if (!url) return '';
    
    try {
      // If it's a Reddit video, return the permalink
      if (url.includes('v.redd.it')) {
        return `https://www.reddit.com${permalink}`;
      }
      
      // If it's a YouTube video, return the embed URL
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      
      // If it's a Reddit image, ensure it has https
      if (url.includes('i.redd.it')) {
        return url.startsWith('http') ? url : `https://${url}`;
      }
      
      // For external images, ensure it has https
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return url.startsWith('http') ? url : `https://${url}`;
      }
      
      // For external links, ensure it has https
      if (url.startsWith('http')) {
        return url;
      }
      
      // For other cases, return the permalink
      return `https://www.reddit.com${permalink}`;
    } catch (error) {
      console.error('Error processing URL:', error);
      return `https://www.reddit.com${permalink}`;
    }
  };

  const handleSubredditIconError = (e) => {
    setSubredditIconError(true);
    e.target.src = 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png';
  };

  const handleAuthorImageError = (e) => {
    setAuthorImageError(true);
    setIsAvatarLoading(false);
    e.target.src = 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png';
  };

  const handleAuthorImageLoad = () => {
    setIsAvatarLoading(false);
    setAuthorImageError(false);
  };

  const fetchAuthorAvatar = async () => {
    if (!author) {
      setIsAvatarLoading(false);
      return;
    }

    try {
      setIsAvatarLoading(true);
      const userInfo = await reddit.getUserInfo(author);
      if (userInfo && userInfo.data && userInfo.data.icon_img) {
        const avatarUrl = userInfo.data.icon_img.split('?')[0];
        setAuthorAvatar(avatarUrl);
      }
    } catch (error) {
      console.error('Error fetching author avatar:', error);
    } finally {
      setIsAvatarLoading(false);
    }
  };

  useEffect(() => {
    // Reset states when URL changes
    setImageLoading(true);
    setImageError(false);
    
    const type = getMediaType(url);
    setMediaType(type);
    setProcessedUrl(processUrl(url));
  }, [url, permalink]);

  useEffect(() => {
    if (author && author !== 'shuhia') {
      fetchAuthorAvatar();
    } else {
      setIsAvatarLoading(false);
      setAuthorImageError(true);
    }
  }, [author]);

  return (
    <div className="post-container" role="article">
      <div className="post white">
        <div className="post-rating-container">
          <div className="rating-container" role="group" aria-label="Post rating">
            <button 
              className="like-button" 
              onClick={() => handleSetLike("like")}
              aria-label="Upvote post"
              aria-pressed={userLike === 1}
            >
              <i className="bi bi-arrow-up-circle"></i>
            </button>
            <div className="likes-counter" aria-label={`${likes + userLike} points`}>
              {likes + userLike}
            </div>
            <button 
              className="dislike-button" 
              onClick={() => handleSetLike("dislike")}
              aria-label="Downvote post"
              aria-pressed={userLike === -1}
            >
              <i className="bi bi-arrow-down-circle"></i>
            </button>
          </div>
        </div>

        <div className="main">
          <div className="post-header">
            <div className="avatar-container">
              {isAvatarLoading && (
                <div className="avatar-loading">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <img 
                src={authorImageError ? 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png' : authorAvatar}
                width="20" 
                height="20" 
                alt={`${author}'s avatar`}
                onError={handleAuthorImageError}
                onLoad={handleAuthorImageLoad}
                className={`author-avatar ${isAvatarLoading ? 'hidden' : ''}`}
              />
            </div>
            <a href={linkSubbreddit} aria-label={`Go to ${subreddit} subreddit`}>
              {display_name_prefixed || `r/${subreddit}`}
            </a>
            <span>Posted by</span>
            <a href={`https://www.reddit.com/user/${author}`} className="username">
              {author}
            </a>
            <span className="time" title={new Date(created_utc * 1000).toLocaleString()}>
              {formattedTime}
            </span>
          </div>
          <a className="post-link" href={url} target="_blank" rel="noopener noreferrer">
            <div className="post-content">
              <h2 className="title">{title}</h2>
              {url && (
                <div className="post-media-container">
                  {imageLoading && mediaType === 'image' && (
                    <div className="image-loading">
                      <div className="loading-spinner"></div>
                      <p>Loading image...</p>
                    </div>
                  )}
                  {!imageError ? (
                    mediaType === 'video' || mediaType === 'link' ? (
                      <div className="video-container">
                        {mediaType === 'youtube' ? (
                          <iframe
                            src={processedUrl}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="youtube-embed"
                          ></iframe>
                        ) : (
                          <div className="link-preview">
                            <div className="link-content">
                              <h3 className="link-title">{title}</h3>
                              <p className="link-description">{url}</p>
                            </div>
                            <a 
                              href={processedUrl}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="view-on-reddit"
                            >
                              View Link
                            </a>
                          </div>
                        )}
                      </div>
                    ) : mediaType === 'image' ? (
                      <img
                        src={processedUrl}
                        alt={title}
                        className="post-content-media"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        loading="lazy"
                      />
                    ) : (
                      <div className="video-container">
                        <p>Content available on Reddit</p>
                        <a 
                          href={processedUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-on-reddit"
                        >
                          View on Reddit
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="image-error">
                      <p>Content failed to load</p>
                      <p className="error-details">Type: {mediaType}</p>
                      <a 
                        href={processedUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-on-reddit"
                      >
                        View on Reddit
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </a>
          <div className="post-user-bar">
            <button 
              className="comments post-user-bar-item" 
              onClick={showComments}
              aria-expanded={toggleComments}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Comments"}
            </button>
            <button className="share post-user-bar-item" aria-label="Share post">
              Share
            </button>
            <button className="save post-user-bar-item" aria-label="Save post">
              Save
            </button>
            <button className="options post-user-bar-item" aria-label="More options">
              ...
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      {comments && toggleComments && <Comments comments={comments} />}
    </div>
  );
}

export default Post;

