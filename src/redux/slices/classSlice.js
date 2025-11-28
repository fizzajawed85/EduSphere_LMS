import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { classService } from "../../pages/services/classService";

// Add Class
export const addClassThunk = createAsyncThunk(
  "class/addClass",
  async (classData) => {
    const newClass = await classService.addClass(classData);
    return newClass;
  }
);

// Real-time subscription (plain thunk)
export const subscribeClasses = () => (dispatch) => {
  classService.fetchClasses((data) => {
    dispatch(setClasses(data));
  });
};

const classSlice = createSlice({
  name: "class",
  initialState: { classes: [], loading: false },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Class
      .addCase(addClassThunk.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      });
  },
});

export const { setClasses } = classSlice.actions;
export default classSlice.reducer;
