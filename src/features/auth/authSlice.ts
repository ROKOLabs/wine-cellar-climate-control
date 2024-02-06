import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

export type User = {
  email: string;
  lastname: string;
  name: string;
  username: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setUser, clearUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
