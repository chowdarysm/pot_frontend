import React, { useState, useEffect } from "react";
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
  const [selectedBillboardStatus, setSelectedBillboardStatus] = useState("");
  const [selectedPotholeStatus, setSelectedPotholeStatus] = useState("");
  const [filteredPotholesData, setFilteredPotholesData] = useState([]);
  const [billboardBar, setBillboardBar] = useState();
  const [filterBillboardCity, setFilterBillboardCity] = useState([]);
  const [filterPotholeCity, setFilterPotholeCity] = useState([]);
  const [dummy, setDummy] = useState(true);
  const [billboardStatsData, setBillboardStats] = useState([]);
  const [potholeStatsData, setPotholeStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillboardStats = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get_billboard_stats`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        console.log("billboard stats", data);
        setBillboardStats(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillboardStats();

    const fetchPotholeStats = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get_pothole_stats`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        console.log("pothole stats", data);
        setPotholeStats(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchPotholeStats();
  }, []);
  console.log("BillboardStatsData", billboardStatsData);
  console.log("PotholesStatsData", potholeStatsData);
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
  // const dummybillboardData = [
  //   { city: "Pune", status: "Approved", month: "June", value: 10 },
  //   { city: "Pune", status: "Approved", month: "July", value: 5 },
  //   { city: "Pune", status: "Unapproved", month: "June", value: 3 },
  //   { city: "Mumbai", status: "Approved", month: "June", value: 8 },
  //   { city: "Mumbai", status: "Unapproved", month: "July", value: 4 },
  // ];

  const potholeData = [
    { city: "Pune", status: "Low", month: "June", value: 15 },
    { city: "Pune", status: "Mid", month: "July", value: 8 },
    { city: "Pune", status: "High", month: "June", value: 5 },
    { city: "Mumbai", status: "Low", month: "June", value: 12 },
    { city: "Mumbai", status: "High", month: "July", value: 7 },
  ];

  // const dummypotholeData = [
  //   { city: "Pune", status: "Low", month: "June", value: 15 },
  //   { city: "Pune", status: "Mid", month: "July", value: 8 },
  //   { city: "Pune", status: "High", month: "June", value: 5 },
  //   { city: "Mumbai", status: "Low", month: "June", value: 12 },
  //   { city: "Mumbai", status: "High", month: "July", value: 7 },
  // ];

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

  const handleInputChange = (e) => {
    setCity(e.target.value);
    console.log("City:-", e.target.value);
  };
  const generateGraph = () => {
    const filteredBillboards = billboardData.filter(
      (item) =>
        (!city || item.city.toLowerCase() === city.toLowerCase()) &&
        (!selectedBillboardStatus || item.status === selectedBillboardStatus)
    );
    const billboardNewBarData = Object.values(
      filteredBillboards.reduce((acc, item) => {
        if (!acc[item.month]) {
          acc[item.month] = {
            month: item.month,
            value: 0,
            city: item.city,
            status: item.status,
          };
        }
        acc[item.month].value += item.value;
        return acc;
      }, {})
    );

    console.log("billboard filtered", filteredBillboards);

    const filteredPotholes = potholeData
      .filter((item) => !city || item.city.toLowerCase() === city.toLowerCase()) // only that city
      .reduce((acc, curr) => {
        const found = acc.find((item) => item.status === curr.status);
        if (found) {
          found.value += curr.value;
        } else {
          acc.push({
            status: curr.status,
            value: curr.value,
          });
        }
        return acc;
      }, []);

    console.log(filteredPotholes);

    // const pieDataBillboard = filteredBillboards.reduce((acc, curr) => {
    //   const found = acc.find((item) => item.status === curr.status);
    //   if (found) {
    //     found.value += curr.value;
    //   } else {
    //     acc.push({ status: curr.status, value: curr.value });
    //   }
    //   return acc;
    // }, []);
    // console.log("pieBillboard", pieDataBillboard);

    // const pieDataPotholes = filteredPotholes.reduce((acc, curr) => {
    //   const found = acc.find((item) => item.status === curr.status);
    //   if (found) {
    //     found.value += curr.value;
    //   } else {
    //     acc.push({ status: curr.status, value: curr.value });
    //   }
    //   return acc;
    // }, []);
    // console.log("piePothole", pieDataPotholes);

    //initial bar when city is entered
    // const filteredBillboardBar = Object.values(
    //   billboardData
    //     .filter(
    //       (item) => !city || item.city.toLowerCase() === city.toLowerCase()
    //     )
    //     .reduce((acc, item) => {
    //       if (!acc[item.month])
    //         acc[item.month] = { month: item.month, value: 0 };
    //       acc[item.month].value += item.value;
    //       return acc;
    //     }, {})
    // );
    const filteredBillboardBar = Object.values(
      billboardStatsData
        .filter(
          (item) => !city || item.city.toLowerCase() === city.toLowerCase()
        )
        .reduce((acc, item) => {
          if (!acc[item.month])
            acc[item.month] = {
              month: item.month,
              value: 0,
              status: item.status,
            };
          acc[item.month].value += item.value;
          return acc;
        }, {})
    );
    // const filteredPotholes = potholeData
    // .filter((item) => !city || item.city.toLowerCase() === city.toLowerCase()) // only that city
    // .reduce((acc, curr) => {
    //   const found = acc.find((item) => item.status === curr.status);
    //   if (found) {
    //     found.value += curr.value;
    //   } else {
    //     acc.push({
    //       status: curr.status,
    //       value: curr.value,
    //     });
    //   }
    //   return acc;
    // }, []);
    const pieDataBillboard = filteredBillboardBar.reduce((acc, curr) => {
      const found = acc.find((item) => item.status === curr.status);
      if (found) {
        found.value += curr.value;
      } else {
        acc.push({ status: curr.status, value: curr.value });
      }
      return acc;
    }, []);
    console.log("PieBillboardData", pieDataBillboard);
    //  console.log("FilteredBillboardBar",filteredBillboardBar);
    // const filteredPotholeBar = Object.values(
    //   potholeData
    //     .filter(
    //       (item) => !city || item.city.toLowerCase() === city.toLowerCase()
    //     )
    //     .reduce((acc, item) => {
    //       if (!acc[item.month])
    //         acc[item.month] = { month: item.month, value: 0 };
    //       acc[item.month].value += item.value;
    //       return acc;
    //     }, {})
    // );
    const filteredPotholeBar = Object.values(
      potholeStatsData
        .filter(
          (item) => !city || item.city.toLowerCase() === city.toLowerCase()
        )
        .reduce((acc, item) => {
          if (!acc[item.month])
            acc[item.month] = { month: item.month, value: 0 };
          acc[item.month].value += item.value;
          return acc;
        }, {})
    );
    const pieDataPotholes = filteredPotholeBar.reduce((acc, curr) => {
      const found = acc.find((item) => item.status === curr.status);
      if (found) {
        found.value += curr.value;
      } else {
        acc.push({ status: curr.status, value: curr.value });
      }
      return acc;
    }, []);
    console.log("pieDataPotholes", pieDataPotholes);
    console.log("FilteredPothole", filteredPotholeBar);
    console.log("FilteredBillboard", filteredBillboardBar);
    setBillboardPie(pieDataBillboard);
    setPotholesPie(pieDataPotholes);
    setFilteredPotholesData(filteredPotholes);
    setBillboardBar(billboardNewBarData);
    setFilterBillboardCity(filteredBillboardBar);
    setFilterPotholeCity(filteredPotholeBar);

    setDummy(false);
  };

  // const initbillboardPie = Object.values(
  //   billboardData.reduce((acc, item) => {
  //     if (!acc[item.status])
  //       acc[item.status] = { status: item.status, value: 0 };
  //     acc[item.status].value += item.value;
  //     return acc;
  //   }, {})
  // ); inital billboardPieData default data
  const initbillboardPie = Object.values(
    billboardStatsData.reduce((acc, item) => {
      if (!acc[item.status])
        acc[item.status] = { status: item.status, value: 0 };
      acc[item.status].value += item.value;
      return acc;
    }, {})
  );

  // const initbillboardBar = Object.values(
  //   billboardData.reduce((acc, item) => {
  //     if (!acc[item.month]) acc[item.month] = { month: item.month, value: 0 };
  //     acc[item.month].value += item.value;
  //     return acc;
  //   }, {})
  // );
  const initbillboardBar = Object.values(
    billboardStatsData.reduce((acc, item) => {
      if (!acc[item.month]) acc[item.month] = { month: item.month, value: 0 };
      acc[item.month].value += item.value;
      return acc;
    }, {})
  );
  console.log("initBillboardbar", initbillboardBar);

  // const initpotholePie = Object.values(
  //   potholeData.reduce((acc, item) => {
  //     if (!acc[item.status])
  //       acc[item.status] = { status: item.status, value: 0 };
  //     acc[item.status].value += item.value;
  //     return acc;
  //   }, {})
  // ); inital potholePieData default data
  const initpotholePie = Object.values(
    potholeStatsData.reduce((acc, item) => {
      if (!acc[item.status])
        acc[item.status] = { status: item.status, value: 0 };
      acc[item.status].value += item.value;
      return acc;
    }, {})
  );

  // const initpotholeBar = Object.values(
  //   potholeData.reduce((acc, item) => {
  //     if (!acc[item.month]) acc[item.month] = { month: item.month, value: 0 };
  //     acc[item.month].value += item.value;
  //     return acc;
  //   }, {})
  // );
  const initpotholeBar = Object.values(
    potholeStatsData.reduce((acc, item) => {
      if (!acc[item.month]) acc[item.month] = { month: item.month, value: 0 };
      acc[item.month].value += item.value;
      return acc;
    }, {})
  );

  console.log("FilteredBillboardCity", filterBillboardCity);
  console.log("FilteredPothole", filterPotholeCity);
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
              {/* <div className="status-filter">
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
              </div> */}
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
                        // billboardData={billboardBar}
                        potholesData={filteredPotholesData}
                        selectedPotholeStatus={selectedPotholeStatus}
                        setSelectedPotholeStatus={setSelectedPotholeStatus}
                        dummy={dummy}
                        setDummy={setDummy}
                        initBillboardBarData={initbillboardBar}
                        initBillboardPieData={initbillboardPie}
                        initPotholeBarData={initpotholeBar}
                        initPotholePieData={initpotholePie}
                        filterBillboardCity={filterBillboardCity}
                        filterPotholeCity={filterPotholeCity}
                        city={city}
                        billboardStatsData={billboardStatsData}
                        potholeStatsData={potholeStatsData}
                        initpotholePie={initpotholePie}
                        initbillboardPie={initbillboardPie}
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
// const filteredBillboards = billboardData.filter(
//   (item) => item.city.toLowerCase() === city.toLowerCase()
// );

// const filteredPotholes = potholeData.filter(
//   (item) => item.city.toLowerCase() === city.toLowerCase()
// );
// const filterednewBillboards = billboardData
//   .filter(
//     (item) =>
//       (!city || item.city.toLowerCase() === city.toLowerCase()) && // city filter
//       (!selectedBillboardStatus || item.status === selectedBillboardStatus) // status filter
//   )
//   .reduce((acc, { month, value }) => {

//     acc[month] = (acc[month] || 0) + value;
//     return acc;
//   }, {});

// convert object → array for recharts
// const billboardNewBarData = Object.entries(filterednewBillboards).map(
//   ([month, value]) => ({
//     month,
//     value,
//   })
// );

// billboardData
//   .filter(
//     (item) =>
//       (!city || item.city.toLowerCase() === city.toLowerCase()) && // filter by city input
//       (!selectedBillboardStatus || item.status === selectedBillboardStatus) // filter by clicked pie slice
//   )
//   .reduce((acc, curr) => {
//     const found = acc.find((item) => item.month === curr.month);
//     if (found) {
//       found.value += curr.value;
//     } else {
//       acc.push({
//         month: curr.month,
//         value: curr.value,
//         city: curr.city,
//         status: curr.status,
//       });
//     }
//     return acc;
//   }, []);

// billboardData.filter(
//   (item) =>
//     (!selectedBillboardStatus || item.status === selectedBillboardStatus) &&
//     (!city || item.city.toLowerCase() === city.toLowerCase())
// );

// potholeData.filter(
//   (item) =>
//     (!city || item.city.toLowerCase() === city.toLowerCase()) &&
//     (!selectedPotholeStatus || item.status === selectedPotholeStatus)
// );
// potholeData.filter(
//   (item) =>
//     (!selectedPotholeStatus || item.status === selectedPotholeStatus) &&
//     (!city || item.city.toLowerCase() === city.toLowerCase())
// );
