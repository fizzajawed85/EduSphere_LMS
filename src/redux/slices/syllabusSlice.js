// src/redux/slices/syllabusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  syllabusList: [],
  loading: false,
  error: null,
};

const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {
    fetchSyllabus: (state, action) => {
      state.syllabusList = action.payload;
      state.loading = false;
    },
    addSyllabus: (state, action) => {
      state.syllabusList.push(action.payload);
    },
    updateSyllabus: (state, action) => {
      const index = state.syllabusList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.syllabusList[index] = action.payload;
    },
    deleteSyllabus: (state, action) => {
      state.syllabusList = state.syllabusList.filter(
        (item) => item.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchSyllabus,
  addSyllabus,
  updateSyllabus,
  deleteSyllabus,
  setLoading,
  setError,
} = syllabusSlice.actions;

export default syllabusSlice.reducer;

