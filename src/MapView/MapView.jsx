import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./MapView.css";

const center = {
  lat: 18.5204,
  lng: 73.8567,
};

const locations = [
  { city: "Pune", category: "billboard", lat: 18.5204, lng: 73.8567 },
  { city: "Pune", category: "pothole", lat: 18.53, lng: 73.844 },
  { city: "Pune", category: "billboard", lat: 18.54, lng: 73.87 },
  { city: "Pune", category: "pothole", lat: 18.55, lng: 73.86 },
  { city: "Pune", category: "billboard", lat: 18.56, lng: 73.85 },
  { city: "Mumbai", category: "billboard", lat: 19.076, lng: 72.8777 },
  { city: "Mumbai", category: "pothole", lat: 19.085, lng: 72.87 },
  { city: "Mumbai", category: "billboard", lat: 19.095, lng: 72.88 },
  { city: "Mumbai", category: "pothole", lat: 19.1, lng: 72.89 },
  { city: "Mumbai", category: "billboard", lat: 19.11, lng: 72.895 },
];

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDmVFC6Me3Z3Easjr0az77hPQPXp5tRIiY",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="map-view">
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            padding: "1.2rem",
            textAlign: "center",
          }}
        >
          Map View of all Identified Categories
        </h1>
        <div className="map-table-view">
          <div className="g-map">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100vh" }}
              style
              center={center}
              zoom={6}
            >
              {locations.map((loc, index) => (
                <Marker
                  key={index}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  icon={{
                    url:
                      loc.category === "billboard"
                        ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              ))}
            </GoogleMap>
          </div>

          <div className="map-table" style={{ marginTop: "20px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Arial, sans-serif",
                border: "1px solid #ccc",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                      alt="Blue Marker"
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Billboard
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                      alt="Red Marker"
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Pothole
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                      alt="Yellow Marker"
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Construction Sites
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                      alt="Orange Marker"
                    />
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    Missing Guadrails
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapView;
