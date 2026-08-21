import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/chat';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const getInitialAuth = (): AuthState => {
  if (typeof window === 'undefined') {
    return { token: null, user: null, isAuthenticated: false };
  }

  try {
    const token = localStorage.getItem('pulse_auth_token');
    const userStr = localStorage.getItem('pulse_auth_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token && user),
    };
  } catch (e) {
    return { token: null, user: null, isAuthenticated: false };
  }
};

const initialState: AuthState = getInitialAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

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

      if (typeof window !== 'undefined') {
        localStorage.removeItem('pulse_auth_token');
        localStorage.removeItem('pulse_auth_user');
      }
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
