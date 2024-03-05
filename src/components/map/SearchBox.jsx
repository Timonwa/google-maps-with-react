import React, { useEffect, useRef } from "react";

const SearchBox = ({ map, mapApi, addPlace }) => {
  const searchInputRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    searchBoxRef.current = new mapApi.places.SearchBox(searchInputRef.current);

    const onPlacesChanged = () => {
      const selected = searchBoxRef.current.getPlaces();
      const [place] = selected;

      if (!place.geometry) return;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      addPlace(selected);
      searchInputRef.current.blur();
    };

    searchBoxRef.current.addListener("places_changed", onPlacesChanged);
    searchBoxRef.current.bindTo("bounds", map);

    return () => {
      mapApi.event.clearInstanceListeners(searchInputRef.current);
    };
  }, [map, mapApi, addPlace]);

  const clearSearchBox = () => {
    searchInputRef.current.value = "";
  };

  return (
    <form className="search-box">
      <input
        ref={searchInputRef}
        type="text"
        onFocus={clearSearchBox}
        placeholder="Enter a location"
      />
    </form>
  );
};

export default SearchBox;
