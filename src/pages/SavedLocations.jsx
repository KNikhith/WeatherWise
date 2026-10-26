
import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiDroplet,
  FiWind,
  FiArrowUpRight,
} from "react-icons/fi";

import { useGetCurrentWeatherQuery } from "../services/weatherApi";
import Header from "../components/layout/Header";

const SAVED_KEY = "weatherwise-saved-locations";
const ACTIVE_KEY = "weatherwise-location";

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function SavedLocationCard({ location, active, onSelect, onRemove }) {
  const { data: weather, isLoading, isError } =
    useGetCurrentWeatherQuery(
      { lat: location.lat, lon: location.lon },
      { skip: location.lat == null || location.lon == null }
    );

  return (
    <article className={`saved-location-card${active ? " is-active" : ""}`}>
      <div className="saved-location-card-top">
        <span className="saved-location-pin">
          <FiMapPin />
        </span>

        <button
          type="button"
          className="saved-location-delete"
          onClick={() => onRemove(location)}
          aria-label={`Remove ${location.name}`}
          title="Remove location"
        >
          <FiTrash2 />
        </button>
      </div>

      <h2>{location.name}</h2>
      <p className="saved-location-country">
        {location.country || "Saved city"}
      </p>

      {isLoading && (
        <p className="saved-location-status">Loading weather...</p>
      )}

      {isError && (
        <p className="saved-location-status">
          Weather data unavailable
        </p>
      )}

      {weather && (
        <>
          <div className="saved-location-weather">
            <strong>{Math.round(weather.main.temp)}°</strong>
            <span>
              {weather.weather?.[0]?.description || "Unknown"}
            </span>
          </div>

          <div className="saved-location-metrics">
            <span>
              <FiDroplet />
              Humidity
              <strong>{weather.main.humidity}%</strong>
            </span>

            <span>
              <FiWind />
              Wind
              <strong>{weather.wind?.speed ?? "--"} m/s</strong>
            </span>
          </div>
        </>
      )}

      <button
        type="button"
        className="saved-location-select"
        onClick={() => onSelect(location)}
      >
        {active ? "Current location" : "View this city"}
        <FiArrowUpRight />
      </button>
    </article>
  );
}

function SavedLocations() {
  const [savedLocations, setSavedLocations] = useState(() =>
    readStorage(SAVED_KEY, [])
  );

  const [activeLocation, setActiveLocation] = useState(() =>
    readStorage(ACTIVE_KEY, null)
  );

  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleAddLocation = (location) => {
    if (location?.lat == null || location?.lon == null || !location.name) {
      setNotice("This city does not have valid coordinates.");
      return;
    }

    const exists = savedLocations.some(
      (item) =>
        Number(item.lat) === Number(location.lat) &&
        Number(item.lon) === Number(location.lon)
    );

    if (exists) {
      setNotice(`${location.name} is already saved.`);
      return;
    }

    setSavedLocations((previous) => [...previous, location]);
    setNotice(`${location.name} added to saved locations.`);
  };

  const handleSelectLocation = (location) => {
    setActiveLocation(location);
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(location));
    setNotice(`${location.name} selected as your current location.`);
  };

  const handleRemoveLocation = (location) => {
    setSavedLocations((previous) =>
      previous.filter(
        (item) =>
          !(
            Number(item.lat) === Number(location.lat) &&
            Number(item.lon) === Number(location.lon)
          )
      )
    );

    setNotice(`${location.name} removed from saved locations.`);
  };

  return (
    <main className="weather-app saved-locations-page">
      <Header onLocationSelect={handleAddLocation} />

      <section className="saved-locations-intro">
        <p className="eyebrow">
          <FiMapPin /> YOUR PLACES
        </p>

        <h1>Saved Locations</h1>

        <p className="muted-text">
          Keep an eye on the weather in all your favorite cities.
        </p>

        <div className="saved-locations-summary">
          <div>
            <span>Saved cities</span>
            <strong>{savedLocations.length}</strong>
          </div>

          <div>
            <span>Current location</span>
            <strong>{activeLocation?.name || "Not selected"}</strong>
          </div>
        </div>
      </section>

      {notice && (
        <div className="saved-locations-notice" role="status">
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {savedLocations.length === 0 ? (
        <section className="glass-panel saved-locations-empty">
          <span className="saved-locations-empty-icon">
            <FiMapPin />
          </span>

          <h2>No saved cities yet</h2>

          <p>
            Use the city search above to find a place, then it will appear
            here as a saved location.
          </p>

          <span className="saved-locations-hint">
            <FiPlus /> Search for a city to get started
          </span>
        </section>
      ) : (
        <section className="saved-locations-grid">
          {savedLocations.map((location) => {
            const isActive =
              activeLocation &&
              Number(activeLocation.lat) === Number(location.lat) &&
              Number(activeLocation.lon) === Number(location.lon);

            return (
              <SavedLocationCard
                key={`${location.lat}-${location.lon}`}
                location={location}
                active={Boolean(isActive)}
                onSelect={handleSelectLocation}
                onRemove={handleRemoveLocation}
              />
            );
          })}
        </section>
      )}
    </main>
  );
}

export default SavedLocations;
