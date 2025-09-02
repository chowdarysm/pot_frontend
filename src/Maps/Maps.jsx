import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Maps = ({ locationString, cityLocation }) => {
  const [location, setLocation] = useState({ lat: 75.781211, lng: 21.034964 });
  //   const [address, setAddress] = useState("");
  //79.424903 21.707997\
  useEffect(() => {
    if (locationString && locationString.includes(" ")) {
      const coords = locationString.split(" ");
      if (coords.length === 2) {
        const lng = parseFloat(coords[0]);
        const lat = parseFloat(coords[1]);
        if (!isNaN(lat) && !isNaN(lng)) {
          setLocation({ lat, lng });
          return;
        }
      }
    }

    //videodetails
    if (cityLocation) {
      if (cityLocation === "Pune") {
        setLocation({ lat: 75.781211, lng: 21.034964 });
      }
      //  else if (cityLocation === "Mumbai") {
      //   setLocation({ lat: 19.076, lng: 72.8777 });
      // }
    }
  }, [locationString, cityLocation]);

  // let locationCoordinates = [];
  // if (locationString && locationString.includes(" ")) {
  //   locationCoordinates = locationString.split(" ");
  // } else {
  //   locationCoordinates = ["75.781211", "21.034964"];
  // }

  // const cityLocationCoord=locationCoordinates
  // const longCoord = parseFloat(locationCoordinates[0]);
  // const latCoord = parseFloat(locationCoordinates[1]);
  // let cityLocationCoord = null;
  // let longCoord = null;
  // let latCoord = null;

  // if (
  //   locationCoordinates.length === 2 &&
  //   !isNaN(parseFloat(locationCoordinates[0])) &&
  //   !isNaN(parseFloat(locationCoordinates[1]))
  // ) {
  //   longCoord = parseFloat(locationCoordinates[0]);
  //   latCoord = parseFloat(locationCoordinates[1]);
  // } else if (locationCoordinates.length === 1) {
  //   cityLocationCoord = locationCoordinates[0];
  // }
  console.log("Lat and long", latCoord + " " + longCoord);
  //   const [location, setLocation] = useState({ lat: 75.781211, lng: 21.034964 });
  // const [location, setLocation] = useState(
  //   locationCoordinates.length == 2
  //     ? { lat: latCoord, lng: longCoord }
  //     : { lat: 75.781211, lng: 21.034964 }
  // );

  // if (cityLocation === "Pune") {
  //   setLocation({ lat: 75.781211, lng: 21.034964 });
  // }

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
