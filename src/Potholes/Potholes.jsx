import React from "react";
import { IoSearch } from "react-icons/io5";
import "./Potholes.css";
import AsideBar from "../AsideBar/AsideBar";
import { MdReportProblem } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Potholes = () => {
  const navigate = useNavigate();
  const billboardData = [
    {
      id: 1,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_01",
      date: "21 June,2025",
      location: "MG Road, Pune, Maharashtra",
      dimensions: "20ft x 10ft",
    },
    {
      id: 2,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_02",
      date: "21 June,2025",
      location: "Phoenix Mall, Bangalore",
      dimensions: "20ft x 10ft",
    },
    {
      id: 3,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_03",
      date: "21 June,2025",
      location: "NH44, Near Delhi Border",
      dimensions: "20ft x 10ft",
    },
    {
      id: 4,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_04",
      date: "21 June,2025",
      location: "Viman Nagar, Pune",
      dimensions: "20ft x 10ft",
    },
    {
      id: 5,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_05",
      date: "21 June,2025",
      location: "Mumbai Airport Entrance",
      dimensions: "20ft x 10ft",
    },
    {
      id: 6,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_06",
      date: "21 June,2025",
      location: "Hitech City, Hyderabad",
      dimensions: "20ft x 10ft",
    },
    {
      id: 7,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_07",
      date: "21 June,2025",
      location: "Sindhi Camp Bus Stand, Jaipur",
      dimensions: "20ft x 10ft",
    },
    {
      id: 8,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_08",
      date: "21 June,2025",
      location: "Phoenix Mall, Bangalore",
      dimensions: "20ft x 10ft",
    },
    {
      id: 9,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_09",
      date: "21 June,2025",
      location: "Howrah Station, Kolkata",
      dimensions: "20ft x 10ft",
    },
    {
      id: 10,
      imageSrc:
        "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
      title: "Billboard_10",
      date: "21 June,2025",
      location: "Avinashilingam University, Coimbatore",
      dimensions: "20ft x 10ft",
    },
  ];
  const handleCard = () => {
    // console.log("button Clicked!");
    navigate("/potholereport");
  };
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="potholes-container">
        <div
          className="left-potholes"
          style={{ width: "20%", backgroundColor: "#d5f4f9", height: "100vh" }}
        >
          <AsideBar />
        </div>

        <div className="right-potholes" style={{ width: "80%" }}>
          <div className="inner-right-potholes">
            <div className="potholes-right-top">
              <div className="potholes-search">
                <span className="search-icon">
                  <IoSearch />
                </span>
                <input
                  placeholder="Search Billboards"
                  type="text"
                  className="potholes-search-input"
                />
              </div>
            </div>
            <div className="pothole-summary" style={{ marginTop: "2rem" }}>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  textAlign: "left",
                }}
              >
                Potholes Summary
              </h1>
            </div>
            <div
              className="potholes-mid-container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="potholes-mid">
                <h1>Reviewed Potholes</h1>
                <div className="potholes-box">
                  <div className="box-top-icon">
                    <span>
                      <IoLocationSharp />
                    </span>
                    <span>
                      <MdReportProblem />
                    </span>
                  </div>
                  <div className="box-desc">
                    <h4>Potholes info</h4>
                    <p>15 reports</p>
                  </div>
                </div>
              </div>
              <div className="potholes-mid">
                <h1>Fixed Potholes</h1>
                <div className="potholes-box">
                  <div className="box-top-icon">
                    <span>
                      <IoLocationSharp />
                    </span>
                    <span>
                      <MdReportProblem />
                    </span>
                  </div>
                  <div className="box-desc">
                    <h4>Potholes info</h4>
                    <p>15 reports</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="potholes-details">
              <h1>Details</h1>
              <div className="details-container">
                {billboardData.map((item, id) => (
                  <div className="potholes-card" key={id} onClick={handleCard}>
                    <div className="potholes-img">
                      <img src={item.imageSrc} />
                    </div>
                    <p>{item.title}</p>
                    <p>{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Potholes;
