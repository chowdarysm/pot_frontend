import "./Events.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  const [reportData, setReportData] = useState([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(false); //  Added state for loading
  const [error, setError] = useState(null);          //  Added state for error

  useEffect(() => {    
    const fetchTodayTotalProcessed = async () => {
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
        setReportData(data);
      } catch (err) {
        console.error("Error fetching detailed report:", err);
        setError(err.message); // Store the error message to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayTotalProcessed();
  }, []);

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="event-container">
        <div className="back-btn">
          <button onClick={goToBack}>Back</button>
        </div>        
        <div className="video-container">
          <div className="process-video-data">
            <h1>Processed File Data</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

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
                {reportData.length > 0 ? (
                  reportData.map((item, index) => (
                    <tr key={index}>
                      <td> {new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                      <td>{item.image_name ? item.image_name : item.video_name}</td>
                      <td>{item.location_text || "N/A"}</td>
                      <td> <a
                          href={item.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </a></td>
                    </tr>
                  ))
                ) : (
                  !isLoading && (
                    <tr>
                      <td colSpan="3">No records found</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
