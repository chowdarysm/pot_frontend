import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
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
        setVideos(data);
      } else {
        console.error('Failed to fetch videos');
        setVideos([]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="video-dashboard-container">
      <div className="video-dashboard-header">
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
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
            {videos.map((video) => (
              <Link to={`/video/${video.guid}`} key={video.guid} className="video-dashboard-card">
                <div className="video-thumbnail-wrapper">
                   <img 
                     src={video.thumbnail_url || 'https://placehold.co/600x400/e0e0e0/000000?text=Video'} 
                     alt={video.video_name} 
                     className="video-thumbnail"
                   />
                </div>
                <div className="video-card-info">
                  <p><strong>Timestamp:</strong> {new Date(video.created_at).toLocaleString()}</p>
                  {/* These are placeholders as the data is not in the backend yet */}
                  <p><strong>Coordinates:</strong> 37.7749, -122.4194</p>
                  <p><strong>Location:</strong> San Francisco, USA</p>
                  <p><strong>CameraId:</strong> 1234</p>
                </div>
              </Link>
            ))}
          </div>
          {videos.length > 0 && (
             <div className="view-more-container">
                <button className="view-more-button">View More</button>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default Videos;
