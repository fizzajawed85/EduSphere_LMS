// src/redux/slices/admissionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admissions: [],
};

const admissionSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    setAdmissions: (state, action) => {
      state.admissions = action.payload;
    },
    addAdmission: (state, action) => {
      state.admissions.push(action.payload);
    },
    updateAdmission: (state, action) => {
      const index = state.admissions.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.admissions[index] = action.payload;
    },
    deleteAdmission: (state, action) => {
      state.admissions = state.admissions.filter(a => a.id !== action.payload);
    },
  },
});

export const { setAdmissions, addAdmission, updateAdmission, deleteAdmission } = admissionSlice.actions;
export default admissionSlice.reducer;
