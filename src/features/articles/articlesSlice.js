import { createSlice } from "@reduxjs/toolkit";
import { hospitalsApiSlice } from "../api/apiSlice";

const articlesSlice = createSlice({
  name: "articles",
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
      hospitalsApiSlice.endpoints.getArticles.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
  },
});

export const { setData, removeData } = articlesSlice.actions;

export const selectData = (state) => state.articles.data;
export const selectedData = (state) => state.articles.selectedData;

export default articlesSlice.reducer;
