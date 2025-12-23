import React, { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
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
    subreddit = "subbreddit",
    display_name_prefixed = "",
    permalink = "",
  } = post;
  const communityUrl = linkSubbreddit || `https://www.reddit.com/r/${subreddit}`;

  const [userLike, setLike] = useState(0);
  const [comments, setComments] = useState(null);
  const [toggleComments, setToggleComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [mediaType, setMediaType] = useState("image");
  const [processedUrl, setProcessedUrl] = useState("");
  const [authorImageError, setAuthorImageError] = useState(false);
  const [authorAvatar, setAuthorAvatar] = useState("https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png");
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);

  const formattedTime = created_utc
    ? formatDistanceToNow(new Date(created_utc * 1000), { addSuffix: true })
    : "just now";

  const handleSetLike = (type) => {
    if (userLike === (type === "like" ? 1 : -1)) {
      setLike(0);
      return;
    }
    setLike(type === "like" ? 1 : -1);
  };

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

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const isLikelyImage = (candidate) => {
    if (!candidate) return false;
    const trimmed = candidate.split("?")[0].toLowerCase();
    const hasExtension = /\.(jpg|jpeg|png|gif|webp|bmp|jfif)$/i.test(trimmed);
    const isRedditImageHost =
      trimmed.includes("i.redd.it") ||
      trimmed.includes("preview.redd.it") ||
      (trimmed.includes("redd.it") && !trimmed.includes("v.redd.it"));
    return hasExtension || isRedditImageHost;
  };

  const getMediaType = useCallback(
    (candidate) => {
      if (!candidate) return "none";
      const normalized = candidate.toLowerCase();
      if (normalized.includes("reddit.com/gallery/")) return "gallery";
      if (normalized.includes("v.redd.it")) return "video";
      if (normalized.includes("youtube.com") || normalized.includes("youtu.be")) return "youtube";
      if (isLikelyImage(normalized)) return "image";
      if (candidate.startsWith("http")) return "link";
      return "none";
    },
    []
  );

  const processUrl = useCallback(
    (candidate) => {
      if (!candidate) return "";
      if (candidate.endsWith(".gifv")) {
        return candidate.replace(".gifv", ".mp4");
      }
      if (candidate.includes("youtube.com") || candidate.includes("youtu.be")) {
        const videoId = candidate.match(
          /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/
        )?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : candidate;
      }
      if (candidate.startsWith("//")) {
        return `https:${candidate}`;
      }
      if (candidate.startsWith("http")) return candidate;
      return `https://www.reddit.com${permalink}`;
    },
    [permalink]
  );

  const handleAuthorImageError = (e) => {
    setAuthorImageError(true);
    setIsAvatarLoading(false);
    e.target.src = "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png";
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
        const avatarUrl = userInfo.data.icon_img.split("?")[0];
        setAuthorAvatar(avatarUrl);
      }
    } catch (fetchError) {
      onError?.(fetchError);
    } finally {
      setIsAvatarLoading(false);
    }
  };

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    const type = getMediaType(url);
    setMediaType(type);
    setProcessedUrl(processUrl(url));
  }, [getMediaType, processUrl, url, permalink]);

  useEffect(() => {
    if (author && author !== "shuhia") {
      fetchAuthorAvatar();
    } else {
      setIsAvatarLoading(false);
      setAuthorImageError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  const renderMedia = () => {
    if (!url || mediaType === "none") return null;
    if (mediaType === "youtube") {
      return (
        <div className="post-media frame">
          <iframe
            src={processedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    if (mediaType === "gallery") {
      return (
        <div className="post-media error">
          <p>This post is a gallery.</p>
          <a href={processedUrl || `https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
            View gallery on Reddit
          </a>
        </div>
      );
    }
    if (mediaType === "image") {
      return (
        <div className="post-media">
          {imageLoading && <div className="ui-skeleton media-skeleton"></div>}
          {!imageError && (
            <img src={processedUrl} alt={title} onError={handleImageError} onLoad={handleImageLoad} loading="lazy" />
          )}
          {imageError && (
            <div className="post-media error">
              <p>Content failed to load.</p>
              <a href={processedUrl} target="_blank" rel="noopener noreferrer">
                View on Reddit
              </a>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="link-preview">
        <div>
          <p className="link-label">External link</p>
          <p className="link-url">{processedUrl}</p>
        </div>
        <span className="link-chip">Open</span>
      </div>
    );
  };

  return (
    <article className="ui-card tight post-card" aria-label={title}>
      <div className="post-shell">
        <div className="post-vote" role="group" aria-label="Post rating">
          <button
            className={`vote-button up ${userLike === 1 ? "active" : ""}`}
            onClick={() => handleSetLike("like")}
            aria-label="Upvote post"
            aria-pressed={userLike === 1}
          >
            ▲
          </button>
          <div className="vote-score" aria-label={`${likes + userLike} points`}>
            {likes + userLike}
          </div>
          <button
            className={`vote-button down ${userLike === -1 ? "active" : ""}`}
            onClick={() => handleSetLike("dislike")}
            aria-label="Downvote post"
            aria-pressed={userLike === -1}
          >
            ▼
          </button>
        </div>

        <div className="post-body">
          <div className="post-header">
            <div className="post-avatar">
              {isAvatarLoading && <div className="ui-skeleton avatar-skeleton"></div>}
              <img
                src={authorImageError ? "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png" : authorAvatar}
                alt={`${author}'s avatar`}
                className={`ui-avatar ${isAvatarLoading ? "hidden" : ""}`}
                onError={handleAuthorImageError}
                onLoad={handleAuthorImageLoad}
              />
            </div>
            <div className="post-meta">
              <div className="post-meta__row">
                <a href={communityUrl} className="post-community" aria-label={`Go to ${subreddit} subreddit`}>
                  {display_name_prefixed || `r/${subreddit}`}
                </a>
                <span className="dot">•</span>
                <a href={`https://www.reddit.com/user/${author}`} className="post-author">
                  u/{author}
                </a>
              </div>
              <span className="post-time" title={new Date(created_utc * 1000).toLocaleString()}>
                {formattedTime}
              </span>
            </div>
            <a className="post-link-chip" href={processedUrl} target="_blank" rel="noopener noreferrer">
              Open post
            </a>
          </div>

          <a className="post-content" href={processedUrl} target="_blank" rel="noopener noreferrer">
            <h2 className="post-title">{title}</h2>
            {renderMedia()}
          </a>

          <div className="post-user-bar">
            <button className="ui-button icon" onClick={showComments} aria-expanded={toggleComments} disabled={isLoading}>
              <span aria-hidden="true">💬</span>
              {isLoading ? "Loading..." : "Comments"}
            </button>
            <button className="ui-button icon" aria-label="Share post">
              <span aria-hidden="true">🔗</span> Share
            </button>
            <button className="ui-button icon" aria-label="Save post">
              <span aria-hidden="true">📎</span> Save
            </button>
            <button className="ui-button icon" aria-label="More options">
              <span aria-hidden="true">⋯</span>
            </button>
          </div>

          {error && (
            <div className="post-error" role="alert">
              {error}
            </div>
          )}

          {comments && toggleComments && (
            <div className="post-comments">
              <div className="ui-divider"></div>
              <Comments comments={comments} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default Post;
