import { createSlice } from '@reduxjs/toolkit';

const progressLoaderSlice = createSlice({
  name: 'progress',
  initialState: {
    gauge: 100,
    refresh: true,
  },
  reducers: {
    startGuage(state) {
      state.refresh = true;
      state.gauge = 100;
    },
    resetGauge(state) {
      state.refresh = false;
      state.gauge = 0;
    },
  },
});

export default progressLoaderSlice;
export const progressLoaderActions = progressLoaderSlice.actions;
