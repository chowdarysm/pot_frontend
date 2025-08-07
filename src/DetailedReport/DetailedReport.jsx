import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailedReport.css";

const DetailedReport = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the category from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    if (!category) {
      setIsLoading(false);
      return;
    }

    const fetchDetailedReport = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/detailed_report_data?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          setReportData(data);
        } else {
          console.error("Failed to fetch detailed report");
        }
      } catch (error) {
        console.error("Error fetching detailed report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedReport();
  }, [category]);

  const getCategoryTitle = (cat) => {
    if (!cat) return "Detailed Report";
    return `Detailed ${cat.charAt(0).toUpperCase() + cat.slice(1)} Report`;
  };

  if (isLoading) {
    return <p>Loading detailed report...</p>;
  }
  
  if (!category || !reportData) {
    return (
        <div>
            <p>No category selected or no data found.</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
  }

  return (
    <>
      <div className="detailed-report-container">
        <div className="billboard-data">
          <h1>{getCategoryTitle(category)}</h1>
          {/* The summary table can be made dynamic later if needed */}
          <table>
            <thead>
              <tr><th colSpan={4}>Summary</th></tr>
              <tr>
                <th>Total Detected</th>
                <th>Approved</th>
                <th>Unapproved</th>
                <th>Damage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.length}</td>
                <td>{reportData.filter(item => item.approved === 1).length}</td>
                <td>{reportData.filter(item => item.approved === 0).length}</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="detailed-report-data-container">
          <div className="detailed-report-data">
            <table>
              <thead>
                <tr>
                  <th colSpan={4}>Detail (Showing 5 Most Recent)</th>
                </tr>
                <tr>
                  <th>Last processed date</th>
                  <th>File name</th>
                  <th>Location</th>
                  <th>Image File</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item) => (
                  <tr key={item.guid}>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{item.image_name}</td>
                    <td>{item.location_text || "N/A"}</td>
                    <td><a href={item.image_url} target="_blank" rel="noopener noreferrer">Click Here</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedReport;
