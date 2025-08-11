import React, { useState, useEffect, useRef } from "react";
import { FaMap } from "react-icons/fa";
import profileIcon from "../assets/images/profile.png";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser.name;
  const userEmail = storedUser.email;
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="navbar-page">
        <Link
          to={"/home"}
          className="logo-heading-div"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span style={{ paddingTop: "3px" }}>
            <FaMap />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            Proactix
          </span>
        </Link>

        <div className="navbar-page-list">
          {/* <ul>
            <li>Dashboard</li>
            <li>Reports</li>
           
            <li><span>
            <img src={profileIcon} />    
            </span></li>
          </ul> */}

          <ul className="navbar-list">
            <Link
              to={"/home"}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <li>Dashboard</li>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <li>Map View</li>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <li>Ticket Review</li>
            </Link>
            <Link
              to={"/reportdetails"}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <li>Reports</li>
            </Link>
            <Link
              to={"/form"}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <li>Upload</li>
            </Link>
            <li
              className="profile-wrapper"
              ref={dropdownRef}
              style={{ cursor: "pointer" }}
            >
              <span onClick={toggleDropdown}>
                <img src={profileIcon} alt="profile" className="profile-icon" />
              </span>

              {isOpen && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <span className="dropdown-icon">
                      <CgProfile />
                    </span>
                    <span className="profile-details">
                      <p style={{ fontSize: "1rem", fontWeight: "700" }}>
                        {userName}
                      </p>
                      <p style={{ fontSize: "12px", fontWeight: "600" }}>
                        {userEmail}
                      </p>
                    </span>
                  </li>

                  <li className="dropdown-item">
                    <span className="dropdown-icon">
                      <IoSettingsSharp />
                    </span>

                    <span>Settings</span>
                  </li>
                  <li className="dropdown-item" onClick={handleLogout}>
                    <span className="dropdown-icon">
                      <IoLogOutOutline />
                    </span>
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
