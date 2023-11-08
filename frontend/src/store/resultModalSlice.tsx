import { createSlice } from '@reduxjs/toolkit';

const resultModalSlice = createSlice({
  name: 'resultModal',
  initialState: { resultIsVisible: false, step: 1 },
  reducers: {
    toggle(state) {
      state.resultIsVisible = !state.resultIsVisible;
    },
    nextStep(state) {
      state.step += 1;
    },
  },
});

export const resultModalActions = resultModalSlice.actions;
export default resultModalSlice;
