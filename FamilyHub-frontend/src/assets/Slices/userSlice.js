import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance with cookies
const API = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

// ===================== Thunks =====================

// Get Current Logged-in User
// export const fetchCurrentUser = createAsyncThunk(
//   "users/fetchCurrentUser",
//   async (_, thunkAPI) => {
//     try {
//       const res = await API.get("/me");
//       return res.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Failed to fetch current user"
//       );
//     }
//   }
// );

// Get All Users
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch users"
      );
    }
  }
);

// Get user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch user"
      );
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to update user"
      );
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to delete user"
      );
    }
  }
);

// ===================== Slice =====================

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch current user
      // .addCase(fetchCurrentUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.currentUser = action.payload;
      // })
      // .addCase(fetchCurrentUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
