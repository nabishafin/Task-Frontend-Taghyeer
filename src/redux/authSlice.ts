import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/chat';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth: (state) => {
      if (state.isInitialized || typeof window === 'undefined') return;
      try {
        const token = localStorage.getItem('pulse_auth_token');
        const userStr = localStorage.getItem('pulse_auth_user');
        const user = userStr ? JSON.parse(userStr) : null;
        if (token && user) {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        }
      } catch {
        // Ignore JSON error
      }
      state.isInitialized = true;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isInitialized = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('pulse_auth_token', action.payload.token);
        localStorage.setItem('pulse_auth_user', JSON.stringify(action.payload.user));
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pulse_auth_user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('pulse_auth_token');
        localStorage.removeItem('pulse_auth_user');
      }
    },
  },
});

export const { initAuth, setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
