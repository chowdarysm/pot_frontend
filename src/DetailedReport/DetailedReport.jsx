import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailedReport.css";

const DetailedReport = () => {
  const [reportData, setReportData] = useState([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any fetch errors
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the category from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    // Only fetch if a category is present
    if (!category) {
      setError("No category was selected.");
      setIsLoading(false);
      return;
    }

    const fetchDetailedReport = async () => {
      setIsLoading(true);
      setError(null); // Reset error on a new fetch
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/detailed_report_data?category=${category}`
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
  }, [category]);

  const getCategoryTitle = (cat) => {
    if (!cat) return "Detailed Report";
    // console.log(getCategoryTitle(category));
    return `Detailed ${cat.charAt(0).toUpperCase() + cat.slice(1)} Report`;
  };

  // Show a loading message while fetching data
  if (isLoading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading detailed report...
      </p>
    );
  }
  console.log(category);
  // console.log(getCategoryTitle(category));
  // Show a clear error message if the fetch failed
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Could Not Load Report</h2>
        <p>Error: {error}</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
          Go Back
        </button>
      </div>
    );
  }
  const show1 = category !== "potholes" && category !== "construction;";
  const show2 = category !== "potholes" && category !== "construction;";

  return (
    <>
      <div className="back-btn" style={{ padding: "1rem", textAlign: "left" }}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="detailed-report-container">
        <div className="billboard-data">
          <h1>{getCategoryTitle(category)}</h1>
          <table>
            <thead>
              <tr>
                <th colSpan={show1 ? 4 : 1}>Summary</th>
              </tr>
              <tr>
                <th>Total Detected</th>
                {show1 && <th>Approved</th>}
                {show1 && <th>Unapproved</th>}
                {show1 && <th>Damage</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.length}</td>
                {show1 && (
                  <td>
                    {reportData.filter((item) => item.approved === 1).length}
                  </td>
                )}
                {show1 && (
                  <td>
                    {reportData.filter((item) => item.approved === 0).length}
                  </td>
                )}

                {show1 && <td>0</td>}
              </tr>
            </tbody>
          </table>
          {/* {category === "potholes" || category === "construction" ? (
            <table>
              <thead>
                <tr>
                  <th colSpan={1}>Summary</th>
                </tr>
                <tr>
                  <th>Total Detected</th>
                  {/* <th>Approved</th>
                  <th>Unapproved</th>
                  <th>Damage</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reportData.length}</td>
                  {/* <td>
                    {reportData.filter((item) => item.approved === 1).length}
                  </td>
                  <td>
                    {reportData.filter((item) => item.approved === 0).length}
                  </td>
                  <td>0</td> 
                </tr>
              </tbody>
            </table>
          ) : (
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
                  <td>{reportData.length}</td>
                  <td>
                    {reportData.filter((item) => item.approved === 1).length}
                  </td>
                  <td>
                    {reportData.filter((item) => item.approved === 0).length}
                  </td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          )} */}
          {/* <h1>getCategoryTitle(category)</h1> */}
          {/* {getCategoryTitle(category) === "Pothole" ||
          getCategoryTitle(category) === "Construction" ? (
            <>
            <h1>{getCategoryTitle(category)}</h1>
            <table>
              <thead>
                <tr>
                  <th colSpan={1}>Summary</th>
                </tr>
                <tr>
                  <th>Total Detected</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reportData.length}</td>
                  
                </tr>
              </tbody>
            </table></>
            
          ) : (
            <>
            <h1>{getCategoryTitle(category)}</h1>
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
                  <td>{reportData.length}</td>
                  <td>
                    {reportData.filter((item) => item.approved === 1).length}
                  </td>
                  <td>
                    {reportData.filter((item) => item.approved === 0).length}
                  </td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
            </>
            
          )} */}
          {/* <table>
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
                <td>{reportData.length}</td>
                <td>
                  {reportData.filter((item) => item.approved === 1).length}
                </td>
                <td>
                  {reportData.filter((item) => item.approved === 0).length}
                </td>
                <td>0</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div className="detailed-report-data-container">
          <div className="detailed-report-data">
            {category === "potholes" || category === "construction" ? (
              <table>
                <thead>
                  <tr>
                    <th colSpan={5}>Detailed </th>
                  </tr>
                  <tr>
                    <th>Last processed date</th>
                    <th>File name</th>
                    <th>Location</th>
                    {/* <th>Status</th> */}
                    <th>Image File</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.length > 0 ? (
                    reportData.map((item) => (
                      <tr key={item.guid}>
                        <td>
                          {new Date(item.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{item.image_name}</td>
                        <td>{item.location_text || "N/A"}</td>
                        {/* <td>{item.approved === 1 ? "Approved" : "Unapproved"}</td> */}
                        <td>
                          <a
                            href={item.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click Here
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No reports found for this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th colSpan={5}>Detailed </th>
                  </tr>
                  <tr>
                    <th>Last processed date</th>
                    <th>File name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Image File</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.length > 0 ? (
                    reportData.map((item) => (
                      <tr key={item.guid}>
                        <td>
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td>{item.image_name}</td>
                        <td>{item.location_text || "N/A"}</td>
                        <td>
                          {item.approved === 1 ? "Approved" : "Unapproved"}
                        </td>
                        <td>
                          <a
                            href={item.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click Here
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No reports found for this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {/* <table>
              <thead>
                <tr>
                  <th colSpan={5}>Detailed </th>
                </tr>
                <tr>
                  <th>Last processed date</th>
                  <th>File name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Image File</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((item) => (
                    <tr key={item.guid}>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>{item.image_name}</td>
                      <td>{item.location_text || "N/A"}</td>
                      <td>{item.approved === 1 ? "Approved" : "Unapproved"}</td>
                      <td>
                        <a
                          href={item.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No reports found for this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedReport;
