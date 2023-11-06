import { createSlice } from '@reduxjs/toolkit';

const resultModalSlice = createSlice({
  name: 'resultModal',
  initialState: { resultIsVisible: false },
  reducers: {
    toggle(state) {
      state.resultIsVisible = !state.resultIsVisible;
    },
  },
});

export const resultModalActions = resultModalSlice.actions;
export default resultModalSlice;
