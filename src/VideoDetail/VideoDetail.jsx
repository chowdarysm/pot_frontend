import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./VideoDetail.css";

const VideoDetail = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { guid, location } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const { cityLocation } = location.state || {};
  console.log("cityLocation is :", location);
  useEffect(() => {
    const fetchVideoDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/video_report/${guid}`
        );
        console.log("Response", response.data);
        if (response.ok) {
          const data = await response.json();
          setVideoInfo(data.video_info);
          setFrames(data.detected_frames);
        } else {
          console.error("Failed to fetch video details");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (guid) {
      fetchVideoDetails();
    }
  }, [guid]);

  const goToBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p>Loading video details...</p>;
  }
  const handleNavigate = () => {
    console.log("Videodetail card clicked");
    navigate(`/report/${guid}`, {
      state: { location: location },
    });
  };

  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="video-detail-page">
        <h1>{videoInfo ? videoInfo.video_name : "Video Details"}</h1>
        <div className="video-detail-container">
          {frames.map((frame) => (
            <div
              onClick={handleNavigate}
              className="video-detail-card"
              key={frame.id}
            >
              <img
                src={frame.frame_image_url}
                alt={`Frame ${frame.frame_number}`}
              />
              <div className="video-card-details">
                <span>Frame #{frame.frame_number}</span>
                <span>Filename: {videoInfo ? videoInfo.video_name : ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
