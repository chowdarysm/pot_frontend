import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Detailed.css";
import profileIcon from "../assets/images/profile.png";
// Corrected Icon Imports
import { FaMap, FaVideo, FaImage, FaFile } from "react-icons/fa";
import { MdReportProblem, MdOutlineSupportAgent } from "react-icons/md";
import { TbSelect } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import { IoMdSettings, IoIosCloud } from "react-icons/io";
import { IoLogOutOutline, IoChevronDown } from "react-icons/io5"; // Corrected import for IoChevronDown
import { GoFileDirectoryFill } from "react-icons/go";


const Detailed = () => {
  const navigate = useNavigate();
  const [latestReports, setLatestReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleCardClick = (report) => {
    if (report.type === "video") {
      navigate(`/video/${report.guid}`);
    } else if (report.type === "image") {
      navigate(`/report/${report.guid}`);
    }
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser ? storedUser.name : "User";
  const userEmail = storedUser ? storedUser.email : "user@example.com";

  const goToForm = () => navigate("/form");
  const goToBillboard = () => navigate("/billboards");
  const goToPotholes = () => navigate("/potholes");
  const goToDashboard = () => navigate("/dashboard");

  return (
    <div className="dash-container">
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
              {/* This is where your aside bar content can be mapped or placed */}
            </div>
          </div>
          <div className="bottom-profile">
            {/* This is where bottom settings/logout can be placed */}
          </div>
        </div>
      </div>

      <div className="right-dash-container">
        <div className="inner-right-dash">
          <div className="head">Reported Issues 2025</div>
          <div className="filter-tab">
            <div className="left-filter">
              <ul>
                <li>
                  Overview{" "}
                  <span><IoChevronDown /></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="report-container">
            <div className="inner-report">
              <div className="lower-report">
                <div className="lower-head">
                  <ul>
                    <li>
                      Latest Reports{" "}
                      <span><IoChevronDown /></span>
                    </li>
                  </ul>
                </div>
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