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
  const [city, setCity] = useState("");
  // const [selectedStatus, setSelectedStatus] = useState(null);
  const [billboardPie, setBillboardPie] = useState([]);
  const [potholesPie, setPotholesPie] = useState([]);
  const [selectedBillboardStatus, setSelectedBillboardStatus] =
    useState("approved");
  const [selectedPotholeStatus, setSelectedPotholeStatus] = useState("Low");
  const [filteredPotholesData, setFilteredPotholesData] = useState([]);
  // const billboardData = [
  //   { city: "Pune", year: 2025, month: "Jun", status: "Approved", value: 400 },
  //   {
  //     city: "Pune",
  //     year: 2025,
  //     month: "Jul",
  //     status: "Unapproved",
  //     value: 200,
  //   },
  //   {
  //     city: "Mumbai",
  //     year: 2025,
  //     month: "Jun",
  //     status: "Approved",
  //     value: 300,
  //   },
  //   { city: "Mumbai", year: 2025, month: "Aug", status: "Damaged", value: 500 },
  // ];
  // const potholesData = [
  //   { city: "Pune", year: 2025, month: "Jun", status: "low", value: 150 },
  //   { city: "Pune", year: 2025, month: "Jul", status: "high", value: 250 },
  //   { city: "Mumbai", year: 2025, month: "Jun", status: "mid", value: 300 },
  //   { city: "Mumbai", year: 2025, month: "Aug", status: "high", value: 200 },
  // ];
  const billboardData = [
    { city: "Pune", status: "Approved", month: "June", value: 10 },
    { city: "Pune", status: "Approved", month: "July", value: 5 },
    { city: "Pune", status: "Unapproved", month: "June", value: 3 },
    { city: "Mumbai", status: "Approved", month: "June", value: 8 },
    { city: "Mumbai", status: "Unapproved", month: "July", value: 4 },
  ];

  const potholeData = [
    { city: "Pune", status: "Low", month: "June", value: 15 },
    { city: "Pune", status: "Mid", month: "July", value: 8 },
    { city: "Pune", status: "High", month: "June", value: 5 },
    { city: "Mumbai", status: "Low", month: "June", value: 12 },
    { city: "Mumbai", status: "High", month: "July", value: 7 },
  ];

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
  // const generateGraph = (title) => {
  //   navigate(`/graph/${title}`);
  // };
  const handleInputChange = (e) => {
    setCity(e.target.value);
    console.log("City:-", e.target.value);
    // setSelectedStatus(null);
  };
  const generateGraph = () => {
    const filteredBillboards = billboardData.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );

    const filteredPotholes = potholeData.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );

    const pieDataBillboard = filteredBillboards.reduce((acc, curr) => {
      const found = acc.find((item) => item.status === curr.status);
      if (found) {
        found.value += curr.value;
      } else {
        acc.push({ status: curr.status, value: curr.value });
      }
      return acc;
    }, []);

    const pieDataPotholes = filteredPotholes.reduce((acc, curr) => {
      const found = acc.find((item) => item.status === curr.status);
      if (found) {
        found.value += curr.value;
      } else {
        acc.push({ status: curr.status, value: curr.value });
      }
      return acc;
    }, []);

    setBillboardPie(pieDataBillboard);
    setPotholesPie(pieDataPotholes);
    setFilteredPotholesData(filteredPotholes);
  };
  // const filteredBillboards = billboardData.filter(
  //   (item) => item.city.toLowerCase() === city.toLowerCase()
  // );

  // const filteredPotholes = potholeData.filter(
  //   (item) => item.city.toLowerCase() === city.toLowerCase()
  // );

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
                  onChange={handleInputChange}
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
              <button onClick={generateGraph}>Apply Filter</button>
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
          <h1 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
            Real Time Report Dashboard
          </h1>
          <div className="report-dashboard">
            {reportdashData.map((item, id) => (
              <div
                className="report-dash-card"
                key={id}
                // onClick={() => generateGraph(item.title)}
              >
                <div className="report-dash-img">
                  <div className="chart-data">
                    {item.title === "Construction Sites" ||
                    item.title === "Guardrails" ? (
                      <>
                        <h1>{item.title} Analytics</h1>
                        <p>Coming Soon</p>
                      </>
                    ) : (
                      <Graph
                        category={item.title}
                        billboardPie={billboardPie}
                        potholesPie={potholesPie}
                        selectedBillboardStatus={selectedBillboardStatus}
                        setSelectedBillboardStatus={setSelectedBillboardStatus}
                        billboardData={billboardData}
                        potholesData={filteredPotholesData}
                        selectedPotholeStatus={selectedPotholeStatus}
                        setSelectedPotholeStatus={setSelectedPotholeStatus}
                      />
                    )}
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
