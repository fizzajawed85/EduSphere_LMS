// src/redux/slices/subjectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subjectService } from "../../pages/services/subjectService";

// Async actions
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await subjectService.getAllSubjects();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (subject, { rejectWithValue }) => {
    try {
      const data = await subjectService.addSubject(subject);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id, { rejectWithValue }) => {
    try {
      await subjectService.deleteSubject(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => { state.loading = true; })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add subject
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      // Delete subject
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(subj => subj.id !== action.payload);
      });
  }
});

export default subjectSlice.reducer;
