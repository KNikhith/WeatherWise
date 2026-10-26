import { useEffect, useState } from "react";
import { FiSearch, FiMapPin, FiX } from "react-icons/fi";
import { useLazySearchLocationsQuery } from "../../services/weatherApi";
import LocationSuggestions from "./LocationSuggestions";

function LocationSearch({ onLocationSelect }) {
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const [searchLocations, { data: locations = [], isFetching, isError }] =
    useLazySearchLocationsQuery();

  useEffect(() => {
    const query = city.trim();

    // Keep suggestions closed after submitting or selecting a city.
    if (searchSubmitted || query.length < 2) {
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchLocations(query);
      setShowSuggestions(true);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [city, searchSubmitted, searchLocations]);

  const clearSearch = () => {
    setCity("");
    setShowSuggestions(false);
    setSearchSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = city.trim();

    if (query.length < 2) return;

    searchLocations(query);
    setSearchSubmitted(true);
    setShowSuggestions(false);
  };

  const handleSelect = (location) => {
    setCity(
      [location.name, location.state, location.country]
        .filter(Boolean)
        .join(", "),
    );

    setSearchSubmitted(true);
    setShowSuggestions(false);

    onLocationSelect?.(location);
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setSearchSubmitted(false);
    setShowSuggestions(event.target.value.trim().length >= 2);
  };

  return (
    <div className="location-search-wrapper">
      <form className="location-search" onSubmit={handleSubmit}>
        <FiMapPin className="search-location-icon" />

        <input
          type="text"
          value={city}
          onChange={handleChange}
          onFocus={() => {
            if (city.trim().length >= 2 && !searchSubmitted) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Search a city..."
          aria-label="Search for a city"
          autoComplete="off"
        />

        {city && (
          <button
            type="button"
            className="search-clear-button"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}

        <button
          type="submit"
          className="search-submit-button"
          aria-label="Search city"
        >
          <FiSearch />
        </button>
      </form>

      {showSuggestions && !searchSubmitted && (
        <>
          <LocationSuggestions
            locations={locations}
            isLoading={isFetching}
            searchTerm={city}
            onSelect={handleSelect}
          />

          {isError && (
            <p className="suggestions-message">
              Could not load cities. Check your API key and connection.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default LocationSearch;