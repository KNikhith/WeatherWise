
import { FiSun } from "react-icons/fi";
import LocationSearch from "../search/LocationSearch";

function Header({ onLocationSelect }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="app-header">
      <div className="header-welcome">
        <p className="eyebrow">
          <FiSun />
          YOUR PERSONAL WEATHER STATION
        </p>

        <h1>Weather at a glance.</h1>

        <p className="muted-text">
          Here's what's happening in your world today.
        </p>
      </div>

      <div className="header-actions">
        <LocationSearch onLocationSelect={onLocationSelect} />

        <p className="header-date">{today}</p>
      </div>
    </header>
  );
}

export default Header;
