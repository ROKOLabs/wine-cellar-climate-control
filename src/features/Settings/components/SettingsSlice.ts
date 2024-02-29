import { createSlice } from '@reduxjs/toolkit';

export type SettingsState = {
  isDarkTheme: boolean;
  showErrors: boolean;
};

const initialState: SettingsState = {
  isDarkTheme: false,
  showErrors: false,
};

const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    toggleDarkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setShowErrors(state) {
      state.showErrors = !state.showErrors;
    },
  },
});

export const { toggleDarkTheme, setShowErrors } = settingsSlice.actions;

export const { reducer: settingsSliceReducer } = settingsSlice;
