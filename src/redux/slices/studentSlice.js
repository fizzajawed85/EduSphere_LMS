// src/redux/slices/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addStudentToDB, fetchStudentsFromDB, updateStudentClass } from "../../pages/services/studentService";

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        fetchStudentsFromDB((studentsArray) => resolve(studentsArray));
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const newStudent = await addStudentToDB(studentData);
      return newStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Transfer student
export const transferStudent = createAsyncThunk(
  "students/transferStudent",
  async ({ studentId, newClass }, { rejectWithValue }) => {
    try {
      await updateStudentClass(studentId, newClass);
      return { studentId, newClass };
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
      .addCase(fetchStudents.pending, (state) => { state.loading = true; })
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
      })
      .addCase(transferStudent.fulfilled, (state, action) => {
        const { studentId, newClass } = action.payload;
        const student = state.students.find((s) => s.id === studentId);
        if (student) student.className = newClass;
      });
  },
});

export default studentSlice.reducer;
