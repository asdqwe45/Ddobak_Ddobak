import { createSlice } from '@reduxjs/toolkit';

const failAuthModalSlice = createSlice({
  name: 'failAuth',
  initialState: {
    failAuth: false,
  },
  reducers: {
    toggle(state) {
      state.failAuth = !state.failAuth;
    },
  },
});

export const failAuthModalActions = failAuthModalSlice.actions;
export default failAuthModalSlice;
