import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type User } from 'firebase/auth';

import { RootState } from 'store/store';

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
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
