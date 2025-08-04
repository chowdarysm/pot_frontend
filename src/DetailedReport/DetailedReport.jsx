import React from "react";
import "./DetailedReport.css";
const DetailedReport = () => {
  return (
    <>
      <div className="detailed-report-container">
        <div className="billboard-data">
          <h1>Detailed Billboard Report</h1>
          <table>
            <thead>
              <tr>
                <th colSpan={4}>Summary</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                <th>Approved</th>
                <th>Unapproved</th>
                <th>Damage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4</td>
                <td>3</td>
                <td>4</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="detailed-report-container">
          <div className="detailed-report-data">
            <table>
              <thead>
                <tr>
                  <th colSpan={4}>Detail</th>
                </tr>
                <tr>
                  <th>Last processed date</th>
                  <th>File name</th>
                  <th>Location</th>
                  <th>Image File</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>28-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.901</td>
                  <td>Click Here</td>
                </tr>
                <tr>
                  <td>28-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.900</td>
                  <td>Click Here</td>
                </tr>
                <tr>
                  <td>28-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.902</td>
                  <td>Click Here</td>
                </tr>
                <tr>
                  <td>27-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.801</td>
                  <td>Click Here</td>
                </tr>
                <tr>
                  <td>27-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.802</td>
                  <td>Click Here</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedReport;
