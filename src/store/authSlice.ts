// src/store/authSlice.ts - 替换 Zustand 的 auth store
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    password: string;
  };
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    username: '',
    password: '',
  },
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = { username: '', password: '' };
      state.token = '';
    },
    // 可以添加更多 action
  },
});

export const { setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;