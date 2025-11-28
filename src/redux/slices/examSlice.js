// src/redux/slices/examSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { examService } from "../../pages/services/examService";

// FETCH ALL EXAMS
export const fetchExamsThunk = createAsyncThunk(
  "exam/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const exams = await examService.getAllExams();
      console.log("Fetched exams from Firebase:", exams);
      return exams;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD EXAM
export const addExamThunk = createAsyncThunk(
  "exam/add",
  async (examData, { rejectWithValue }) => {
    try {
      const added = await examService.addExam(examData);
      return added;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE EXAM
export const updateExamThunk = createAsyncThunk(
  "exam/update",
  async ({ id, examData }, { rejectWithValue }) => {
    try {
      const updated = await examService.updateExam(id, examData);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE EXAM
export const deleteExamThunk = createAsyncThunk(
  "exam/delete",
  async (id, { rejectWithValue }) => {
    try {
      await examService.deleteExam(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  examList: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchExamsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchExamsThunk.fulfilled, (state, action) => {
        state.examList = action.payload;
        state.loading = false;
      })
      .addCase(fetchExamsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // ADD
      .addCase(addExamThunk.pending, (state) => { state.loading = true; })
      .addCase(addExamThunk.fulfilled, (state, action) => {
        state.examList.push(action.payload);
        state.loading = false;
      })
      .addCase(addExamThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // UPDATE
      .addCase(updateExamThunk.pending, (state) => { state.loading = true; })
      .addCase(updateExamThunk.fulfilled, (state, action) => {
        const index = state.examList.findIndex(exam => exam.id === action.payload.id);
        if (index !== -1) state.examList[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateExamThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // DELETE
      .addCase(deleteExamThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteExamThunk.fulfilled, (state, action) => {
        state.examList = state.examList.filter(exam => exam.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteExamThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default examSlice.reducer;
