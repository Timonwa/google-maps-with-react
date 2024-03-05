import React, { useState, useEffect } from "react";
import "./map.css";
import GoogleMapReact from "google-map-react";
import "./map.css";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import SearchBox from "./SearchBox";

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

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [places, setPlaces] = useState([]);

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMapInstance(map);
    setMapApi(maps);
  };

  const addPlace = (place) => {
    setPlaces((prevPlaces) => [...prevPlaces, ...place]);
  };

  // UseEffect to handle the side effect of updating places
  useEffect(() => {
    // Check if places array is not empty before updating
    if (places.length > 0 && mapApiLoaded) {
      setMapInstance((prevMap) => {
        const newLocation = {
          lat: places[0]?.geometry?.location?.lat(),
          lng: places[0]?.geometry?.location?.lng(),
        };

        // Pan to the new location
        prevMap.panTo(newLocation);
        return prevMap;
      });
    }
  }, [places, mapApiLoaded]);

  return (
    <div className="map">
      {mapApiLoaded && (
        <SearchBox map={mapInstance} mapApi={mapApi} addPlace={addPlace} />
      )}
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyC5IXh7pZle95YP5eKu03nX83yaUIiOP5E",
            libraries: ["places", "geometry"],
          }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}>
          <LocationPin
            text={places[0]?.name}
            lat={places[0]?.geometry?.location?.lat()}
            lng={places[0]?.geometry?.location?.lng()}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
