import React from "react";
import homeImage from "../assets/images/home.png";
import { MdPhotoCamera } from "react-icons/md";
import { FaBrain } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { MdReportProblem } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

import highwayImage from "../assets/images/highway.png";
import constructionImage from "../assets/images/construction.png";
import billboardImage from "../assets/images/billboard-img.png";
import potholeImage from "../assets/images/pothole.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const homeData = [
    {
      id: 1,
      title: "Total Billboards Detected",
      count: 1234,
    },
    {
      id: 2,
      title: "Unauthorized Billboards",
      count: 30,
    },
    {
      id: 3,
      title: "Potholes Identified ",
      count: 56,
    },
    {
      id: 4,
      title: "Construction Zones Identified",
      count: 8,
    },
    {
      id: 5,
      title: "Missing/Damaged Guardrails Detected",
      count: 14,
    },
  ];
  const featureData = [
    { id: 1, icon: MdPhotoCamera, title: "Real-Time Image/Video Capture" },
    { id: 2, icon: MdReportProblem, title: "Real-Time Reports" },
    { id: 3, icon: MdOutlineSupportAgent, title: "Events History" },
    {
      id: 4,
      icon: FaVideo,
      title: "Videos",
    },
    { id: 5, icon: FaImage, title: "Images" },
  ];
  const updatesData = [
    {
      id: 1,
      image: potholeImage,
      location: "Downtown Avenue",
      timestamp: "2023-10-25 14:30",
      category: "Pothole",
    },
    {
      id: 2,
      image: billboardImage,
      location: "Market Street",
      timestamp: "2023-10-25 10:15",
      category: "Unauthorised Billboard",
    },
    {
      id: 3,
      image: highwayImage,
      location: "Downtown Main Street",
      timestamp: "2023-10-25 12:00",
      category: "Construction Zone",
    },
    {
      id: 4,
      image: constructionImage,
      location: "Highway 65 Northbound",
      timestamp: "2023-10-25 09:45",
      category: "Missing Gaurdrails",
    },
  ];
  const navigate = useNavigate();
  const handlePage = (Icon) => {
    if (Icon === MdPhotoCamera) {
      // console.log("Camera is clicked");
      navigate("/form");
    } else if (Icon === MdReportProblem) {
      navigate("/reportdetails");
    } else if (Icon === MdOutlineSupportAgent) {
      navigate("/events");
    } else if (Icon === FaVideo) {
      navigate("/videos");
    } else if (Icon === FaImage) {
      navigate("/images");
    }
  };
  return (
    <>
      <div className="homepage-container">
        <div className="home-img-container">
          <img src={homeImage} />
          <h1>AI-Powered Road Monitoring and traffic control</h1>
        </div>
        <div className="home-data-container">
          {homeData.map((item, id) => (
            <div className="home-data-card" key={id}>
              <span
                style={{ fontSize: "1.1rem", fontWeight: "500", width: "100%" }}
              >
                {item.title}
              </span>
              <span style={{ fontSize: "1.4rem", fontWeight: "800" }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
        <div className="feature-container">
          <h1 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
            System Features
          </h1>
          <div className="feature-card-container">
            {featureData.map(({ id, icon: Icon, title }) => (
              <div
                className="feature-card"
                key={id}
                onClick={() => handlePage(Icon)}
              >
                <span
                  color={"#80E612"}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon />
                </span>
                <span style={{ fontStyle: "1rem", fontWeight: "600" }}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="updates-container">
          <h1 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
            Recent Updates
          </h1>
          <div className="update-card-container">
            {updatesData.map((item, id) => (
              <div className="update-card" key={id}>
                <div className="update-img">
                  <img src={item.image} />
                </div>
                <div className="update-card-detail">
                  <span>Location: {item.location}</span>
                  <span>Timestamp: {item.timestamp}</span>
                  <span>Category: {item.category}</span>
                </div>
                <p></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
