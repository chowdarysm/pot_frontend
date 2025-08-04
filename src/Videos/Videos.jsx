import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/videos`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch videos');
        setVideos([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="videos-container">
      <h1>Video Reports</h1>
      {isLoading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="video-list">
          {videos.map((video) => (
            <Link to={`/videos/${video.guid}`} key={video.guid} className="video-card">
              <img src={video.thumbnail_url || 'https://placehold.co/600x400?text=No+Preview'} alt={video.video_name} />
              <div className="video-info">
                <h3>{video.video_name}</h3>
                <p>Status: {video.status}</p>
                <p>Date: {new Date(video.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
