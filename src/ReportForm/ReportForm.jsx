import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReportForm.css";

const ReportForm = () => {
  const navigate = useNavigate();
  
  // State to hold all form data
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    description: ""
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle text and select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!file || !formData.category) {
      toast.error("Please select a category and a file.");
      return;
    }

    setIsProcessing(true);

    const isVideo = file.type.startsWith('video/');
    const endpoint = isVideo ? '/upload_video' : '/upload';
    const submissionData = new FormData();
    submissionData.append("file", file);

    // Only add category and location for images, as the video endpoint doesn't accept them
    if (!isVideo) {
        submissionData.append("category", formData.category);
        submissionData.append("location", formData.location);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("File submitted successfully! Processing has started.");
        
        // Navigate to the correct detail page based on file type
        if (isVideo) {
            // The video endpoint returns a video_guid
            navigate(`/video/${result.video_guid}`);
        } else {
            // The image endpoint returns a guid
            navigate(`/report/${result.guid}`);
        }
      } else {
        const errorData = await response.json();
        toast.error(`Submission failed: ${errorData.detail || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="report-form-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="head">
            <h1>Submit a New Image/Video</h1>
          </div>
          <div className="input-form">
            <div className="category" style={{ display: "flex", gap: "3rem", marginTop: "1.2rem" }}>
              <label htmlFor="category" style={{ paddingTop: "5px" }}>
                Category
              </label>
              <select name="category" id="category" style={{ padding: "8px" }} onChange={handleChange} value={formData.category} required>
                <option value="">Select category</option>
                <option value="billboard">Billboards</option>
                <option value="potholes">Potholes</option>
                <option value="construction">Construction sites</option>
                <option value="guardrails">Missing Guardrails</option>
              </select>
            </div>
            <br />
            <div className="location" style={{ display: "flex", marginTop: "1rem", gap: "3.1rem" }}>
              <label htmlFor="location" style={{ paddingTop: "5px" }}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., 32° 18.385’ N 122° 36.875’ W or street address"
                className="form-input"
                onChange={handleChange}
                value={formData.location}
              />
            </div>
            <br />
            <div className="description" style={{ display: "flex", gap: "2rem" }}>
              <label htmlFor="description" style={{ paddingTop: "5px" }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                cols="30"
                rows="10"
                placeholder="Internal notes (will not be saved to the database)"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
            {/* --- CORRECTED FILE INPUT --- */}
            <div className="upload">
              <label htmlFor="fileInput" className="custom-file-input">
                Select File
              </label>
              <input 
                type="file" 
                id="fileInput" 
                onChange={handleFileChange} 
                accept="image/*,video/*"
                style={{ display: 'none' }} // Hide the default input
              />
              <span className="file-name" id="fileName">
                {fileName}
              </span>
            </div>
            <div className="form-btn">
              <button type="submit" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Process Image/Video"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportForm;
