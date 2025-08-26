// src/PotholeReport/PotholeReport.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PotholeReport.css";
import mapImage from "../assets/images/map-image.jpeg";
import Maps from "../Maps/Maps";

const PotholeReport = () => {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { guid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      if (!guid) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/report/${guid}`
        );
        if (response.ok) {
          const data = await response.json();
          setReport(data);
        } else {
          console.error("Failed to fetch report details");
          setReport(null);
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [guid]);

  const handleStatusUpdate = async (newStatus) => {
    if (!report) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/report/${guid}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        // Update the local state to reflect the change immediately
        setReport((prevReport) => ({
          ...prevReport,
          status: responseData.data[0].status,
        }));
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return <p>Loading report...</p>;
  }

  if (!report) {
    return <p>Report not found.</p>;
  }

  // const actionButtons = [
  //   { id: 1, title: "Follow-up Inspection" },
  //   { id: 2, title: "Send Repair Crew" },
  //   { id: 3, title: "Close Report" },
  // ];

  return (
    <>
      <div className="back-btn">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="pothole-report-container">
        <div className="left-pothole-report">
          <h1>Pothole Report #{report.id || guid.substring(0, 5)}</h1>
          <div className="pothole-details">
            <div className="pothole-details-img">
              <img src={report.image_url} alt={report.image_name} />
            </div>
            <div className="pothole-report-desc">
              <p>
                <strong>Reported by:</strong> Dhananjay
              </p>
              <p>
                <strong>Location:</strong> {report.location_text || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(report.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {report.status}
              </p>
            </div>
          </div>
          <div className="pothole-report-map">
            {/* <img src={mapImage} alt="Map location" /> */}
            <Maps locationString={report.location_text} />
          </div>
        </div>
        {/* <div className="right-pothole-report">
          <h1>Related Actions</h1>
          <div className="pothole-button">
            {actionButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleStatusUpdate(btn.title)}
                className={report.status === btn.title ? 'active' : ''}
              >
                {btn.title}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PotholeReport;
