import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Detailed.css";

// Component-specific assets
import profileIcon from "../assets/images/profile.png";

// --- Corrected & Organized Icon Imports ---
import { FaMap, FaVideo, FaImage, FaFile } from "react-icons/fa";
import { FaNoteSticky, FaLocationDot } from "react-icons/fa6";
import { MdReportProblem, MdOutlineSupportAgent } from "react-icons/md";
import { TbSelect } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { IoMdSettings, IoIosCloud } from "react-icons/io";
import { IoLogOutOutline, IoChevronDown } from "react-icons/io5";
import { GoFileDirectoryFill } from "react-icons/go";

const Detailed = () => {
  const navigate = useNavigate();
  const [latestReports, setLatestReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Static Data for "Folders" (from your original code) ---
  const cardData = [
    { id: 1, icon: FaVideo, title: "Videos", info: [{ icon: GoFileDirectoryFill, label: "1,245" }, { icon: IoIosCloud, label: "75 MB" }] },
    { id: 2, icon: FaImage, title: "Images", info: [{ icon: GoFileDirectoryFill, label: "1,245" }, { icon: IoIosCloud, label: "75 MB" }] },
    { id: 3, icon: MdOutlineSupportAgent, title: "Events", info: [{ icon: GoFileDirectoryFill, label: "1,245" }, { icon: IoIosCloud, label: "75 MB" }] },
    { id: 4, icon: FaFile, title: "Reports", info: [{ icon: GoFileDirectoryFill, label: "1,245" }, { icon: IoIosCloud, label: "75 MB" }] },
  ];
  
  const cardBData = [
      { id: 1, icon: FaImage, label: "Unauthorised Billboards", labelIcon: MdReportProblem },
      { id: 2, icon: FaImage, label: "Pothole Report", labelIcon: FaMap },
      { id: 3, icon: FaImage, label: "Unsafe Zone", labelIcon: FaImage },
      { id: 4, icon: FaImage, label: "Construction Site", labelIcon: FaLocationDot },
      { id: 5, icon: FaImage, label: "Historical Records", labelIcon: FaImage },
      { id: 6, icon: FaImage, label: "Weekly Summary", labelIcon: MdReportProblem },
      { id: 7, icon: FaImage, label: "Reports.docx", labelIcon: FaFile },
      { id: 8, icon: FaImage, label: "Authorised Billboards list", labelIcon: FaImage },
  ];
  
  // --- Dynamic Data Fetching ---
  useEffect(() => {
    // ... (This section is unchanged and correct)
    const fetchLatestReports = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/latest_reports`);
        if (response.ok) {
          const data = await response.json();
          setLatestReports(data);
        } else { console.error("Failed to fetch latest reports"); }
      } catch (error) { console.error("Error fetching latest reports:", error); } 
      finally { setIsLoading(false); }
    };
    fetchLatestReports();
  }, []);

  // --- Navigation & Event Handlers ---
  const handleCardClick = (report) => {
    // ... (This section is unchanged and correct)
    if (report.type === "video") { navigate(`/video/${report.guid}`); } 
    else if (report.type === "image") { navigate(`/report/${report.guid}`); }
  };
  
  const handleStaticCardClick = (title) => {
    if (title === "Videos") navigate("/videos");
    else if (title === "Images") navigate("/images");
    else if (title === "Events") navigate("/events");
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser ? storedUser.name : "User";
  const userEmail = storedUser ? storedUser.email : "user@example.com";
  const goToForm = () => navigate("/form");
  const goToBillboard = () => navigate("/billboards");
  const goToPotholes = () => navigate("/potholes");
  const goToDashboard = () => navigate("/dashboard");

  return (
    <div className="dash-container">
      {/* --- Left Sidebar (Restored) --- */}
      <div className="left-dash-content">
        <div className="left-dash-container">
          <div className="upper-profile">
            <div className="profile"><img src={profileIcon} alt="Profile" /><div className="profile-details"><p style={{ fontSize: "1rem", fontWeight: "700" }}>{userName}</p><p style={{ fontSize: "12px", fontWeight: "600" }}>{userEmail}</p></div></div>
            <div className="settings"><ul><li><span><FaMap /></span>Overview</li><li><span><MdReportProblem /></span>Report</li><li><span><TbSelect /></span>Issues</li><li><span><RiTeamFill /></span>Team</li><li><span><FaNoteSticky /></span>Notes</li></ul></div>
          </div>
          <div className="bottom-profile"><ul><li><span><IoMdSettings /></span>Settings</li><li><span><IoLogOutOutline /></span>Log out</li></ul></div>
        </div>
      </div>

      {/* --- Right Content Area (Restored) --- */}
      <div className="right-dash-container">
        <div className="inner-right-dash">
          <div className="head">Reported Issues 2025</div>
          <div className="filter-tab"><div className="left-filter"><ul><li>Overview <span><IoChevronDown /></span></li></ul></div></div>
          <div className="report-container">
            <div className="inner-report">
              {/* --- Top Static Folders (Restored) --- */}
              <div className="upper-report">
                {cardData.map(({ id, icon: Icon, title, info }) => (
                  <div className="card" key={id} onClick={() => handleStaticCardClick(title)} style={{ cursor: "pointer" }}>
                    <div className="image"><span><Icon /></span></div>
                    <div className="card-info"><h3>{title}</h3><ul>{info.map((item, idx) => { const InfoIcon = item.icon; return <li key={idx}><span><InfoIcon /></span>{item.label}</li>; })}</ul></div>
                  </div>
                ))}
              </div>

              {/* --- Bottom Static Folders (Restored) & Dynamic Reports --- */}
              <div className="lower-report">
                 <div className="lower-head"><ul><li>Reports <span><IoChevronDown /></span></li></ul></div>
                 <div className="lower-card-report">
                    {cardBData.map(({ id, icon: Icon, label, labelIcon: LabelIcon }) => (
                        <div className="card" key={id} style={{ cursor: "pointer" }}>
                            <div className="image"><span><Icon /></span></div>
                            <div className="card-info"><ul><li><span><LabelIcon /></span> {label}</li></ul></div>
                        </div>
                    ))}
                 </div>

                 <div className="lower-head" style={{marginTop: '2rem'}}><ul><li>Latest Reports <span><IoChevronDown /></span></li></ul></div>
                 <div className="lower-card-report">
                    {isLoading ? <p>Loading reports...</p> : latestReports.map((report) => (
                      <div className="card" key={report.guid} onClick={() => handleCardClick(report)} style={{ cursor: "pointer" }}>
                        <div className="image">{report.thumbnail_url ? <img src={report.thumbnail_url} alt="report thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }} /> : <span>{report.type === 'video' ? <FaVideo /> : <FaImage />}</span>}</div>
                        <div className="card-info"><ul><li><span>{report.type === 'video' ? <FaVideo /> : <FaImage />}</span>{report.video_name || report.image_name}</li></ul></div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* --- Right Filter Panel (Restored) --- */}
            <div className="inner-report-filter">
              <div className="submit-filter"><button onClick={goToForm}>Upload Images</button><button onClick={goToForm}>Upload Videos</button></div>
              <div className="upper-filter"><h4 style={{ fontWeight: "bolder" }}>Category</h4><ul><li style={{ cursor: "pointer" }} onClick={goToBillboard}><span>Billboard</span></li><li style={{ cursor: "pointer" }} onClick={goToPotholes}><span>Potholes</span></li><li><span>Construction Sites</span></li><li><span>Missing Guardrails</span></li></ul></div>
              <div className="lower-filter"><h4 style={{ fontWeight: "bolder" }}>Reports</h4><ul><li><span>Visuals</span></li><li><span>Analytics</span></li><li onClick={goToDashboard} style={{ cursor: "pointer" }}>Current Issues</li></ul></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;