import React from "react";
import billboardImage from "../assets/images/billboard-img.png";
import "./Videos.css";
import { useNavigate } from "react-router-dom";
const Videos = () => {
  const navigate = useNavigate();
  const videoData = [
    {
      id: 1,
      timestamp: "2023-10-25 09:45",
      coordinates: "37.7749, -122.4194 San Francisco, USA",
      cameraId: 1234,
    },
    {
      id: 2,
      timestamp: "2023-10-25 09:45",
      coordinates: "37.7749, -122.4194 San Francisco, USA",
      cameraId: 1234,
    },
    {
      id: 3,
      timestamp: "2023-10-25 09:45",
      coordinates: "37.7749, -122.4194 San Francisco, USA",
      cameraId: 1234,
    },
    {
      id: 4,
      timestamp: "2023-10-25 09:45",
      coordinates: "37.7749, -122.4194 San Francisco, USA",
      cameraId: 1234,
    },
    {
      id: 5,
      timestamp: "2023-10-25 09:45",
      coordinates: "37.7749, -122.4194 San Francisco, USA",
      cameraId: 1234,
    },
  ];
  const handleClick = () => {
    navigate("/videodetails");
  };
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="video-container">
        <div className="video-head">
          <h1>Video Dashboard</h1>
          <select name="" id="">
            <option value="">Sort by</option>
            <option value="">Newest first</option>
          </select>
        </div>
        <div className="video-card-container">
          {videoData.map((item, id) => (
            <div
              className="video-card"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <img src={billboardImage} />
              <div className="video-card-details" key={id}>
                <span>Timestamp: {item.timestamp}</span>
                <span>Coordinates: {item.coordinates}</span>
                <span>CameraId: {item.cameraId}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="more-video">
          <button>View More</button>
        </div>
      </div>
    </>
  );
};

export default Videos;
