import React, { useState } from "react";
import { FaRoad } from "react-icons/fa";
import piechartImage from "../assets/images/piechart.png";
import bargraphImage from "../assets/images/bargraph.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ReportDetails.css";
const ReportDetails = () => {
  const navigate = useNavigate();
  const reportdashData = [
    { id: 1, title: "Billboards", color: "#E1F2CE" },
    { id: 2, title: "Potholes", color: "#D4F4F9" },
    { id: 3, title: "Construction Sites", color: "#80e517" },
    { id: 4, title: "Guardrails", color: "black" },
  ];
  const [category, setCategory] = useState("");
  const handleGenerate = () => {
    if (category === "detailed") {
      navigate("/detailedreport");
    }
  };
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      {/* <div className="report-details-navbar">
        <Link
          to={"/home"}
          className="nav"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span style={{ paddingTop: "3px" }}>
            <FaRoad />
          </span>
          <span>PROACTIX Reports</span>
        </Link>
       
      </div> */}
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="report-details-container">
        <div className="report-filter-sort">
          <div className="report-filter">
            <h2>Filters</h2>
            <div className="filter-search">
              <div className="location-filter">
                <label htmlFor="">Location</label>
                <input
                  type="text"
                  placeholder="State, City, Highway, GPS Coordinates"
                  style={{ boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div className="date-filter">
                <label htmlFor="">Date Range</label>
                <input
                  type="date"
                  name=""
                  id=""
                  style={{
                    padding: "12px",
                    borderRadius: "20px",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="report-sort">
            <h2>Generate Reports</h2>
            <div className="sort-filter">
              <div className="issue-category">
                <label htmlFor="Issue Categories">Issue Categories</label>
                <select
                  name="category"
                  id="category"
                  style={{
                    padding: "10px",
                    border: "none",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                >
                  <option value="">Select category</option>
                  <option value="billboard">Billboards</option>
                  <option value="potholes">Potholes</option>
                  <option value="guardrails">Guardrails</option>
                  <option value="construction">Construction Sites</option>
                </select>
              </div>
              <div className="report-category">
                <label htmlFor="">Report Type</label>
                <select
                  name="category"
                  id="category"
                  style={{
                    padding: "10px",
                    border: "none",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Report</option>
                  <option value="summary">Summary</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
            <div className="report-btn-tab">
              <button onClick={handleGenerate}>Generate</button>
              <button>Export as PDF</button>
              <button>Export as CSV</button>
            </div>
          </div>
        </div>
        <div className="report-dashboard-container">
          <h1>Real Time Report Dashboard</h1>
          <div className="report-dashboard">
            {reportdashData.map((item, id) => (
              <div
                className="report-dash-card"
                key={id}
                style={{ backgroundColor: item.color }}
              >
                <h2 style={{ color: item.id === 4 ? "white" : "black" }}>
                  {item.title}
                </h2>
                <div className="report-dash-img">
                  <div className="dash-img">
                    <img src={piechartImage} />
                  </div>

                  <div className="dash-img">
                    <img src={bargraphImage} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDetails;
