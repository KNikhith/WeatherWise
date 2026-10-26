import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RainChart({ forecast }) {
  const data = (forecast?.list || []).slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    }),
    probability: Math.round((item.pop ?? 0) * 100),
  }));

  return (
    <section className="glass-panel rain-chart">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PRECIPITATION OUTLOOK</p>
          <h3>Chance of Rain</h3>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="muted-text">
          Rain probabilities will appear when forecast data loads.
        </p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
            >
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
                domain={[0, 100]}
                tick={{ fill: "#D8DFEA", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(18, 28, 45, 0.95)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  color: "#FFFFFF",
                }}
                formatter={(value) => [`${value}%`, "Rain probability"]}
              />

              <Bar
                dataKey="probability"
                fill="#79B8FF"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default RainChart;
