import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClassesService } from "../../pages/services/classService";

// Async thunk to fetch classes
export const fetchClasses = createAsyncThunk("class/fetch", async () => {
  const data = await fetchClassesService();
  return data;
});

const classSlice = createSlice({
  name: "class",
  initialState: { classes: [], loading: false },
  reducers: {
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.loading = false;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addClass } = classSlice.actions;
export default classSlice.reducer;

