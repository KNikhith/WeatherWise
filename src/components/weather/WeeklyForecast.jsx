
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

function WeeklyForecast({ forecast }) {
  const forecastList = forecast?.list || [];

  const groupedDays = forecastList.reduce((groups, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-CA");

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(item);
    return groups;
  }, {});

  const days = Object.entries(groupedDays).slice(0, 5);

  if (!days.length) {
    return (
      <section className="glass-panel weekly-forecast">
        <h3>5-Day Forecast</h3>
        <p className="muted-text">
          The daily forecast will appear when data loads.
        </p>
      </section>
    );
  }

  return (
    <section className="glass-panel weekly-forecast">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PLAN AHEAD</p>
          <h3>5-Day Forecast</h3>
        </div>
      </div>

      <div className="weekly-list">
        {days.map(([date, entries], index) => {
          const midday =
            entries.find((entry) =>
              new Date(entry.dt * 1000)
                .toLocaleTimeString("en-GB", { hour: "2-digit" })
                .startsWith("12")
            ) || entries[Math.floor(entries.length / 2)];

          const Icon = getWeatherIcon(midday.weather?.[0]?.main);

          const high = Math.round(
            Math.max(...entries.map((entry) => entry.main.temp_max))
          );

          const low = Math.round(
            Math.min(...entries.map((entry) => entry.main.temp_min))
          );

          const dayName =
            index === 0
              ? "Today"
              : new Date(`${date}T12:00:00`).toLocaleDateString(
                  undefined,
                  { weekday: "short" }
                );

          return (
            <article className="weekly-item" key={date}>
              <span className="weekly-day">{dayName}</span>

              <div className="weekly-condition">
                <Icon className="weekly-icon" aria-hidden="true" />
                <span>
                  {midday.weather?.[0]?.description || "Forecast"}
                </span>
              </div>

              <div className="weekly-temperatures">
                <strong>{high}°</strong>
                <span>{low}°</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default WeeklyForecast;
