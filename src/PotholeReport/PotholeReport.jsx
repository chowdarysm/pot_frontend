import React from "react";
import { GiRoad } from "react-icons/gi";
import "./PotholeReport.css";
import mapImage from "../assets/images/map-image.jpeg";
import { useNavigate } from "react-router-dom";
const PotholeReport = () => {
  const navigate = useNavigate();
  const buttonData = [
    { id: 1, title: "Follow-up Inspection" },
    { id: 2, title: "Send Repair Crew" },
    { id: 3, title: "Close Report" },
  ];
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      {/* <div className="pothole-navbar">
        <div className="pothole-logo">
          <span style={{ paddingTop: "3px" }}>
            <GiRoad />
          </span>
          <span>Proactix</span>
        </div>
        <div className="pothole-list">
          <ul>
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Analytics</li>
            <li>Settings</li>
          </ul>
        </div>
      </div> */}
      <div className="pothole-report-container">
        <div className="left-pothole-report">
          <h1>Pothole Report #12345</h1>
          <div className="pothole-details">
            <div className="pothole-details-img">
              <img src="https://media.istockphoto.com/id/95658927/photo/a-large-pot-hole-filled-with-water-on-an-asphalt-road.jpg?s=612x612&w=0&k=20&c=o4V3HZV1HqlopqwJ7DsI8BuwD7k26UKthAZ_FSn8SrY=" />
            </div>
            <div className="pothole-report-desc">
              <p>Reported by: Dhananjay</p>
              <p>Location: Anand Nagar, Pune</p>
              <p>Date: July 25, 2025</p>
              <p>Status: In Progress</p>
            </div>
          </div>
          <div className="pothole-report-map">
            <img src={mapImage} />
          </div>
        </div>
        <div className="right-pothole-report">
          <h1>Related Actions</h1>
          <div className="pothole-button">
            <button>Follow-up Inspection </button>
            <button>Send Repair Crew</button>
            <button>Close Report</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PotholeReport;
