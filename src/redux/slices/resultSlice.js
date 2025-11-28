// src/redux/slices/resultSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resultService } from "../../pages/services/resultService";

// FETCH RESULTS
export const fetchResultsThunk = createAsyncThunk("result/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const results = await resultService.getAllResults();
    return results;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ADD RESULT
export const addResultThunk = createAsyncThunk("result/add", async (data, { rejectWithValue }) => {
  try {
    const added = await resultService.addResult(data);
    return added;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// UPDATE RESULT
export const updateResultThunk = createAsyncThunk("result/update", async ({ id, resultData }, { rejectWithValue }) => {
  try {
    const updated = await resultService.updateResult(id, resultData);
    return updated;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// DELETE RESULT
export const deleteResultThunk = createAsyncThunk("result/delete", async (id, { rejectWithValue }) => {
  try {
    await resultService.deleteResult(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const resultSlice = createSlice({
  name: "result",
  initialState: {
    resultList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchResultsThunk.fulfilled, (state, action) => { state.resultList = action.payload; state.loading = false; })
      .addCase(fetchResultsThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(addResultThunk.pending, (state) => { state.loading = true; })
      .addCase(addResultThunk.fulfilled, (state, action) => { state.resultList.push(action.payload); state.loading = false; })
      .addCase(addResultThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(updateResultThunk.pending, (state) => { state.loading = true; })
      .addCase(updateResultThunk.fulfilled, (state, action) => {
        const index = state.resultList.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.resultList[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateResultThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(deleteResultThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteResultThunk.fulfilled, (state, action) => {
        state.resultList = state.resultList.filter(r => r.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteResultThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  }
});

export default resultSlice.reducer;
