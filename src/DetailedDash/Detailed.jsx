import React, { useState } from "react";
import "./Detailed.css";
import { IoSearch } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import profileIcon from "../assets/images/profile.png";
import { FaMap } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { TbSelect } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoIosCloud } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoAnalytics } from "react-icons/io5";
import { FaChartSimple } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import { RiTeamFill } from "react-icons/ri";
const Detailed = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);
  const currentData = [];
  const reportData = [
    { id: 1, title: "Report 1" },
    { id: 2, title: "Report 2" },
    { id: 3, title: "Report 3" },
    { id: 4, title: "Report 4" },
    { id: 5, title: "Report 5" },
    { id: 6, title: "Report 6" },
    { id: 7, title: "Report 7" },
    { id: 8, title: "Report 8" },
    { id: 9, title: "Report 9" },
    { id: 10, title: "Report 10" },
    { id: 11, title: "Report 11" },
    { id: 12, title: "Report 12" },
    { id: 13, title: "Report 13" },
    { id: 14, title: "Report 14" },
    { id: 15, title: "Report 15" },
  ];
  const imageData = [
    { id: 1, title: "Report 1" },
    { id: 2, title: "Report 2" },
    { id: 3, title: "Report 3" },
    { id: 4, title: "Report 4" },
    { id: 5, title: "Report 5" },
    { id: 6, title: "Report 6" },
    { id: 7, title: "Report 7" },
    { id: 8, title: "Report 8" },
    { id: 9, title: "Report 9" },
    { id: 10, title: "Report 10" },
    { id: 11, title: "Report 11" },
    { id: 12, title: "Report 12" },
    { id: 13, title: "Report 13" },
    { id: 14, title: "Report 14" },
    { id: 15, title: "Report 15" },
  ];
  const cardData = [
    {
      id: 1,
      icon: FaVideo,
      title: "Videos",
      info: [
        { icon: GoFileDirectoryFill, label: "1,245" },
        { icon: IoIosCloud, label: "75 MB" },
      ],
    },
    {
      id: 2,
      icon: FaImage,
      title: "Images",
      info: [
        { icon: GoFileDirectoryFill, label: "1,245" },
        { icon: IoIosCloud, label: "75 MB" },
      ],
    },
    {
      id: 3,
      icon: MdOutlineSupportAgent,
      title: "Events",
      info: [
        { icon: GoFileDirectoryFill, label: "1,245" },
        { icon: IoIosCloud, label: "75 MB" },
      ],
    },

    {
      id: 4,
      icon: FaFile,
      title: "Reports",
      info: [
        { icon: GoFileDirectoryFill, label: "1,245" },
        { icon: IoIosCloud, label: "75 MB" },
      ],
    },
  ];
  const cardBData = [
    {
      id: 1,
      icon: FaImage,
      info: [
        {
          icon: MdReportProblem,
          label: "Unauthorised Billboards",
        },
      ],
    },
    {
      id: 2,
      icon: FaImage,

      info: [
        {
          icon: FaMap,
          label: "Pothole Report",
        },
      ],
    },
    {
      id: 3,
      icon: FaImage,
      info: [
        {
          icon: FaImage,
          label: "Unsafe Zone",
        },
      ],
    },
    {
      id: 4,
      icon: FaImage,

      info: [
        {
          icon: FaLocationDot,
          label: "Construction Site",
        },
      ],
    },
    {
      id: 5,
      icon: FaImage,

      info: [
        {
          icon: FaImage,
          label: " Historical Records",
        },
      ],
    },
    {
      id: 6,
      icon: FaImage,

      info: [
        {
          icon: MdReportProblem,
          label: " Weekly Summary",
        },
      ],
    },
    {
      id: 7,
      icon: FaImage,

      info: [
        {
          icon: FaFile,
          label: "Reports.docx",
        },
      ],
    },
    {
      id: 8,
      icon: FaImage,

      info: [
        {
          icon: FaImage,
          label: " Authorised Billboards list",
        },
      ],
    },
  ];
  const goToBillboard = () => {
    navigate("/billboards");
  };
  const goToPotholes = () => {
    navigate("/potholes");
  };
  const goToCardReport = () => {
    navigate("/potholereport");
  };
  const goToForm = () => {
    navigate("/form");
  };
  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const handlecardClick = (title) => {
    console.log(`Event of ${title} clicked!`);
    if (title === "Videos") {
      console.log("Event of Videos clicked");
      navigate("/videos");
    } else if (title === "Events") {
      console.log("Event of Events clicked");
      navigate("/events");
    }
  };
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const userName = storedUser.name.split(" ")[0];
  const userName = storedUser.name;
  const userEmail = storedUser.email;
  return (
    <>
      {/* <div className="detailed-navbar">
        <div className="left-detailed-nav"></div>
        <div className="right-detailed-nav">
          <div className="right-nav-content">
            <div className="detailed-logo">
              <ul>
                <li style={{ alignSelf: "center", gap: "15px" }}>
                  <span>
                    {" "}
                    <FaMap />
                  </span>
                  PROACTIX Dashboard
                </li>
              </ul>
            </div>
            <div className="search">
              <span className="search-icon">
                <IoSearch />
              </span>
              <input placeholder="Report an issue" type="text" />
            </div>
            <div className="nav-icon">
              <ul>
                <li>
                  <span>
                    <FaQuestionCircle />
                  </span>
                </li>
                <li>
                  <span>
                    <FaBell />
                  </span>
                </li>
                <li>
                  <span>
                    <IoSettingsSharp />
                  </span>
                </li>
                <li>
                  <span className="profile-img-icon">
                    <img src={profileIcon} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className="dash-container">
        <div className="left-dash-content">
          <div className="left-dash-container">
            <div className="upper-profile">
              <div className="profile">
                <img src={profileIcon} />
                <div className="profile-details">
                  <p style={{ fontSize: "1rem", fontWeight: "700" }}>
                    {userName}
                  </p>
                  <p style={{ fontSize: "12px", fontWeight: "600" }}>
                    {userEmail}
                  </p>
                </div>
              </div>
              <div className="settings">
                <ul>
                  <li>
                    <span>
                      <FaMap />
                    </span>
                    Overview
                  </li>
                  <li>
                    <span>
                      <MdReportProblem />
                    </span>
                    Report
                  </li>
                  <li>
                    <span>
                      <TbSelect />{" "}
                    </span>
                    Issues
                  </li>
                  <li>
                    <span>
                      <RiTeamFill />
                    </span>
                    Team
                  </li>
                  <li>
                    <span>
                      <FaNoteSticky />
                    </span>
                    Notes
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-profile">
              <ul>
                <li>
                  <span>
                    <IoMdSettings />
                  </span>{" "}
                  Settings
                </li>
                <li>
                  {" "}
                  <span>
                    <IoLogOutOutline />
                  </span>
                  Log out
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="right-dash-container">
          <div className="inner-right-dash">
            <div className="head">Reported Issues 2025</div>
            <div className="filter-tab">
              <div className="left-filter">
                <ul>
                  <li>
                    Overview{" "}
                    <span>
                      <IoChevronDown />
                    </span>
                  </li>
                </ul>
              </div>
              {/* <div className="right-filter">
                <ul>
                  <li>
                    <FaFilter />
                  </li>
                  <li>
                    <FaRegEye />
                  </li>
                  <li>
                    <IoMdInformationCircleOutline />
                  </li>
                  <li>
                    <button>Sort</button>
                  </li>
                  <li>
                    <button>View</button>
                  </li>
                  <li>
                    <button>Filter</button>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="report-container">
              <div className="inner-report">
                <div className="upper-report">
                  {cardData.map(({ id, icon: Icon, title, info }) => (
                    <div
                      className="card"
                      key={id}
                      onClick={() => handlecardClick(title)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="image">
                        <span>
                          <Icon />
                        </span>
                      </div>
                      <div className="card-info">
                        <h3>{title}</h3>
                        <ul>
                          {info.map((item, idx) => {
                            const InfoIcon = item.icon;
                            return (
                              <li key={idx}>
                                <span>
                                  <InfoIcon />
                                </span>
                                {item.label}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lower-report">
                  <div className="lower-head">
                    <ul>
                      <li>
                        Reports{" "}
                        <span>
                          <IoChevronDown />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="lower-card-report">
                    {cardBData.map(({ id, icon: Icon, info }) => (
                      <div
                        className="card"
                        key={id}
                        onClick={goToCardReport}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="image">
                          <span>
                            <Icon />
                          </span>
                        </div>
                        <div className="card-info">
                          <ul>
                            {info.map((item, index) => {
                              const InfoIcon = item.icon;
                              return (
                                <li key={index}>
                                  <span>
                                    <InfoIcon />
                                  </span>{" "}
                                  {item.label}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ))}
                    {/* <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <MdReportProblem />
                            </span>{" "}
                            Unauthorised Billboards
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaMap />
                            </span>{" "}
                            Pothole Report
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaMap />
                            </span>{" "}
                            Unsafe Zone
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaLocationDot />
                            </span>{" "}
                            Construction Site
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaMap />
                            </span>{" "}
                            Historical Records
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaMap />
                            </span>{" "}
                            Weekly Summary
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaFile />
                            </span>{" "}
                            Reports.docx
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <span>
                          <FaImage />
                        </span>
                      </div>
                      <div className="card-info">
                        <ul>
                          <li>
                            <span>
                              <FaImage />
                            </span>{" "}
                            Authorised Billboards list
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="inner-report-filter">
                {/* <div className="filter-head">
                  <ul>
                    <li>
                      <span>
                        <FaFilter />
                      </span>
                      Filter
                    </li>
                  </ul>
                  <span className="cancel-icon">
                    <RxCross2 />
                  </span>
                </div> */}
                <div className="submit-filter">
                  <button onClick={goToForm}>Upload Images</button>
                  <button onClick={goToForm}>Upload Videos</button>
                </div>
                <div className="upper-filter">
                  <h4 style={{ fontWeight: "bolder" }}>Category</h4>
                  <ul>
                    <li style={{ cursor: "pointer" }} onClick={goToBillboard}>
                      {/* <span>✅</span>
                      <span>
                        <FaFile />
                      </span> */}
                      <span>Billboard</span>
                    </li>
                    <li style={{ cursor: "pointer" }} onClick={goToPotholes}>
                      {" "}
                      {/* <span>✅</span>
                      <span>
                        <MdReportProblem />
                      </span> */}
                      <span>Potholes</span>
                    </li>
                    <li>
                      {" "}
                      {/* <span>✅</span>
                      <span>
                        <FaMap />
                      </span> */}
                      <span>Construction Sites</span>
                    </li>
                    <li>
                      {" "}
                      {/* <span>✅</span>
                      <span>
                        <FaImage />
                      </span> */}
                      <span>Missing Guardrails</span>
                      {/*  Potholes, Billbords,Construction, Missing Gard*/}
                    </li>
                    {/* <li>
                      {" "}
                      <span>✅</span>
                      <span>
                        <IoAnalytics />
                      </span>
                      <span>Analytics</span>
                    </li> */}
                  </ul>
                </div>
                <div className="lower-filter">
                  <h4 style={{ fontWeight: "bolder" }}>Reports</h4>
                  {/* Reports */}
                  <ul>
                    <li>
                      {" "}
                      {/* <span>✅</span>
                      <span>
                        <FaChartSimple />
                      </span> */}
                      <span>Visuals</span>
                    </li>
                    <li>
                      {" "}
                      {/* <span>✅</span>
                      <span>
                        <RiTeamFill />
                      </span> */}
                      <span>Analytics</span>
                      {/* Visuals, Analytics*/}
                    </li>
                    <li onClick={goToDashboard} style={{ cursor: "pointer" }}>
                      Current Issues
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailed;
