import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportForm.css";

const ReportForm = () => {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    setIsSubmitting(true);
    setMessage("Uploading... Please wait.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);

    const isVideo = file.type.startsWith("video/");
    const endpoint = isVideo ? "/upload_video" : "/upload";

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Upload successful!");
        setTimeout(() => {
          if (isVideo) {
             navigate(`/videos/${result.video_guid}`);
          } else {
             navigate(`/reports/${result.guid}`);
          }
        }, 2000);
      } else {
        throw new Error(result.detail || "Upload failed.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-form-container">
      <h2>Submit a Report</h2>
      <p>Upload an image or video of the issue.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file-upload">File Upload</label>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (Optional)</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Main St & 2nd Ave"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
      {message && <p className="submission-message">{message}</p>}
    </div>
  );
};

export default ReportForm;
