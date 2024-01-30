import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

type User = {
  id: number;
  name: string;
  email: string;
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
  reducers: {},
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
