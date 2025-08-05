import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/donations",
  withCredentials: true,
});

export const fetchDonations = createAsyncThunk(
  "donations/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createDonation = createAsyncThunk(
  "donations/create",
  async (formData, thunkAPI) => {
    try {
      const response = await API.post("/", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateDonation = createAsyncThunk(
  "donations/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await API.put(`/${id}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteDonation = createAsyncThunk(
  "donations/delete",
  async (id, thunkAPI) => {
    try {
      const response = await API.delete(`/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const donationSlice = createSlice({
  name: "donations",
  initialState: {
    donations: [],
    donation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDonation: (state) => {
      state.donation = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations.push(action.payload);
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDonation.fulfilled, (state, action) => {
        const index = state.donations.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) state.donations[index] = action.payload;
      })
      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.donations = state.donations.filter(
          (d) => d._id !== action.payload._id
        );
      });
  },
});

export const { clearDonation } = donationSlice.actions;
export default donationSlice.reducer;
