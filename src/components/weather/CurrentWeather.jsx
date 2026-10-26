import { FiMapPin } from "react-icons/fi";

function CurrentWeather({ weather, locationName }) {
  if (!weather) {
    return (
      <section className="glass-panel current-weather">
        <p className="eyebrow">CURRENT WEATHER</p>
        <h2>Find your weather</h2>
        <p className="muted-text">
          Search for a city to see the latest weather conditions.
        </p>
      </section>
    );
  }

  const condition = weather.weather?.[0]?.main || "Clear";
  const description = weather.weather?.[0]?.description || "Clear sky";
  const iconCode = weather.weather?.[0]?.icon;
  const temperature = Math.round(weather.main?.temp ?? 0);
  const high = Math.round(weather.main?.temp_max ?? temperature);
  const low = Math.round(weather.main?.temp_min ?? temperature);
  const feelsLike = Math.round(weather.main?.feels_like ?? temperature);
  const city = locationName || weather.name || "Selected location";

  const weatherImage = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    : null;

  return (
    <section
      className={`glass-panel current-weather weather-${condition.toLowerCase()}`}
    >
      <div className="current-weather-heading">
        <div>
          <p className="eyebrow">CURRENT WEATHER</p>
          <h2>{city}</h2>

          <p className="location-label">
            <FiMapPin />
            <span>{weather.sys?.country || "Local forecast"}</span>
          </p>
        </div>

        {weatherImage && (
          <div className="current-weather-icon">
            <img
              src={weatherImage}
              alt={description}
              className="current-weather-image"
            />
          </div>
        )}
      </div>

      <div className="current-temperature">
        <span>{temperature}°</span>

        <div>
          <p className="weather-description">{description}</p>
          <p className="muted-text">Feels like {feelsLike}°C</p>
        </div>
      </div>

      <div className="temperature-range">
        <span>H: {high}°</span>
        <span>L: {low}°</span>
      </div>
    </section>
  );
}

export default CurrentWeather;
