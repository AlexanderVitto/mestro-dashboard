import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("auth")) ?? {
    user: "",
    token: "",
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setCredentials: (state, action) => {
      if (action.payload.token)
        localStorage.setItem("auth", JSON.stringify(action.payload));
      return (state = action.payload);
    },
    setLocation: (state, action) => {
      return (state = action.payload);
    },
    remove: (state, action) => {
      localStorage.removeItem("auth");
      return (state = {
        user: "",
        token: "",
        latitude: 0,
        longitude: 0,
      });
    },
  },
});

export const { setCredentials, setLocation, remove } = slice.actions;

export const selectToken = (state) => state.auth.token;

export default slice.reducer;
