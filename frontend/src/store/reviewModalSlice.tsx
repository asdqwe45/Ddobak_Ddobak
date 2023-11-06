import { createSlice } from '@reduxjs/toolkit';

const reviewModalSlice = createSlice({
  name: 'reviewModal',
  initialState: { reviewVisible: false },
  reducers: {
    toggle(state) {
      state.reviewVisible = !state.reviewVisible;
    },
  },
});

export const reviewModalActions = reviewModalSlice.actions;
export default reviewModalSlice;
