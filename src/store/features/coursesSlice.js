import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const coursesAdapter = createEntityAdapter({
  selectId: course => course._id
});

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

export const deleteCourseAsync = createAsyncThunk('courses/deleteCourse', async id => {
  await axios.delete(`http://localhost:3000/courses/${id}`);
  return id;
})

export const updateCourseAsync = createAsyncThunk('courses/updateCourse', async ({_id, ...data}) => {
  const response = await axios.put(`${serverUrl}/courses/${_id}`, data);
  return response.data;
})

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
    builder.addCase(deleteCourseAsync.fulfilled, (state, action) => {
      coursesAdapter.removeOne(state, action.payload);
    })
    builder.addCase(updateCourseAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      coursesAdapter.upsertOne(state, action.payload);
    })
    builder.addCase(updateCourseAsync.rejected, (state, action) => {
    console.error('Failed to update course:', action.error);
    });
  }
});

export const {addItem, deleteItem, editItem} = coursesSlice.actions;

export default coursesSlice.reducer;