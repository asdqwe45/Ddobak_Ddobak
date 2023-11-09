import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ReviewPayload {
  fontId: string;
}

const reviewModalSlice = createSlice({
  name: 'reviewModal',
  initialState: { reviewVisible: false, fontId: '' },
  reducers: {
    toggle(state) {
      state.reviewVisible = !state.reviewVisible;
    },
    register(state, action: PayloadAction<ReviewPayload>) {
      state.fontId = action.payload.fontId;
    },
  },
});

export const reviewModalActions = reviewModalSlice.actions;
export default reviewModalSlice;
