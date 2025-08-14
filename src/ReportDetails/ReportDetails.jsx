import React, { useState } from "react";
import { FaRoad } from "react-icons/fa";
import piechartImage from "../assets/images/piechart.png";
import bargraphImage from "../assets/images/bargraph.png";
import { Link, useNavigate } from "react-router-dom";
import "./ReportDetails.css";
import Graph from "../Graph/Graph";

const ReportDetails = () => {
  const navigate = useNavigate();
  const [issueCategory, setIssueCategory] = useState("");
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const reportdashData = [
    { id: 1, title: "Billboards", color: "#E1F2CE" },
    { id: 2, title: "Potholes", color: "#D4F4F9" },
    { id: 3, title: "Construction Sites", color: "#80e517" },
    { id: 4, title: "Guardrails", color: "black" },
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleGenerate = () => {
    if (reportType === "detailed" && issueCategory) {
      // Pass the category as a URL parameter
      navigate(`/detailedreport?category=${issueCategory}`);
    } else {
      alert("Please select an issue category and the 'Detailed' report type.");
    }
  };

  const goToBack = () => {
    navigate(-1);
  };
  const generateGraph = (title) => {
    navigate(`/graph/${title}`);
  };

  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="report-details-container">
        <div className="report-filter-sort">
          <div className="report-filter">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Filters</h2>
            <div className="filter-search">
              <div className="location-filter">
                <label
                  htmlFor=""
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Location
                </label>
                <input
                  type="text"
                  placeholder="State, City, Highway, GPS Coordinates"
                  style={{ boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div className="date-filter">
                <label
                  htmlFor=""
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Month
                </label>

                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  style={{ boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)" }}
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="year-filter">
                <label
                  htmlFor=""
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Year
                </label>
                <input
                  type="number"
                  placeholder="YYYY"
                  value={year}
                  min="2025"
                  max="2030"
                  step="1"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="status-filter">
                <label
                  htmlFor="status-filter"
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Status
                </label>
                <select
                  name="category"
                  style={{
                    padding: "10px",
                    border: "none",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Unapproved">Unapproved</option>
                  <option value="Identified">Identified</option>
                </select>
              </div>
            </div>
            <div className="apply-filter-btn">
              <button>Apply Filter</button>
            </div>
          </div>
          <div className="report-sort">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              Generate Reports
            </h2>
            <div className="sort-filter">
              <div className="issue-category">
                <label
                  htmlFor="issue-categories"
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Issue Categories
                </label>
                <select
                  name="category"
                  id="issue-categories"
                  style={{
                    padding: "10px",
                    border: "none",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  value={issueCategory}
                >
                  <option value="">Select category</option>
                  <option value="billboard">Billboards</option>
                  <option value="potholes">Potholes</option>
                  <option value="guardrails">Guardrails</option>
                  <option value="construction">Construction Sites</option>
                </select>
              </div>
              <div className="report-category">
                <label
                  htmlFor="report-type"
                  style={{ fontSize: "1.1rem", fontWeight: "600" }}
                >
                  Report Type
                </label>
                <select
                  name="reportType"
                  id="report-type"
                  style={{
                    padding: "10px",
                    border: "none",
                    boxShadow: " 0 0 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                  onChange={(e) => setReportType(e.target.value)}
                  value={reportType}
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
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            Real Time Report Dashboard
          </h1>
          <div className="report-dashboard">
            {reportdashData.map((item, id) => (
              <div
                className="report-dash-card"
                key={id}
                // style={{ backgroundColor: item.color }}
                onClick={() => generateGraph(item.title)}
              >
                {/* <h2 style={{ color: item.id === 4 ? "white" : "black" }}>
                  {item.title}
                </h2> */}
                <div className="report-dash-img">
                  <div className="chart-data">
                    <Graph category={item.title} />
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
