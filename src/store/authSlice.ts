import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type User = {
  id: string,
  email: string
}

export type Auth = {
  token: string | null,
  isAuthLoading: boolean,
  isProfileLoading: boolean,
  error: string,
  user: User | null,
}


export const initialState: Auth = {
  token: localStorage.getItem("token") || null,
  isAuthLoading: false,
  isProfileLoading: false,
  error: '',
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.isAuthLoading = true;
      state.error = ''
    },
    authRegisterSuccess: (state) => {
      state.isAuthLoading = false;
      state.error = '';
    },
    authLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthLoading = false;
      state.error = '';
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    profileStart: (state) => {
      state.isProfileLoading = true;
      state.error = ''
    },
    profileSuccess: (state, action: PayloadAction<User>) => {
      state.isProfileLoading = false;
      state.user = action.payload;
      state.error = ''
    },
    failed: (state, action: PayloadAction<string>) => {
      state.isAuthLoading = false;
      state.isProfileLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
})

export const { failed, authStart, authLoginSuccess, authRegisterSuccess, profileStart, profileSuccess, logout } = authSlice.actions



