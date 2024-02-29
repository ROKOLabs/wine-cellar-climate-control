import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  selectedDevice: string;
}

const initialState: DeviceState = {
  selectedDevice: 'Arduino1',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setSelectedDevice(state, action: PayloadAction<string>) {
      state.selectedDevice = action.payload;
    },
  },
});

export const { setSelectedDevice } = deviceSlice.actions;

export const { reducer: deviceSliceReducer } = deviceSlice;
