import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState();

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    deleteItem: studentsAdapter.removeOne,
    addItem: studentsAdapter.addOne,
    editItem: studentsAdapter.upsertOne,
  },
});

export const {addItem, deleteItem, editItem} = studentsSlice.actions;

export default studentsSlice.reducer;