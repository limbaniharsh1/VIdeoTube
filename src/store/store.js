import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootRecucer";

export const store = configureStore({
  reducer: rootReducer,
});
