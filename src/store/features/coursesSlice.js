import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState();

const serverUrl = 'http://localhost:3000';

export const saveCourseAsync = createAsyncThunk('courses/saveCourse', async (data) => {
  const response = await fetch(`${serverUrl}/courses/`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = await response.json();
  return result;
});

export const getAllCourses = createAsyncThunk('courses/getCourses', async () => {
  const response = await fetch(`${serverUrl}/courses`);
  const result = await response.json();
  return result;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    deleteItem: coursesAdapter.removeOne,
    addItem: coursesAdapter.addOne,
    editItem: coursesAdapter.upsertOne,
  },
  extraReducers: builder => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      coursesAdapter.addMany(state, action.payload);
    });
    builder.addCase(saveCourseAsync.fulfilled, (state, action) => {
          console.log(action.payload);
          coursesAdapter.addOne(state, action.payload);
        });
  }
});

export const {addItem, deleteItem, editItem} = coursesSlice.actions;

export default coursesSlice.reducer;