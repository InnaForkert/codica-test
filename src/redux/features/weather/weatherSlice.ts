import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchHourlyForecast } from "../../utils/getWeather";
import Notiflix from "notiflix";

export interface WeatherObj {
  weather: [{ icon: string; description: string }];
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  coord: {
    lon: string;
    lat: string;
  };
  wind: {
    speed: number;
  };
}

export interface CurrentWeatherObj {
  list: { dt_txt: string; main: { temp: number } }[];
}

export interface Weather {
  values: WeatherObj[];
  isLoading: boolean;
  error: unknown;
  currentWeather: CurrentWeatherObj;
}

const initialState: Weather = {
  values: [],
  isLoading: false,
  error: null,
  currentWeather: { list: [] },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeCityFromValues: (state, action) => {
      state.values = state.values.filter((el) => el.name !== action.payload);
      localStorage.setItem(
        "savedCities",
        JSON.stringify(state.values.map((el) => el.name))
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.values = state.values.filter(
        (el) => el.name !== action.payload.name
      );
      state.values.push(action.payload);
      localStorage.setItem(
        "savedCities",
        JSON.stringify(state.values.map((el) => el.name))
      );
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      Notiflix.Notify.failure("City not found!");
      state.isLoading = false;
      state.error = action.payload as object;
    });

    builder.addCase(fetchHourlyForecast.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHourlyForecast.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentWeather = action.payload;
    });
    builder.addCase(fetchHourlyForecast.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as object;
    });
  },
});

export default weatherSlice.reducer;

export const { removeCityFromValues } = weatherSlice.actions;
