import { createSlice } from '@reduxjs/toolkit';

const basketErrorModalSlice = createSlice({
  name: 'basketError',
  initialState: {
    basketVisible: false,
  },
  reducers: {
    toggle(state) {
      state.basketVisible = !state.basketVisible;
    },
  },
});
export const basketErrorModalActions = basketErrorModalSlice.actions;
export default basketErrorModalSlice;
