import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import construction from "../assets/images/construction.png";
import highway from "../assets/images/highway.png";

const Home = () => {
  const [imageReports, setImageReports] = useState([]);
  const [videoReports, setVideoReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/home_reports`);
      if (response.ok) {
        const data = await response.json();
        setImageReports(data.image_reports || []);
        setVideoReports(data.video_reports || []);
      } else {
        console.error("Failed to fetch reports");
        setImageReports([]);
        setVideoReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="home-header">
          <h1>Dashboard</h1>
          <p>Welcome to the City Monitoring Dashboard</p>
        </div>
        <div className="stats-cards">
          <div className="card">
            <img src={construction} alt="Construction" />
            <div>
              <p>Total Reports</p>
              <h2>{imageReports.length + videoReports.length}</h2>
            </div>
          </div>
          <div className="card">
            <img src={highway} alt="Highway" />
            <div>
              <p>Resolved</p>
              <h2>{[...imageReports, ...videoReports].filter(r => r.status === 'Closed').length}</h2>
            </div>
          </div>
        </div>
        <div className="reports-section">
          <h2>Recent Reports</h2>
          <div className="reports-table">
            <div className="table-header">
              <span>Report ID</span>
              <span>Type</span>
              <span>Date</span>
              <span>Status</span>
              <span>Details</span>
            </div>
            {isLoading ? (
              <p>Loading reports...</p>
            ) : (
              <>
                {videoReports.map((report) => (
                  <div className="table-row" key={`video-${report.guid}`}>
                    <span>{report.guid.substring(0, 8)}...</span>
                    <span>Video</span>
                    <span>{new Date(report.created_at).toLocaleDateString()}</span>
                    <span>
                      <span className={`status ${report.status?.toLowerCase().replace(" ", "-")}`}>
                        {report.status || "N/A"}
                      </span>
                    </span>
                    <span>
                      <Link to={`/videos/${report.guid}`} className="details-link">
                        View
                      </Link>
                    </span>
                  </div>
                ))}
                {imageReports.map((report) => (
                  <div className="table-row" key={`image-${report.guid}`}>
                    <span>{report.guid.substring(0, 8)}...</span>
                    <span>Image</span>
                    <span>{new Date(report.created_at).toLocaleDateString()}</span>
                    <span>
                      <span className={`status ${report.status?.toLowerCase().replace(" ", "-")}`}>
                        {report.status}
                      </span>
                    </span>
                    <span>
                      <Link to={`/reports/${report.guid}`} className="details-link">
                        View
                      </Link>
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
