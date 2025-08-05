// src/redux/slices/familyHistorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance with credentials
const API = axios.create({
  baseURL: "http://localhost:3000/api/family-history", // Update if your backend port or route differs
  withCredentials: true,
});

// ========== Async Thunks ==========

// GET all histories
export const fetchHistories = createAsyncThunk(
  "familyHistory/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// POST a new history
export const createHistory = createAsyncThunk(
  "familyHistory/create",
  async (newData, thunkAPI) => {
    try {
      const res = await API.post("/", newData);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// PUT (update) history by ID
export const updateHistory = createAsyncThunk(
  "familyHistory/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await API.put(`/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// DELETE history by ID
export const deleteHistory = createAsyncThunk(
  "familyHistory/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/${id}`);
      return { id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ========== Slice ==========

const familyHistorySlice = createSlice({
  name: "familyHistory",
  initialState: {
    histories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchHistories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistories.fulfilled, (state, action) => {
        state.histories = action.payload;
        state.loading = false;
      })
      .addCase(fetchHistories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.histories.push(action.payload);
        state.loading = false;
      })
      .addCase(createHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHistory.fulfilled, (state, action) => {
        const index = state.histories.findIndex(
          (history) => history._id === action.payload._id
        );
        if (index !== -1) {
          state.histories[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.histories = state.histories.filter(
          (item) => item._id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default familyHistorySlice.reducer;
