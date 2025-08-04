import React from "react";
import billboardImage from "../assets/images/billboard-img.png";
import "./ImageDetail.css";
const ImageDetail = () => {
  const imagedetailData = [
    { id: 1, title: "Frame 1" },
    { id: 2, title: "Frame 2" },
    { id: 3, title: "Frame 3" },
    { id: 4, title: "Frame 4" },
    { id: 5, title: "Frame 5" },
  ];
  return (
    <>
      <div className="image-detail-page">
        <h1>Image Details</h1>
        <div className="image-detail-container">
          {imagedetailData.map((item, id) => (
            <div className="image-detail-card">
              <img src={billboardImage} />
              <div className="image-card-details" key={id}>
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageDetail;
