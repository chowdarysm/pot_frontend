import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Maps = ({ locationString }) => {
  const [address, setAddress] = useState("");
  //79.424903 21.707997
  const locationCoordinates = locationString.split(" ");
  const latCoord = parseFloat(locationCoordinates[0]);
  const longCoord = parseFloat(locationCoordinates[1]);
  console.log("Lat and long", latCoord + " " + longCoord);
  //   const [location, setLocation] = useState({ lat: 75.781211, lng: 21.034964 });
  const [location, setLocation] = useState({ lat: latCoord, lng: longCoord });

  //   const getAddressFromLatLon = async () => {
  //     const apiKey = "AIzaSyDmVFC6Me3Z3Easjr0az77hPQPXp5tRIiY";
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data.status === "OK") {
  //         setAddress(data.results[0].formatted_address);
  //       } else {
  //         setAddress("No address found");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setAddress("Error fetching address");
  //     }
  //   };
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  return (
    <div style={{ textAlign: "center" }}>
      {/* <button
        onClick={getAddressFromLatLon}
        style={{ margin: "10px", padding: "8px 12px" }}
      >
        Get Address
      </button>

      {address && <p>📍 Address: {address}</p>} */}

      <div style={{ height: "400px", width: "100%" }}>
        {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={location}
            zoom={14}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript> */}
        <LoadScript googleMapsApiKey="AIzaSyDmVFC6Me3Z3Easjr0az77hPQPXp5tRIiY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={12}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Maps;
