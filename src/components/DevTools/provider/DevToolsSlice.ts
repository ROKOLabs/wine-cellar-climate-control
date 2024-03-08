import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

export type DevToolsState = {
  isDevToolsOpen: boolean;
};

const initialState: DevToolsState = {
  isDevToolsOpen: false,
};

const devToolsSlice = createSlice({
  name: 'DevTools',
  initialState,
  reducers: {
    toggleDevTools: (state) => {
      state.isDevToolsOpen = !state.isDevToolsOpen;
    },
  },
});

export const { reducer: devToolsSliceReducer } = devToolsSlice;

export const { toggleDevTools } = devToolsSlice.actions;

export const selectIsDevToolsOpen = (state: RootState) =>
  state.devTools.isDevToolsOpen;
