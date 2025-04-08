import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState();

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    deleteItem: coursesAdapter.removeOne,
    addItem: coursesAdapter.addOne,
    editItem: coursesAdapter.upsertOne,
  },
});

export const {addItem, deleteItem, editItem} = coursesSlice.actions;

export default coursesSlice.reducer;