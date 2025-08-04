import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VideoReport.css';

const VideoReport = () => {
  const { guid } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleFrames, setVisibleFrames] = useState(5);

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
      }
    } catch (error) {
      console.error('Error fetching video report:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewMoreFrames = () => {
    setVisibleFrames(prevCount => prevCount + 5);
  };

  if (isLoading) return <div>Loading video report...</div>;
  if (!report) return <div>Video report not found.</div>;
  
  const framesToShow = report.detected_frames.slice(0, visibleFrames);

  return (
    <div className="video-report-container">
      <h1>Video Report: {report.video_info.video_name}</h1>
      <p>Status: {report.video_info.status}</p>
      <h2>Detected Frames</h2>
      <div className="frames-grid">
        {framesToShow.map((frame) => (
          <div key={frame.id} className="frame-card">
            <Link to={`/frame/${frame.id}`}>
              <img src={frame.frame_image_url} alt={`Frame ${frame.frame_number}`} />
              <p>Frame #{frame.frame_number}</p>
            </Link>
          </div>
        ))}
      </div>
      {visibleFrames < report.detected_frames.length && (
        <div className="view-more-container">
          <button onClick={handleViewMoreFrames} className="view-more-button">View More Frames</button>
        </div>
      )}
    </div>
  );
};

export default VideoReport;
