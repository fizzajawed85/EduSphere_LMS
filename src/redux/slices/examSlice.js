// src/redux/slices/examSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examList: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    fetchExams: (state, action) => {
      state.examList = action.payload;
    },
    addExam: (state, action) => {
      state.examList.push(action.payload);
    },
    updateExam: (state, action) => {
      state.examList = state.examList.map((exam) =>
        exam.id === action.payload.id ? action.payload : exam
      );
    },
    deleteExam: (state, action) => {
      state.examList = state.examList.filter((exam) => exam.id !== action.payload);
    },
  },
});

export const { fetchExams, addExam, updateExam, deleteExam } = examSlice.actions;
export default examSlice.reducer;
