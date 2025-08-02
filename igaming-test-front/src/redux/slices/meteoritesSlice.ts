import { createSlice } from "@reduxjs/toolkit/react";
import type { GetMeteoriteFilterRs } from "../../models/meteorites";

interface MeteoritesState {
  meteoritesData: GetMeteoriteFilterRs[];
}

const initialState: MeteoritesState = {
  meteoritesData: [],
};

export const meteoritesSlice = createSlice({
  name: "Meteorites",
  initialState: initialState,
  reducers: {
    SET_METEORITES: (state, action) => {
      state.meteoritesData = action.payload;
    },
  },
});

export const selectMeteorites = (state: { meteorites: MeteoritesState }) =>
  state.meteorites.meteoritesData;

export const { SET_METEORITES } = meteoritesSlice.actions;

export default meteoritesSlice.reducer;
