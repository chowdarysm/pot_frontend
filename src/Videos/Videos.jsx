import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Videos.css";

const Videos = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/videos`);
      if (response.ok) {
        const data = await response.json();
        setAllVideos(data);
      } else {
        console.error("Failed to fetch videos");
        setAllVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setAllVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const visibleVideos = allVideos.slice(0, visibleCount);

  return (
    <div className="video-dashboard-container">
      <div className="video-dashboard-header">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        <h1>Video Dashboard</h1>
        <div className="sort-by-container">
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" name="sort-by">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading videos...</p>
      ) : (
        <>
          <div className="video-grid-container">
            {visibleVideos.map((video) => (
              <Link
                to={`/video/${video.guid}/${video.location_text}`}
                key={video.guid}
                className="video-dashboard-card"
                state={{ cityLocation: video.location_text }}
              >
                <div className="video-thumbnail-wrapper">
                  <img
                    src={
                      video.thumbnail_url ||
                      "https://placehold.co/600x400/e0e0e0/000000?text=Video"
                    }
                    alt={video.video_name}
                    className="video-thumbnail"
                  />
                </div>
                <div className="video-card-info">
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(video.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Coordinates:</strong> {video.location}
                  </p>
                  <p>
                    <strong>Location:</strong> {video.location_text}
                  </p>
                  <p>
                    <strong>FileName:</strong> {video.video_name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {visibleCount < allVideos.length && (
            <div className="view-more-container">
              <button onClick={handleViewMore} className="view-more-button">
                View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Videos;
