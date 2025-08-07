import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Images.css";

const Images = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/images`);
        if (response.ok) {
          const data = await response.json();
          // The data is already sorted by date from the backend
          setImages(data);
        } else {
          console.error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleCardClick = (guid) => {
    // Navigate to the specific report detail page for the clicked image
    navigate(`/report/${guid}`);
  };
  
  const handleViewMore = () => {
    // Increase the number of visible images by 5
    setVisibleCount(prevCount => prevCount + 5);
  };

  const goToBack = () => {
    navigate(-1);
  };
  
  // Create a slice of the images array to only show the visible ones
  const visibleImages = images.slice(0, visibleCount);

  return (
    <>
      <div className="back-btn">
        <button onClick={goToBack}>Back</button>
      </div>
      <div className="image-container">
        <div className="image-head">
          <h1>Images Dashboard</h1>
          <select name="sort" id="sort">
            <option value="">Sort by</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
        
        {isLoading ? (
          <p>Loading images...</p>
        ) : (
          <div className="image-card-container">
            {visibleImages.map((item) => (
              <div
                className="image-card"
                key={item.guid}
                onClick={() => handleCardClick(item.guid)}
                style={{ cursor: "pointer" }}
              >
                <img src={item.image_url} alt={item.image_name} />
                <div className="image-card-details">
                  <span>Timestamp: {new Date(item.created_at).toLocaleString()}</span>
                  <span>Location: {item.location_text || "N/A"}</span>
                  <span>Status: {item.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Only show the "View More" button if there are more images to display */}
        {!isLoading && visibleCount < images.length && (
          <div className="more-image">
            <button onClick={handleViewMore}>View More</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Images;
