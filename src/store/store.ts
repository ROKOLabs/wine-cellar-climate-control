import { configureStore } from '@reduxjs/toolkit';

import { authApi } from 'features/auth/authApi';
import { authReducer } from 'features/auth/authSlice';
import { firestoreApi } from 'features/db/dbSlice';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, firestoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
