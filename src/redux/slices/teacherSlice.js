// src/redux/slices/teacherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTeacherService,
  fetchTeachersService,
  updateTeacherService,
  deleteTeacherService,
} from "../../pages/services/teacherService";

const initialState = {
  teachers: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTeachers = createAsyncThunk("teacher/fetchTeachers", async () => {
  const data = await fetchTeachersService();
  return data;
});

export const addTeacher = createAsyncThunk("teacher/addTeacher", async (teacher) => {
  const data = await addTeacherService(teacher);
  return data;
});

export const updateTeacher = createAsyncThunk("teacher/updateTeacher", async ({ id, data }) => {
  await updateTeacherService(id, data);
  return { id, data };
});

export const deleteTeacher = createAsyncThunk("teacher/deleteTeacher", async (id) => {
  await deleteTeacherService(id);
  return id;
});

// Slice
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.teachers[index] = { ...state.teachers[index], ...action.payload.data };
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter((t) => t.id !== action.payload);
      });
  },
});

export default teacherSlice.reducer;
