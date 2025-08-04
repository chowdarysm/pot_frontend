import React from "react";
import "./VideoReport.css";
import { useNavigate } from "react-router-dom";
const VideoReport = () => {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };
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
          Compliance Report of Processed Video
        </h1>
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
                <td>7</td>
                <td>3</td>
                <td>4</td>
                <td>0</td>
                <td>
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
        <div className="video-report2">
          <table>
            <thead>
              <tr>
                <th colSpan={5}>Guardrails Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th>Missing</th>
                {/* <th>Unapproved</th> */}
                <th>Damaged</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7</td>
                <td>3</td>
                <td>4</td>
                <td></td>
                <td>
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
        <div className="video-report3">
          <table>
            <thead>
              <tr>
                <th colSpan={5}>Unsafe Sites Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th></th>
                <th></th>
                <th></th>
                {/* <th>Approved</th>
                <th>Unapproved</th>
                <th>Damage</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
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
        <div className="video-report4">
          <table>
            <thead>
              <tr>
                <th colSpan={5}>Potholes Report</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                {/* <th>Approved</th>
                <th>Unapproved</th>
                <th>Damage</th> */}
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7</td>
                {/* <td>3</td>
                <td>4</td>
                <td>0</td> */}
                <td></td>
                <td></td>
                <td></td>
                <td>
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

export default VideoReport;
