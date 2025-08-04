import React from "react";

import billboardImage from "../assets/images/billboard-img.png";
import "./VideoDetail.css";
import { useNavigate } from "react-router-dom";
const VideoDetail = () => {
  const videodetailData = [
    { id: 1, title: "Frame #0001", file: "NH14_280720250.mp4" },
    { id: 2, title: "Frame #0002", file: "NH14_280720251.mp4" },
    { id: 3, title: "Frame #0003", file: "NH14_280720252.mp4" },
    { id: 4, title: "Frame #0004", file: "NH14_280720253.mp4" },
    { id: 5, title: "Frame #0005", file: "NH14_280720254.mp4" },
  ];
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="video-detail-page">
        <h1>Video Details</h1>
        <div className="video-detail-container">
          {videodetailData.map((item, id) => (
            <div className="video-detail-card">
              <img src={billboardImage} />
              <div className="video-card-details" key={id}>
                <span>{item.title}</span>
                <span>Filename_{item.file}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
