import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Fetch all stories
export const fetchStories = createAsyncThunk(
  "stories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/stories");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch stories"
      );
    }
  }
);

// Create a new story
export const createStory = createAsyncThunk(
  "stories/create",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/stories", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to create story"
      );
    }
  }
);

// Update a story
export const updateStory = createAsyncThunk(
  "stories/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.put(`/stories/${id}`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
// Delete a story
export const deleteStory = createAsyncThunk(
  "stories/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/stories/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to delete story"
      );
    }
  }
);

// ===================== Slice =====================

const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearStoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories.push(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.stories = state.stories.filter((s) => s.id !== action.payload);
        state.stories = state.stories.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStoryError } = storySlice.actions;
export default storySlice.reducer;
