// src/redux/slices/schoolSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSchools,
  addSchool,
  updateSchool,
  deleteSchool,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  getAdmins,
  addAdmin,
  deleteAdmin as deleteAdminService, // alias to avoid conflict
} from "../../pages/services/schoolService";

// --- Schools Thunks ---
export const fetchSchools = createAsyncThunk("school/fetchSchools", async () => {
  const data = await getSchools();
  return data;
});

export const createSchool = createAsyncThunk("school/createSchool", async (school) => {
  const data = await addSchool(school);
  return data;
});

export const editSchool = createAsyncThunk("school/editSchool", async ({ id, school }) => {
  const data = await updateSchool(id, school);
  return data;
});

export const removeSchool = createAsyncThunk("school/removeSchool", async (id) => {
  await deleteSchool(id);
  return id;
});

// --- Staff Thunks ---
export const fetchStaff = createAsyncThunk("school/fetchStaff", async () => {
  const data = await getStaff();
  return data;
});

export const createStaff = createAsyncThunk("school/createStaff", async (staff) => {
  const data = await addStaff(staff);
  return data;
});

export const editStaff = createAsyncThunk("school/editStaff", async ({ id, staff }) => {
  const data = await updateStaff(id, staff);
  return data;
});

export const removeStaff = createAsyncThunk("school/removeStaff", async (id) => {
  await deleteStaff(id);
  return id;
});

// --- Admin Thunks ---
export const fetchAdmins = createAsyncThunk("school/fetchAdmins", async () => {
  const data = await getAdmins();
  return data;
});

export const createAdminThunk = createAsyncThunk("school/createAdmin", async (admin) => {
  const data = await addAdmin(admin);
  return data;
});

export const deleteAdminThunk = createAsyncThunk("school/deleteAdmin", async (id) => {
  await deleteAdminService(id); // use alias here
  return id;
});

// --- Slice ---
const schoolSlice = createSlice({
  name: "school",
  initialState: {
    schools: [],
    staff: [],
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Schools
    builder
      .addCase(fetchSchools.pending, (state) => { state.loading = true; })
      .addCase(fetchSchools.fulfilled, (state, action) => { state.loading = false; state.schools = action.payload; })
      .addCase(fetchSchools.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      
      .addCase(createSchool.fulfilled, (state, action) => { state.schools.push(action.payload); })
      .addCase(editSchool.fulfilled, (state, action) => {
        state.schools = state.schools.map((s) => (s.id === action.payload.id ? action.payload : s));
      })
      .addCase(removeSchool.fulfilled, (state, action) => {
        state.schools = state.schools.filter((s) => s.id !== action.payload);
      });

    // Staff
    builder
      .addCase(fetchStaff.pending, (state) => { state.loading = true; })
      .addCase(fetchStaff.fulfilled, (state, action) => { state.loading = false; state.staff = action.payload; })
      .addCase(fetchStaff.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      
      .addCase(createStaff.fulfilled, (state, action) => { state.staff.push(action.payload); })
      .addCase(editStaff.fulfilled, (state, action) => {
        state.staff = state.staff.map((s) => (s.id === action.payload.id ? action.payload : s));
      })
      .addCase(removeStaff.fulfilled, (state, action) => {
        state.staff = state.staff.filter((s) => s.id !== action.payload);
      });

    // Admins
    builder
      .addCase(fetchAdmins.pending, (state) => { state.loading = true; })
      .addCase(fetchAdmins.fulfilled, (state, action) => { state.loading = false; state.admins = action.payload; })
      .addCase(fetchAdmins.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      
      .addCase(createAdminThunk.fulfilled, (state, action) => { state.admins.push(action.payload); })
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.admins = state.admins.filter((a) => a.id !== action.payload);
      });
  },
});

export default schoolSlice.reducer;

