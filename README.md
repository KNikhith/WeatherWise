# 🌦️ WeatherWise — Weather Forecast Application

WeatherWise is a responsive weather application built with **React.js and Redux Toolkit** that provides real-time weather updates, hourly forecasts, weekly predictions, interactive weather charts, and saved locations through a clean, modern interface.

## ✨ Features

- **Current Weather:** View current temperature, weather conditions, and key weather metrics.
- **Hourly Forecast:** Check upcoming weather conditions throughout the day.
- **Weekly Forecast:** Explore upcoming daily weather predictions.
- **Interactive Charts:** Visualize temperature trends and rainfall information.
- **Saved Locations:** Save and access weather information for your favorite locations.
- **Dynamic Weather Backgrounds:** Experience backgrounds that adapt to weather conditions, including day and night themes.
- **Location Search:** Search for locations to retrieve their weather information.
- **Responsive Design:** Access the application across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| Vite | Development server and build tool |
| Redux Toolkit | State management |
| RTK Query | API data fetching and caching |
| React Router | Client-side navigation |
| JavaScript (ES6+) | Application logic |
| CSS3 | Styling, layouts, and responsive design |
| React Icons | Interface icons |
| Weather API | Weather conditions and forecast data |

## 📸 Application Pages

- **Dashboard:** Current weather, weather statistics, hourly forecast, and visualizations.
- **Forecast:** Detailed hourly and weekly weather information.
- **Saved Locations:** Manage favorite cities and view their weather conditions.
- **Settings:** Access application settings.

## 🚀 Getting Started

Follow these instructions to run WeatherWise locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/WeatherWise.git
```

**2. Navigate to the project directory**

```bash
cd WeatherWise
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

If your weather API requires an API key, create a `.env` file in the project root and configure the variable expected by your application.

For example, if your code uses `import.meta.env.VITE_WEATHER_API_KEY`:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Obtain an API key from your chosen weather data provider if required. Make sure the variable name matches your actual code.

**Important:** Vite exposes `VITE_` variables to the browser. Never put private credentials or secret API keys in client-side environment variables.

**5. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint checks |

## 🌐 Deployment

WeatherWise can be deployed on [Render](https://render.com/) as a **Static Site**.

1. Push the project to GitHub.
2. Create a new Static Site in Render.
3. Connect your GitHub repository.
4. Configure the build settings:

   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Add any required environment variables in the Render dashboard.
6. Deploy the application.

For client-side routing with React Router, configure a rewrite rule if needed:

| Source | Destination | Action |
|---|---|---|
| `/*` | `/index.html` | Rewrite |

**Live Demo:** [View WeatherWise](YOUR-RENDER-URL)

## 📁 Project Structure

```text
WeatherWise/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── redux/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

*Note: The structure above is illustrative. Adjust it to match the actual folders and files in your repository.*

## 🔮 Future Improvements

- Add weather alerts and severe-weather notifications.
- Support geolocation-based weather detection.
- Add unit conversion between Celsius and Fahrenheit.
- Improve accessibility and loading states.
- Add automated component and integration tests.

## 👨‍💻 Author

KNikhith

- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)

## 📄 License

This project is available for educational and portfolio purposes. Add a license file if you intend to distribute it under a specific open-source license.
