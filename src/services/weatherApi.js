import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log("API key loaded:", Boolean(API_KEY));
console.log("API key length:", API_KEY?.length);
const BASE_URL = "https://api.openweathermap.org";

export const weatherApi = createApi({
  reducerPath: "weatherApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: ({ lat, lon }) => ({
        url: "/data/2.5/weather",
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      }),
    }),

    getForecast: builder.query({
      query: ({ lat, lon }) => ({
        url: "/data/2.5/forecast",
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      }),
    }),

    searchLocations: builder.query({
      query: (city) => ({
        url: "/geo/1.0/direct",
        params: {
          q: city,
          limit: 5,
          appid: API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
  useLazySearchLocationsQuery,
} = weatherApi;