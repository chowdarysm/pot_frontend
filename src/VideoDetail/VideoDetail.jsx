import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetail.css';

const VideoDetail = () => {
  const { guid } = useParams();
  const [videoReport, setVideoReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (guid) {
      fetchVideoReport();
    }
  }, [guid]);

  const fetchVideoReport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/video_report/${guid}`);
      if (response.ok) {
        const data = await response.json();
        setVideoReport(data);
      } else {
        console.error('Failed to fetch video report');
        setVideoReport(null);
      }
    } catch (error) {
      console.error('Error fetching video report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading video details...</p>;
  if (!videoReport) return <p>Video report not found.</p>;

  return (
    <div className="video-detail-container">
      <h1>{videoReport.video_info.video_name}</h1>
      <p>Status: {videoReport.video_info.status}</p>
      <h2>Detected Frames (Latest 15)</h2>
      <div className="frame-grid">
        {videoReport.detected_frames.length > 0 ? (
          videoReport.detected_frames.map((frame) => (
            <div className="frame-item" key={frame.id}>
              <img src={frame.frame_image_url} alt={`Frame ${frame.frame_number}`} />
              <p>Frame #{frame.frame_number}</p>
            </div>
          ))
        ) : (
          <p>No frames with detected potholes in this video yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
