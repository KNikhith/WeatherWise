
import {
  FiDroplet,
  FiWind,
  FiActivity,
  FiEye,
} from "react-icons/fi";

function WeatherStats({ weather }) {
  const stats = [
    {
      label: "Humidity",
      value: weather?.main?.humidity,
      unit: "%",
      icon: FiDroplet,
    },
    {
      label: "Wind Speed",
      value: weather?.wind?.speed,
      unit: "m/s",
      icon: FiWind,
    },
    {
      label: "Pressure",
      value: weather?.main?.pressure,
      unit: "hPa",
      icon: FiActivity,
    },
    {
      label: "Visibility",
      value:
        weather?.visibility != null
          ? (weather.visibility / 1000).toFixed(1)
          : undefined,
      unit: "km",
      icon: FiEye,
    },
  ];

  return (
    <section className="weather-stats">
      {stats.map(({ label, value, unit, icon: Icon }) => (
        <article className="stat-card" key={label}>
          <div className="stat-card-heading">
            <span className="stat-icon">
              <Icon />
            </span>
            <span className="stat-label">{label}</span>
          </div>

          <p className="stat-value">
            {value != null ? value : "--"}
            <span>{unit}</span>
          </p>
        </article>
      ))}
    </section>
  );
}

export default WeatherStats;
