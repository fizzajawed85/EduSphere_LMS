// src/redux/slices/syllabusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { syllabusService } from "../../pages/services/syllabusService";

// Fetch all syllabus
export const fetchSyllabusThunk = createAsyncThunk(
  "syllabus/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await syllabusService.getAllSyllabus();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Add new syllabus
export const addSyllabusThunk = createAsyncThunk(
  "syllabus/add",
  async (data, { rejectWithValue }) => {
    try {
      return await syllabusService.addSyllabus(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update syllabus
export const updateSyllabusThunk = createAsyncThunk(
  "syllabus/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await syllabusService.updateSyllabus(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete syllabus
export const deleteSyllabusThunk = createAsyncThunk(
  "syllabus/delete",
  async (id, { rejectWithValue }) => {
    try {
      await syllabusService.deleteSyllabus(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  syllabusList: [],
  loading: false,
  error: null,
};

const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSyllabusThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchSyllabusThunk.fulfilled, (state, action) => {
        state.syllabusList = action.payload;
        state.loading = false;
      })
      .addCase(fetchSyllabusThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // ADD
      .addCase(addSyllabusThunk.pending, (state) => { state.loading = true; })
      .addCase(addSyllabusThunk.fulfilled, (state, action) => {
        state.syllabusList.push(action.payload);
        state.loading = false;
      })
      .addCase(addSyllabusThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // UPDATE
      .addCase(updateSyllabusThunk.pending, (state) => { state.loading = true; })
      .addCase(updateSyllabusThunk.fulfilled, (state, action) => {
        const index = state.syllabusList.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.syllabusList[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateSyllabusThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE
      .addCase(deleteSyllabusThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteSyllabusThunk.fulfilled, (state, action) => {
        state.syllabusList = state.syllabusList.filter(item => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSyllabusThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default syllabusSlice.reducer;
