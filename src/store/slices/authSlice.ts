import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  User,
  LoginResponse,
  UserRegistrationData,
} from "@/types/auth";
import { authService } from "@/services/authService";

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { user: any; token: string }, { rejectWithValue }) => {
    try {
      // Return the user data and token directly
      return {
        success: true,
        data: {
          user: userData.user,
          token: userData.token,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserRegistrationData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const checkMembership = createAsyncThunk(
  "auth/checkMembership",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await authService.checkUserMembership(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to check membership");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUserFromStorage",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const userData = sessionStorage.getItem("user_data");

      if (token && userData) {
        const user = JSON.parse(userData);
        // Verify token is still valid
        const isValid = await authService.verifyToken(token);
        if (isValid) {
          return { token, user };
        } else {
          // Clear invalid data
          sessionStorage.removeItem("auth_token");
          sessionStorage.removeItem("user_data");
          return null;
        }
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to load user from storage"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update session storage
        sessionStorage.setItem("user_data", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          state.error = null;

          // Store in session storage
          sessionStorage.setItem("auth_token", action.payload.data.token);
          sessionStorage.setItem(
            "user_data",
            JSON.stringify(action.payload.data.user)
          );
        } else {
          state.error = action.payload.message || "Login failed";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.data) {
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          state.error = null;

          // Store in session storage
          sessionStorage.setItem("auth_token", action.payload.data.token);
          sessionStorage.setItem(
            "user_data",
            JSON.stringify(action.payload.data.user)
          );
        } else {
          state.error = action.payload.message || "Registration failed";
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Check membership
      .addCase(checkMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkMembership.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload) {
          state.user.hasMembership = action.payload.hasMembership;
          state.user.membershipInfo = action.payload.membershipInfo;

          // Update session storage
          sessionStorage.setItem("user_data", JSON.stringify(state.user));
        }
      })
      .addCase(checkMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;

        // Clear session storage
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("user_data");
      })

      // Load user from storage
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
          state.error = null;
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.loading = false;
          state.error = null;
        }
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;
