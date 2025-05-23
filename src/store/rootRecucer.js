import { combineReducers } from "@reduxjs/toolkit";
import Category from "./category/slice";
import Videos from "./videos/slice";

const rootReducer = combineReducers({
  // Add your reducers here
  Category,
  Videos,
});

export default rootReducer;
