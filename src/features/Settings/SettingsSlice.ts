import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

export type SettingsState = {
  isDarkTheme: boolean;
  showErrors: boolean;
  selectedDevice: '0' | '1' | '2';
};

const initialState: SettingsState = {
  isDarkTheme: false,
  showErrors: false,
  selectedDevice: '0',
};

const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    toggleDarkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleShowErrors(state) {
      state.showErrors = !state.showErrors;
    },
    setSelectedDevice(state, action) {
      state.selectedDevice = action.payload;
    },
  },
});

export const { toggleDarkTheme, toggleShowErrors, setSelectedDevice } =
  settingsSlice.actions;

export const { reducer: settingsSliceReducer } = settingsSlice;

export const selectSelectedDevice = (state: RootState) =>
  state.settings.selectedDevice;

export const selectShowErrors = (state: RootState) => state.settings.showErrors;
