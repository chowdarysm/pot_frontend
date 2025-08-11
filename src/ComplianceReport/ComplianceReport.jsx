import React, { useState, useEffect } from "react";
import "./ComplianceReport.css";
import { useNavigate } from "react-router-dom";

const ComplianceReport = () => {
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/report_summary`
        );
        if (response.ok) {
          const data = await response.json();
          setSummaryData(data);
        } else {
          console.error("Failed to fetch report summary");
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const goToBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p>Loading compliance report...</p>;
  }

  if (!summaryData) {
    return <p>Could not load report data.</p>;
  }

  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
        <button>Save as PDF</button>
        <button>Save as Excel</button>
        <button>Save as CSV</button>
      </div>
      <div className="video-report-container">
        <h1 style={{ textAlign: "center" }}>
          Compliance Report of Processed Image/Video
        </h1>

        {/* Billboard Report Table */}
        <div className="video-report1">
          <table>
            <thead>
              <tr>
                <th colSpan={5}>Billboard report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th>Approved</th>
                <th>Unapproved</th>
                <th>Damage</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summaryData.billboard.total}</td>
                <td>{summaryData.billboard.approved}</td>
                <td>{summaryData.billboard.unapproved}</td>
                <td>{summaryData.billboard.damage}</td>
                <td style={{ textAlign: "end" }}>
                  <button
                    style={{
                      width: "150px",
                      padding: "10px",
                      backgroundColor: "#00b0f0",

                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    Create Alert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Guardrails Report Table */}
        <div className="video-report2">
          <table>
            <thead>
              <tr>
                <th colSpan={4}>Guardrails Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th>Missing</th>
                <th>Damaged</th>
                {/* <th></th>
                <th></th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summaryData.guardrails.total}</td>
                <td>{summaryData.guardrails.missing}</td>
                <td>{summaryData.guardrails.damaged}</td>
                {/* <td></td> */}
                <td style={{ textAlign: "end" }}>
                  <button
                    style={{
                      width: "150px",
                      padding: "10px",
                      backgroundColor: "#00b0f0",

                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    Create Alert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Unsafe Sites Report Table */}
        <div className="video-report3">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Unsafe Sites Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                {/* <th></th>
                <th></th>
                <th></th>
                <th></th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summaryData.construction.total}</td>
                {/* <td></td>
                <td></td>
                <td></td> */}
                <td style={{ textAlign: "end" }}>
                  <button
                    style={{
                      width: "150px",
                      padding: "10px",
                      backgroundColor: "#00b0f0",

                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    Create Alert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Potholes Report Table */}
        <div className="video-report4">
          <table>
            <thead>
              <tr>
                <th colSpan={4}>Potholes Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th>Approved</th>
                <th>Unapproved</th>
                {/* <th></th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summaryData.potholes.total}</td>
                <td>{summaryData.potholes.approved}</td>
                <td>{summaryData.potholes.unapproved}</td>
                {/* <td></td> */}
                <td style={{ textAlign: "end" }}>
                  <button
                    style={{
                      width: "150px",
                      padding: "10px",
                      backgroundColor: "#00b0f0",

                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    Create Alert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComplianceReport;
