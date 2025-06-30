import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const studentsAdapter = createEntityAdapter({
  selectId: student => student._id
});

const initialState = studentsAdapter.getInitialState();

const serverUrl = 'http://localhost:3000';

export const saveStudentAsync = createAsyncThunk('students/saveStudent', async (data) => {
  const response = await fetch(`${serverUrl}/students/`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = await response.json();
  return result;
});

export const getAllStudents = createAsyncThunk('students/getStudents', async () => {
  const response = await fetch(`${serverUrl}/students`);
  const result = await response.json();
  return result.data;
});

export const deleteStudentAsync = createAsyncThunk('students/deleteStudent', async id => {
  await axios.delete(`http://localhost:3000/students/${id}`);
  return id;
})

export const updateStudentAsync = createAsyncThunk('students/updateStudent', async ({_id, ...data}) => {
  const response = await axios.put(`${serverUrl}/students/${_id}`, data);
  return response.data;
})

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    deleteItem: studentsAdapter.removeOne,
    addItem: studentsAdapter.addOne,
    editItem: studentsAdapter.upsertOne,
  },
  extraReducers: builder => {
    builder.addCase(saveStudentAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      studentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      studentsAdapter.addMany(state, action.payload)
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      studentsAdapter.removeOne(state, action.payload);
    })
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      studentsAdapter.upsertOne(state, action.payload);
    })
  }
});

export const {addItem, deleteItem, editItem} = studentsSlice.actions;

export default studentsSlice.reducer;