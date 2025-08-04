import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './VideoReport.css';

const VideoReport = () => {
  const { guid } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        setReport(data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error('Error fetching video report:', error);
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading-container">Loading Video Details...</div>;
  if (!report) return <div className="loading-container">Video Report Not Found.</div>;

  return (
    <div className="video-details-page">
      <div className="video-details-header">
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
      </div>
      <h1 className="video-details-title">Video Details</h1>
      <div className="video-frames-grid">
        {report.detected_frames && report.detected_frames.length > 0 ? (
          report.detected_frames.map((frame) => (
            <Link to={`/frame/${frame.id}`} key={frame.id} className="frame-details-card">
              <div className="frame-image-wrapper">
                <img src={frame.frame_image_url} alt={`Frame ${frame.frame_number}`} className="frame-image" />
              </div>
              <div className="frame-info">
                <p>Frame #{String(frame.frame_number).padStart(4, '0')}</p>
                <p className="filename">{report.video_info.video_name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No frames with detected issues in this video.</p>
        )}
      </div>
    </div>
  );
};

export default VideoReport;
