function useWeatherTheme(weather) {
  const condition = weather?.weather?.[0]?.main?.toLowerCase() || "";
  const temperature = weather?.main?.temp;

  const now = Math.floor(Date.now() / 1000);
  const sunrise = weather?.sys?.sunrise;
  const sunset = weather?.sys?.sunset;

  if (sunrise && sunset && (now < sunrise || now >= sunset)) {
    return "theme-night";
  }

  if (["thunderstorm", "drizzle", "rain"].includes(condition)) {
    return "theme-rainy";
  }

  if (condition === "snow" || (temperature != null && temperature <= 5)) {
    return "theme-cold";
  }

  if (
    [
      "clouds",
      "mist",
      "fog",
      "haze",
      "smoke",
      "dust",
      "sand",
      "ash",
      "squall",
      "tornado",
    ].includes(condition)
  ) {
    return "theme-cloudy";
  }

  if (temperature != null && temperature >= 30) {
    return "theme-hot";
  }

  return "theme-sunny";
}

export default useWeatherTheme;
