import { createSlice } from '@reduxjs/toolkit';

const exchangeModalSlice = createSlice({
  name: 'exchangeModal',
  initialState: { exchangeVisible: false },
  reducers: {
    toggle(state) {
      state.exchangeVisible = !state.exchangeVisible;
    },
  },
});

export const exchangeModalActions = exchangeModalSlice.actions;
export default exchangeModalSlice;
