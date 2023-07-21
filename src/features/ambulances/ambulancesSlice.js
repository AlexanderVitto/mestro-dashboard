import { createSlice } from "@reduxjs/toolkit";
import { hospitalsApiSlice } from "../api/apiSlice";

const ambulancesSlice = createSlice({
  name: "ambulances",
  initialState: {
    data: [],
    selectedData: null,
  },
  reducers: {
    setData: (state, action) => {
      state.selectedData = action.payload;
    },
    removeData: (state, action) => {
      const tempVal = [...state.data];
      tempVal.splice(action.payload);

      return (state = { data: tempVal });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      hospitalsApiSlice.endpoints.getAmbulances.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
  },
});

export const { setData, removeData } = ambulancesSlice.actions;

export const selectData = (state) => state.ambulances.data;
export const selectedData = (state) => state.ambulances.selectedData;

export default ambulancesSlice.reducer;
