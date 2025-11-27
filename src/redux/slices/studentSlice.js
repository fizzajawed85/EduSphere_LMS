// src/redux/slices/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addStudentToDB, fetchStudentsFromDB } from "../../pages/services/studentService";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        fetchStudentsFromDB((studentsArray) => {
          resolve(studentsArray);
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      await addStudentToDB(studentData);
      return studentData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});

export default studentSlice.reducer;
