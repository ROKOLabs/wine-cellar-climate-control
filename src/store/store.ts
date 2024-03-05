import { configureStore } from '@reduxjs/toolkit';

import { devToolsSliceReducer } from 'components/DevTools/provider/DevToolsSlice';
import { settingsSliceReducer } from 'features/Settings/settingsSlice';
import { authApi } from 'features/auth/authApi';
import { dbApi } from 'features/db/dbApi';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    devTools: devToolsSliceReducer,
    settings: settingsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, dbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
