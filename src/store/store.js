import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/currentUserSlice.js";
import coursesReducer from "./features/coursesSlice.js";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    courses: coursesReducer,
  },
});
