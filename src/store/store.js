import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./features/currentUserSlice.js";
import coursesReducer from "./features/coursesSlice.js";
import studentsReducer from "./features/studentsSlice.js"

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    courses: coursesReducer,
    students: studentsReducer,
  },
});
