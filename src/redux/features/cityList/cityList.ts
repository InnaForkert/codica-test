import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CityList {
  list: string[];
}

const initialState: CityList = {
  list: [],
};

export const cityListSlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.list.filter((el) => el !== action.payload);
    },
    addCitiesFromLocalStorage: (state, action: PayloadAction<string[]>) => {
      state.list = [...action.payload];
    },
  },
});

export const { addCity, removeCity, addCitiesFromLocalStorage } =
  cityListSlice.actions;

export default cityListSlice.reducer;