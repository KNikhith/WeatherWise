
import { useEffect, useState } from "react";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "../services/weatherApi";
import useWeatherTheme from "../hooks/useWeatherTheme";

import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import WeatherStats from "../components/weather/WeatherStats";
import HourlyForecast from "../components/weather/HourlyForecast";
import WeeklyForecast from "../components/weather/WeeklyForecast";
import TemperatureChart from "../components/charts/TemperatureChart";
import RainChart from "../components/charts/RainChart";

function Dashboard() {
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
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useGetCurrentWeatherQuery(coordinates, {
    skip: !coordinates,
  });

  const {
    data: forecast,
    isLoading: isForecastLoading,
    isError: isForecastError,
  } = useGetForecastQuery(coordinates, {
    skip: !coordinates,
  });

  const theme = useWeatherTheme(weather);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <main className={`weather-app ${theme}`}>
      <Header onLocationSelect={handleLocationSelect} />

      {!selectedLocation && (
        <section className="glass-panel welcome-panel">
          <p className="eyebrow">WELCOME TO WEATHERWISE</p>
          <h2>Your weather, beautifully presented.</h2>
          <p className="muted-text">
            Search for a city to explore current conditions, hourly
            predictions, and the 5-day forecast.
          </p>
        </section>
      )}

      {selectedLocation && (
        <>
          {isWeatherLoading && (
            <p className="loading-message">Loading current weather...</p>
          )}

          {isWeatherError && (
            <p className="error-message">
              Could not load current weather. Please try selecting the city
              again.
            </p>
          )}

          {weather && (
            <section className="dashboard-top-grid">
              <CurrentWeather
                weather={weather}
                locationName={selectedLocation.name}
              />

              <WeatherStats weather={weather} />
            </section>
          )}

          {isForecastLoading && (
            <p className="loading-message">Loading forecast...</p>
          )}

          {isForecastError && (
            <p className="error-message">
              Could not load the forecast. Please try again.
            </p>
          )}

          {forecast && (
            <>
              <HourlyForecast forecast={forecast} />

              <section className="dashboard-bottom-grid">
                <WeeklyForecast forecast={forecast} />

                <div className="dashboard-chart">
                  <TemperatureChart forecast={forecast} />
                </div>
              </section>

              <div className="dashboard-rain-chart">
                <RainChart forecast={forecast} />
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default Dashboard;
