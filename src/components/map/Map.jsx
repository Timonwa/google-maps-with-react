import React from "react";
import "./map.css";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = () => {
  const location = [
    {
      address: "Address 1",
      lat: 59.955413,
      lng: 30.337844,
    },
    {
      address: "Address 2",
      lat: 59.724465,
      lng: 30.0801211,
    },
  ];

  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={location[0]}
          defaultZoom={9}>
          {location.map((loc) => (
            <LocationPin lat={loc.lat} lng={loc.lng} text={loc.address} />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
