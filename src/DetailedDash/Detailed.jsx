import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Detailed.css";

// Component-specific assets
import profileIcon from "../assets/images/profile.png";

// Icon Imports - Corrected and Organized
import { FaMap, FaVideo, FaImage, FaFile } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6"; // Corrected import for FaNoteSticky
import { MdReportProblem, MdOutlineSupportAgent } from "react-icons/md";
import { TbSelect } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { IoMdSettings, IoIosCloud } from "react-icons/io";
import { IoLogOutOutline, IoChevronDown } from "react-icons/io5";
import { GoFileDirectoryFill } from "react-icons/go";

const Detailed = () => {
  const navigate = useNavigate();
  const [latestReports, setLatestReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch latest reports from the API
  useEffect(() => {
    const fetchLatestReports = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/latest_reports`);
        if (response.ok) {
          const data = await response.json();
          setLatestReports(data);
        } else {
          console.error("Failed to fetch latest reports");
        }
      } catch (error) {
        console.error("Error fetching latest reports:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestReports();
  }, []);

  // Navigate to the correct detail page when a card is clicked
  const handleCardClick = (report) => {
    if (report.type === "video") {
      navigate(`/video/${report.guid}`);
    } else if (report.type === "image") {
      navigate(`/report/${report.guid}`);
    }
  };

  // User data from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser ? storedUser.name : "User";
  const userEmail = storedUser ? storedUser.email : "user@example.com";

  // Navigation functions
  const goToForm = () => navigate("/form");
  const goToBillboard = () => navigate("/billboards");
  const goToPotholes = () => navigate("/potholes");
  const goToDashboard = () => navigate("/dashboard");

  return (
    <div className="dash-container">
      {/* ================================== */}
      {/* == LEFT SIDEBAR - STATIC UI     == */}
      {/* ================================== */}
      <div className="left-dash-content">
        <div className="left-dash-container">
          <div className="upper-profile">
            <div className="profile">
              <img src={profileIcon} alt="Profile" />
              <div className="profile-details">
                <p style={{ fontSize: "1rem", fontWeight: "700" }}>{userName}</p>
                <p style={{ fontSize: "12px", fontWeight: "600" }}>{userEmail}</p>
              </div>
            </div>
            <div className="settings">
              <ul>
                <li><span><FaMap /></span>Overview</li>
                <li><span><MdReportProblem /></span>Report</li>
                <li><span><TbSelect /></span>Issues</li>
                <li><span><RiTeamFill /></span>Team</li>
                <li><span><FaNoteSticky /></span>Notes</li>
              </ul>
            </div>
          </div>
          <div className="bottom-profile">
            <ul>
              <li><span><IoMdSettings /></span>Settings</li>
              <li><span><IoLogOutOutline /></span>Log out</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* == RIGHT CONTENT AREA          == */}
      {/* ================================== */}
      <div className="right-dash-container">
        <div className="inner-right-dash">
          <div className="head">Reported Issues 2025</div>
          <div className="filter-tab">
            <div className="left-filter">
              <ul>
                <li>Overview <span><IoChevronDown /></span></li>
              </ul>
            </div>
          </div>
          <div className="report-container">
            {/* Main content area for reports */}
            <div className="inner-report">
              <div className="lower-report">
                <div className="lower-head">
                  <ul>
                    <li>Latest Reports <span><IoChevronDown /></span></li>
                  </ul>
                </div>
                {/* DYNAMIC REPORT GRID */}
                <div className="lower-card-report">
                  {isLoading ? (
                    <p>Loading reports...</p>
                  ) : (
                    latestReports.map((report) => (
                      <div
                        className="card"
                        key={report.guid}
                        onClick={() => handleCardClick(report)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="image">
                          {report.thumbnail_url ? (
                            <img src={report.thumbnail_url} alt="report thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} />
                          ) : (
                            <span>
                              {report.type === 'video' ? <FaVideo /> : <FaImage />}
                            </span>
                          )}
                        </div>
                        <div className="card-info">
                          <ul>
                            <li>
                              <span>{report.type === 'video' ? <FaVideo /> : <FaImage />}</span>
                              {report.video_name || report.image_name}
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right-side filter and action panel - STATIC UI */}
            <div className="inner-report-filter">
              <div className="submit-filter">
                <button onClick={goToForm}>Upload Images</button>
                <button onClick={goToForm}>Upload Videos</button>
              </div>
              <div className="upper-filter">
                <h4 style={{ fontWeight: "bolder" }}>Category</h4>
                <ul>
                  <li style={{ cursor: "pointer" }} onClick={goToBillboard}><span>Billboard</span></li>
                  <li style={{ cursor: "pointer" }} onClick={goToPotholes}><span>Potholes</span></li>
                  <li><span>Construction Sites</span></li>
                  <li><span>Missing Guardrails</span></li>
                </ul>
              </div>
              <div className="lower-filter">
                <h4 style={{ fontWeight: "bolder" }}>Reports</h4>
                <ul>
                  <li><span>Visuals</span></li>
                  <li><span>Analytics</span></li>
                  <li onClick={goToDashboard} style={{ cursor: "pointer" }}>Current Issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;