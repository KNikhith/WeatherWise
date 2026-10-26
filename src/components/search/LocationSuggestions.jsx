
import { FiMapPin } from "react-icons/fi";

function LocationSuggestions({
  locations = [],
  onSelect,
  isLoading = false,
  searchTerm = "",
}) {
  if (!searchTerm.trim()) return null;

  return (
    <div className="location-suggestions">
      {isLoading && (
        <p className="suggestions-message">Searching locations...</p>
      )}

      {!isLoading && locations.length === 0 && (
        <p className="suggestions-message">
          No matching cities found.
        </p>
      )}

      {!isLoading &&
        locations.map((location) => (
          <button
            key={`${location.lat}-${location.lon}-${location.name}`}
            type="button"
            className="location-suggestion"
            onClick={() => onSelect?.(location)}
          >
            <span className="suggestion-icon">
              <FiMapPin />
            </span>

            <span className="suggestion-details">
              <span className="suggestion-city">{location.name}</span>

              <span className="suggestion-region">
                {[location.state, location.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </span>
          </button>
        ))}
    </div>
  );
}

export default LocationSuggestions;
