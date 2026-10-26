
import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiDroplet,
  FiWind,
  FiSunrise,
  FiSunset,
  FiCloudRain,
  FiThermometer,
} from "react-icons/fi";

import {
  useGetForecastQuery,
} from "../services/weatherApi";

import Header from "../components/layout/Header";
import useWeatherTheme from "../hooks/useWeatherTheme";

function getWeatherEmoji(condition = "") {
  const value = condition.toLowerCase();

  if (value.includes("thunder")) return "⛈️";
  if (value.includes("rain") || value.includes("drizzle")) return "🌧️";
  if (value.includes("snow")) return "❄️";
  if (value.includes("cloud")) return "☁️";
  if (value.includes("mist") || value.includes("fog")) return "🌫️";
  if (value.includes("clear")) return "☀️";

  return "🌤️";
}

function formatDay(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function Forecast() {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weatherwise-location")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem(
        "weatherwise-location",
        JSON.stringify(selectedLocation)
      );
    }
  }, [selectedLocation]);

  const coordinates = selectedLocation
    ? {
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
      }
    : null;

  const {
    data: forecast,
    isLoading,
    isError,
  } = useGetForecastQuery(coordinates, {
    skip: !coordinates,
  });

  const theme = useWeatherTheme(forecast);

  const forecastItems = forecast?.list || [];

  const hourlyItems = forecastItems.slice(0, 8);

  const dailyItems = useMemo(() => {
    const grouped = {};

    forecastItems.forEach((item) => {
      const date = item.dt_txt?.split(" ")[0];

      if (!date) return;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          temps: [],
          items: [],
        };
      }

      grouped[date].temps.push(item.main.temp);
      grouped[date].items.push(item);
    });

    return Object.values(grouped).slice(0, 5).map((day) => {
      const midday =
        day.items.find((item) => item.dt_txt?.includes("12:00:00")) ||
        day.items[Math.floor(day.items.length / 2)];

      const rainChance = Math.round(
        Math.max(...day.items.map((item) => (item.pop || 0) * 100))
      );

      return {
        ...day,
        condition: midday.weather?.[0]?.description || "Unknown",
        icon: midday.weather?.[0]?.main || "",
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        rainChance,
      };
    });
  }, [forecastItems]);

  const sunrise = forecast?.city?.sunrise;
  const sunset = forecast?.city?.sunset;

  return (
    <main className={`weather-app forecast-page ${theme}`}>
      <Header onLocationSelect={setSelectedLocation} />

      <section className="forecast-intro">
        <p className="eyebrow">
          <FiCalendar /> WEATHER PLANNER
        </p>

        <h1>Detailed Forecast</h1>

        <p className="muted-text">
          Plan your next few days with hourly temperatures and rain chances.
        </p>

        {selectedLocation && (
          <p className="forecast-location">
            {selectedLocation.name}
          </p>
        )}
      </section>

      {!selectedLocation && (
        <section className="glass-panel forecast-empty">
          <FiSunrise />
          <h2>Choose a city to get started</h2>
          <p>Search for a city above to explore its upcoming forecast.</p>
        </section>
      )}

      {isLoading && (
        <p className="loading-message">Loading detailed forecast...</p>
      )}

      {isError && (
        <p className="error-message">
          Unable to load the forecast. Please search for the city again.
        </p>
      )}

      {forecast && (
        <>
          <section className="glass-panel forecast-section">
            <div className="forecast-section-heading">
              <div>
                <p className="eyebrow">UPCOMING CONDITIONS</p>
                <h2>Next 24 Hours</h2>
              </div>

              <span className="forecast-count">
                <FiClock /> {hourlyItems.length} intervals
              </span>
            </div>

            <div className="detailed-hourly-list">
              {hourlyItems.map((item) => (
                <article className="detailed-hour-card" key={item.dt}>
                  <span className="hour-time">
                    {new Date(item.dt * 1000).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </span>

                  <span className="hour-weather-icon">
                    {getWeatherEmoji(item.weather?.[0]?.main)}
                  </span>

                  <strong>{Math.round(item.main.temp)}°</strong>

                  <span className="hour-condition">
                    {item.weather?.[0]?.description || "—"}
                  </span>

                  <span className="hour-rain">
                    <FiDroplet />
                    {Math.round((item.pop || 0) * 100)}%
                  </span>

                  <span className="hour-wind">
                    <FiWind />
                    {item.wind?.speed ?? "—"} m/s
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-panel forecast-section">
            <div className="forecast-section-heading">
              <div>
                <p className="eyebrow">PLAN AHEAD</p>
                <h2>5-Day Forecast</h2>
              </div>
            </div>

            <div className="detailed-daily-list">
              {dailyItems.map((day, index) => (
                <article className="detailed-day-row" key={day.date}>
                  <div className="daily-date">
                    <strong>{index === 0 ? "Today" : formatDay(day.date)}</strong>
                    <span>{formatDay(day.date)}</span>
                  </div>

                  <span className="daily-weather-icon">
                    {getWeatherEmoji(day.icon)}
                  </span>

                  <span className="daily-condition">
                    {day.condition}
                  </span>

                  <div className="daily-rain">
                    <FiDroplet />
                    {day.rainChance}%
                  </div>

                  <div className="daily-temperatures">
                    <strong>{day.high}°</strong>
                    <span>{day.low}°</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="forecast-details-grid">
            <article className="glass-panel forecast-detail-card">
              <span className="forecast-detail-icon">
                <FiThermometer />
              </span>
              <p>Forecast intervals</p>
              <strong>{forecastItems.length}</strong>
              <span>Available data points</span>
            </article>

            <article className="glass-panel forecast-detail-card">
              <span className="forecast-detail-icon">
                <FiCloudRain />
              </span>
              <p>Highest rain probability</p>
              <strong>
                {forecastItems.length
                  ? `${Math.round(
                      Math.max(
                        ...forecastItems.map((item) => (item.pop || 0) * 100)
                      )
                    )}%`
                  : "—"}
              </strong>
              <span>Across available intervals</span>
            </article>

            <article className="glass-panel forecast-detail-card">
              <span className="forecast-detail-icon">
                <FiSunrise />
              </span>
              <p>Sunrise</p>
              <strong>
                {sunrise
                  ? new Date(sunrise * 1000).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"}
              </strong>
              <span>Local forecast time</span>
            </article>

            <article className="glass-panel forecast-detail-card">
              <span className="forecast-detail-icon">
                <FiSunset />
              </span>
              <p>Sunset</p>
              <strong>
                {sunset
                  ? new Date(sunset * 1000).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "—"}
              </strong>
              <span>Local forecast time</span>
            </article>
          </section>
        </>
      )}
    </main>
  );
}

export default Forecast;
