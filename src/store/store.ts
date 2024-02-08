import { configureStore } from '@reduxjs/toolkit';

import { authApi } from 'features/auth/authApi';
import { authReducer } from 'features/auth/authSlice';
import { dbApi } from 'features/db/dbApi';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, dbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
