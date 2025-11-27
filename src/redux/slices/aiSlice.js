import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Ask chatbot
export const askAI = createAsyncThunk("ai/ask", async (prompt) => {
  return { reply: "AI Response Here" };
});

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    loading: false,
    reply: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(askAI.pending, (state) => { state.loading = true; })
      .addCase(askAI.fulfilled, (state, action) => {
        state.loading = false;
        state.reply = action.payload.reply;
      });
  },
});

export default aiSlice.reducer;
