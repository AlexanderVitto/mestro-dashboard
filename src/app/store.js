import { configureStore } from "@reduxjs/toolkit";
import { hospitalsApiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import ambulancesReducer from "../features/ambulances/ambulancesSlice";
import articlesReducer from "../features/articles/articlesSlice";
import hospitalsReducer from "../features/hospitals/hospitalsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    ambulances: ambulancesReducer,
    articles: articlesReducer,
    hospitals: hospitalsReducer,
    [hospitalsApiSlice.reducerPath]: hospitalsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospitalsApiSlice.middleware),
});
