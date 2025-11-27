// src/redux/slices/feeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeList: [],
  submissions: [],
  vouchers: [],
};

const feeSlice = createSlice({
  name: "fee",
  initialState,
  reducers: {
    setFees: (state, action) => {
      state.feeList = action.payload;
    },
    addFee: (state, action) => {
      state.feeList.push(action.payload);
    },
    updateFee: (state, action) => {
      const index = state.feeList.findIndex(f => f.id === action.payload.id);
      if (index !== -1) state.feeList[index] = action.payload;
    },
    deleteFee: (state, action) => {
      state.feeList = state.feeList.filter(f => f.id !== action.payload);
    },
    setSubmissions: (state, action) => {
      state.submissions = action.payload;
    },
    addSubmission: (state, action) => {
      state.submissions.push(action.payload);
    },
    setVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    addVoucher: (state, action) => {
      state.vouchers.push(action.payload);
    },
  },
});

export const { setFees, addFee, updateFee, deleteFee, setSubmissions, addSubmission, setVouchers, addVoucher } = feeSlice.actions;
export default feeSlice.reducer;
