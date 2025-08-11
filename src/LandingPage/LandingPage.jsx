import React from "react";
import landingPage from "../assets/images/landingPage.jpg";
import { TiTick } from "react-icons/ti";
import { TbMessageReport } from "react-icons/tb";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  const recentIssues = [
    { id: 1, issue: "Pothole detected" },
    { id: 2, issue: "Erosion near guardrail" },
    { id: 3, issue: "Debris on road" },
  ];
  const goToDash = () => {
    navigate("/home");
  };
  const goToUpload = () => {
    navigate("/form");
  };
  return (
    <>
      <div className="landing-page-container">
        <div className="landing-container">
          <img src={landingPage} />
          <div className="landing-text">
            <h1>
              Smart Infrastructure Monitoring <br />{" "}
            </h1>
            <h1 style={{ textAlign: "center" }}>for Safer Roads</h1>
            <p>
              AI-powered detection, real-time alerts, and actionable insights
            </p>
          </div>
          <div className="landing-btn">
            <button
              onClick={goToDash}
              style={{ backgroundColor: "#00b0f0", color: "white" }}
            >
              View Dashboard
            </button>
            <button onClick={goToUpload}>Upload Evidence</button>
          </div>
        </div>
        {/* <div className="landing-details">
          <div className="left-landing-details">
            <div className="landing-issues">
              <div className="issue">
                <span>
                  <TiTick />
                </span>
                <span className="span-issue">
                  <span>Compliant infrastructure</span>
                  <span style={{ width: "100%" }}>32</span>
                </span>
              </div>
              <div className="issue">
                <span>
                  <TbMessageReport />
                </span>
                <span className="span-issue">
                  <span>Critical issues</span>
                  <span style={{ width: "100%" }}>5</span>
                </span>
              </div>
            </div>
            <div className="landing-recent-issues">
              <div className="recent-landingpage-issues">
                <h3>Recent issues</h3>
                <ul style={{ listStyle: "none" }}>
                  {recentIssues.map((item, id) => (
                    <li key={id}>{item.issue}</li>
                  ))}
                </ul>
              </div>
              <div
                className="view-issue"
                style={{ cursor: "pointer", fontWeight: "700" }}
              >
                <span>View all</span>
              </div>
            </div>
          </div>
          <div className="right-landing-details"></div>
        </div> */}
      </div>
    </>
  );
};

export default LandingPage;
