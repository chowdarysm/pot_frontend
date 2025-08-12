import React from "react";
import "./Events.css";
import { useNavigate } from "react-router-dom";
const [reportData, setReportData] = useState([]); // Initialize with an empty array

/*get_total_processed_reports */
const Events = () => {
  const navigate = useNavigate();
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
            <table>
              <thead>
                <tr>
                  <th colSpan={3}>Detail</th>
                </tr>
                <tr>
                  <th>Last processed date</th>
                  <th>File name</th>
                  <th>Location</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>28-Jul-25</td>
                  <td>NH14_2807202505100000.mp4</td>
                  <td>236.687.867.901</td>                 
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
