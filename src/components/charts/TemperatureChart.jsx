
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function TemperatureChart({ forecast }) {
  const data = (forecast?.list || []).slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    }),
    temperature: Math.round(item.main?.temp ?? 0),
  }));

  return (
    <section className="glass-panel temperature-chart">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TEMPERATURE TRENDS</p>
          <h3>Temperature Throughout the Day</h3>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="muted-text">
          Temperature trends will appear when forecast data loads.
        </p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="temperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#FBBF77"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#FBBF77"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{ fill: "#D8DFEA", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#D8DFEA", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(18, 28, 45, 0.95)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  color: "#FFFFFF",
                }}
                formatter={(value) => [`${value}°C`, "Temperature"]}
              />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#FBBF77"
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default TemperatureChart;
