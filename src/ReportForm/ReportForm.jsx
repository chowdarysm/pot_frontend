import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReportForm.css";
const ReportForm = () => {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate("/videoreport");
  };

  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div class="report-form-container">
        <div class="form-container">
          <div class="head">
            <h1>Submit a New Image/Video</h1>
          </div>
          <div class="input-form">
            <div
              className="category"
              style={{ display: "flex", gap: "3rem", marginTop: "1.2rem" }}
            >
              <label htmlFor="category" style={{ paddingTop: "5px" }}>
                Category
              </label>
              <select name="category" id="category" style={{ padding: "8px" }}>
                <option value="">Select category</option>
                <option value="billboard">Billboards</option>
                <option value="potholes">Potholes</option>
                <option value="construction">Construction sites</option>
                <option value="guardrails">Missing Guardrails</option>
              </select>
            </div>

            {/* <input
              type="text"
              placeholder="Type of Hazard"
              class="form-input"

            /> */}
            {/* Location eg: 32° 18.385’ N 122° 36.875’ W */}

            <br />
            <div
              className="location"
              style={{ display: "flex", marginTop: "1rem", gap: "3.1rem" }}
            >
              <label htmlFor="" style={{ paddingTop: "5px" }}>
                Location
              </label>
              <input
                type="text"
                placeholder="32° 18.385’ N 122° 36.875’ W"
                class="form-input"
              />
            </div>

            <br />
            <div
              className="description"
              style={{ display: "flex", gap: "2rem" }}
            >
              <label htmlFor="" style={{ paddingTop: "5px" }}>
                Description
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Description"
              ></textarea>
            </div>
            <div class="upload">
              <label class="custom-file-input">
                Select File
                <input type="file" id="fileInput" />
              </label>
              <span class="file-name" id="fileName">
                No file chosen
              </span>
            </div>
            <div class="form-btn">
              <button onClick={goToPage} style={{ cursor: "pointer" }}>
                Process Image/Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportForm;
