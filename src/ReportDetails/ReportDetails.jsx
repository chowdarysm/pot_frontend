import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ReportDetails.css";
import mapImage from "../assets/images/map-image.jpeg";

const ReportDetails = () => {
  const { guid } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (guid) {
      fetchReportData();
    }
  }, [guid]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/report/${guid}`);
      if (response.ok) {
        const data = await response.json();
        setReport(data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/report/${guid}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchReportData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) return <div>Loading report...</div>;
  if (!report) return <div>Report not found.</div>;

  return (
    <div className="report-details-container">
      <div className="report-main-content">
        <h1>Report #{report.guid}</h1>
        <div className="report-body">
          <div className="report-image-map">
            <img src={report.image_url} alt={report.image_name} className="report-image" />
            <img src={mapImage} alt="Map of the location" className="report-map" />
          </div>
          <div className="report-info">
            <p><strong>Location:</strong> {report.location || report.location_text || "Not Available"}</p>
            <p><strong>Date:</strong> {new Date(report.created_at).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {report.status || "In Progress"}</p>
          </div>
        </div>
      </div>
      <div className="report-actions">
        <h2>Related Actions</h2>
        <button
          onClick={() => updateStatus("Follow-up Inspection")}
          className={report.status === "Follow-up Inspection" ? "selected" : ""}
        >
          Follow-up Inspection
        </button>
        <button
          onClick={() => updateStatus("Repair Crew Sent")}
          className={report.status === "Repair Crew Sent" ? "selected" : ""}
        >
          Send Repair Crew
        </button>
        <button
          onClick={() => updateStatus("Closed")}
          className={report.status === "Closed" ? "selected" : ""}
        >
          Close Report
        </button>
      </div>
    </div>
  );
};

export default ReportDetails;
