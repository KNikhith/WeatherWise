
import {
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudSnow,
  FiCloudLightning,
} from "react-icons/fi";

const getWeatherIcon = (condition) => {
  const icons = {
    Clear: FiSun,
    Clouds: FiCloud,
    Rain: FiCloudRain,
    Drizzle: FiCloudRain,
    Snow: FiCloudSnow,
    Thunderstorm: FiCloudLightning,
  };

  return icons[condition] || FiSun;
};

function HourlyForecast({ forecast }) {
  const hours = forecast?.list?.slice(0, 8) || [];
  console.log("HourlyForecast rendered:", hours.length);

  if (!hours.length) {
    return (
      <section className="glass-panel hourly-forecast">
        <h3>Hourly Forecast</h3>
        <p className="muted-text">
          Hourly predictions will appear when forecast data loads.
        </p>
      </section>
    );
  }

  return (
    <section className="glass-panel hourly-forecast">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE NEXT 24 HOURS</p>
          <h3>Hourly Forecast</h3>
        </div>
      </div>

      <div className="hourly-list">
        {hours.map((hour) => {
          const Icon = getWeatherIcon(hour.weather?.[0]?.main);
          const time = new Date(hour.dt * 1000).toLocaleTimeString(
            [],
            {
              hour: "numeric",
              hour12: true,
            }
          );

          return (
            <article className="hourly-item" key={hour.dt}>
              <span className="hourly-time">{time}</span>
              <Icon className="hourly-icon" aria-hidden="true" />
              <strong className="hourly-temperature">
                {Math.round(hour.main?.temp ?? 0)}°
              </strong>
              <span className="hourly-rain">
                {hour.pop != null
                  ? `${Math.round(hour.pop * 100)}% rain`
                  : ""}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
