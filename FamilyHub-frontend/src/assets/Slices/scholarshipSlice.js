// src/redux/slices/scholarshipSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ✅ You forgot to import this:
export const fetchScholarships = createAsyncThunk(
  "scholarship/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/donation-application");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// export const createDonation = createAsyncThunk(
//   "donations/create",
//   async (formData, thunkAPI) => {
//     try {
//       const response = await API.post("/", formData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.error);
//     }
//   }
// );
export const createScholarship = createAsyncThunk(
  "scholarship/create",
  async (formData, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const userId = state.auth?.user?.id;

      // if (!userId) {
      //   return thunkAPI.rejectWithValue("User not authenticated");
      // }

      // const payload = {
      //   userId,
      //   purpose: formData.purpose,
      //   description: formData.description,
      //   amount: formData.amount,
      // };

      const res = await API.post("/donation-application", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateScholarship = createAsyncThunk(
  "scholarship/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.put(`/donation-application/${id}`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteScholarship = createAsyncThunk(
  "scholarship/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/donation-application/${id}`);
      return { _id: id }; // Return id so reducer can filter it out
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  "scholarship/changeStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await API.put(`/donation-application/${id}`, { status });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  scholarships: [],
};

// Slice
const scholarshipSlice = createSlice({
  name: "scholarships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchScholarships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchScholarships.fulfilled, (state, action) => {
        state.loading = false;
        state.scholarships = action.payload;
        state.error = null;
      })
      .addCase(fetchScholarships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createScholarship.pending, (state) => {
        state.loading = true;
      })
      .addCase(createScholarship.fulfilled, (state, action) => {
        state.loading = false;
        state.scholarships.push(action.payload);
        state.error = null;
      })
      .addCase(createScholarship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateScholarship.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateScholarship.fulfilled, (state, action) => {
        state.loading = false;
        state.scholarships = state.scholarships.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.error = null;
      })
      .addCase(updateScholarship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteScholarship.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteScholarship.fulfilled, (state, action) => {
        state.loading = false;
        state.scholarships = state.scholarships.filter(
          (item) => item._id !== action.payload._id
        );
        state.error = null;
      })
      .addCase(deleteScholarship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update status
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.scholarships = state.scholarships.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.error = null;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default scholarshipSlice.reducer;
