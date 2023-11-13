import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProgressType {
  gauge: number;
}

const progressLoaderSlice = createSlice({
  name: 'progress',
  initialState: {
    gauge: 100,
  },
  reducers: {
    gauge(state, action: PayloadAction<ProgressType>) {
      state.gauge = action.payload.gauge;
    },
  },
});
export const progressLoaderActions = progressLoaderSlice.actions;
export default progressLoaderSlice;
