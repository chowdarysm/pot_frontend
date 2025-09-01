import homeImage from "../assets/images/homeIcon.png";
import { MdPhotoCamera } from "react-icons/md";
import { FaBrain } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { MdReportProblem } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { GoFileSubmodule } from "react-icons/go";
import { MdOutlineSupportAgent } from "react-icons/md";
import React, { useState, useEffect } from "react";
import highwayImage from "../assets/images/highway.png";
import constructionImage from "../assets/images/construction.png";
import billboardImage from "../assets/images/billboard-img.png";
import potholeImage from "../assets/images/pothole.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [reportData, setReportData] = useState([]); // Initialize with an empty array
  const [reportData2, setReportData2] = useState([]); // Initialize with an empty array
  const [reportData3, setReportDataToday] = useState([]); // Initialize with an empty array
  const [reportData4, setReportRecentUpdates] = useState([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any fetch errors

  useEffect(() => {
    const fetchDetailedReport = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/detailed_report_data?category=${"billboard"}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedReport();

    const fetchTotalPotholes = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get_pothole_reports`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        console.log("Pothole data", data);
        console.log("Pothole data count", data.length);
        setReportData2(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalPotholes();

    const fetchTodayTotalProcessed = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get_today_processed_reports`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setReportDataToday(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayTotalProcessed();

    const fetchRecentUpdates = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get_total_processed_reports`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        console.log("Api data", data);
        data.forEach((item, index) => {
          if (item.location_text) {
            console.log("Location", item.location_text);
            const [lang, long] = item.location_text.split(" ");
            console.log(`Item ${index} → Lang: ${lang}, Long: ${long}`);
          }
          //console.log("Location", item.location_text);
          //const locString = item.location_text.split(" ");
          //const lang = locString[0];
          //const long = locString[1];
          //console.log("Lang and long", lang + " " + long);
        });
        setReportRecentUpdates(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentUpdates();
  }, []);

  const homeData = [
    {
      id: 1,
      title: "Total Billboards Detected",
      count: reportData.length || 0,
    },
    {
      id: 2,
      title: "Unauthorized Billboards",
      count: reportData.filter((item) => item.approved === 0).length,
    },
    {
      id: 3,
      title: "Potholes Identified ",
      count: reportData2.length || 0,
    },
    {
      id: 4,
      title: "Construction Zones Identified",
      count: 8,
    },
    {
      id: 5,
      title: "Missing Guardrails Detected",
      count: 14,
    },
    {
      id: 6,
      title: "Damaged Guardrails Detected",
      count: 14,
    },
  ];
  const featureData = [
    // { id: 1, icon: MdPhotoCamera, title: "Real-Time Image/Video Capture" },
    // { id: 2, icon: MdReportProblem, title: "Real-Time Reports" },
    { id: 1, icon: MdOutlineSupportAgent, title: "Events History" },
    {
      id: 2,
      icon: FaVideo,
      title: "Videos",
    },
    { id: 3, icon: FaImage, title: "Images" },
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
          <img src={homeImage} alt="Home" />
          <h1>
            {" "}
            AI-Powered Detection, Real-time Alerts and Actionable Insights
          </h1>
        </div>
        <div className="parent-home-data-container">
          <div className="home-data-container">
            {homeData.map((item, id) => (
              <div className="home-data-card" key={id}>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  {item.title}
                </span>
                <span style={{ fontSize: "1.8rem", fontWeight: "800" }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
          <div className="home-data-stats">
            <div className="home-proccessed-data">
              <div
                style={{
                  padding: "10px",
                  // backgroundColor: "#35b9c7",
                  // color: "white",
                  fontWeight: "700",
                  borderRadius: "20px",
                }}
              >
                <h3 style={{ textAlign: "right" }}>
                  Total Files Processed Today
                </h3>
                <p
                  style={{
                    textAlign: "right",

                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "green",
                    // textAlign: "right",
                  }}
                >
                  {reportData3.length}
                </p>
              </div>
              {/* <div className="scan-data"> */}
              <div className="road-scan">
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  No. of Roads Scanned
                </h3>
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "blue",
                    textAlign: "right",
                  }}
                >
                  20
                </p>
              </div>
              <div className="ticket-review">
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  No. of Critical Tickets
                </h3>
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "red",
                    textAlign: "right",
                  }}
                >
                  20
                </p>
              </div>
              {/* </div> */}
            </div>
            {/* <div className="home-view-files">
              <h3>View Files</h3>
              <ul style={{ textAlign: "center", margin: "1rem 0" }}>
                {featureData.map(({ id, icon: Icon, title }) => (
                  <li
                    className="view-files-card"
                    key={id}
                    onClick={() => handlePage(Icon)}
                  >
                    <span
                      color={"#80E612"}
                      style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Icon />
                    </span>
                    <span style={{ fontStyle: "1rem", fontWeight: "600" }}>
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* <div className="feature-container">
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
                <span
                  style={{
                    fontStyle: "1rem",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div> */}
        <div className="updates-container">
          <div className="left-update">
            <h1 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
              Recent Updates - {reportData4.length}
            </h1>
            <div className="update-card-container">
              {reportData4.map((item, index) => (
                <div className="update-card" key={index}>
                  <div className="update-img">
                    <img src={item.image_url} alt="Report" />
                  </div>
                  <div className="update-card-detail">
                    <table style={{ width: "100%", background: "inherit" }}>
                      <thead>
                        <tr>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Location:
                          </th>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Timestamp:
                          </th>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Category:
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {item.location_text}
                          </td>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {item.category}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/*
            <div className="update-card-container">             
                <div className="update-card" >
                  <div className="update-img">
                    <img src={image} />
                  </div>
                  <div className="update-card-detail">
                    <table style={{ width: "100%", background: "inherit" }}>
                      <thead>
                        <tr>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Location:{" "}
                          </th>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Timestamp:{" "}
                          </th>
                          <th style={{ border: "none", textAlign: "left" }}>
                            Category:{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {location}
                          </td>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {timestamp}
                          </td>
                          <td style={{ border: "none", textAlign: "left" }}>
                            {category}
                          </td>
                        </tr>
                      </tbody>
                    </table>                   
                  </div>
                </div>           
            </div>

*/}
          </div>
          <div className="right-update">
            <div className="home-view-files">
              <div
                className="view-file-head"
                style={{
                  paddingBottom: "3px",
                  borderBottom: "1px solid grey",
                }}
              >
                <span style={{ alignSelf: "center", paddingTop: "4px" }}>
                  <GoFileSubmodule />
                </span>
                <h3>View Files</h3>
              </div>

              <ul style={{ textAlign: "center", margin: "1rem 0" }}>
                {featureData.map(({ id, icon: Icon, title }) => (
                  <li
                    className="view-files-card"
                    key={id}
                    onClick={() => handlePage(Icon)}
                  >
                    <span
                      color={"#80E612"}
                      style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Icon />
                    </span>
                    <span style={{ fontStyle: "1rem", fontWeight: "600" }}>
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
