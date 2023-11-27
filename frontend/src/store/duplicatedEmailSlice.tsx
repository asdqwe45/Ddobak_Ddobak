import { createSlice } from '@reduxjs/toolkit';

const duplicatedEmailSlice = createSlice({
  name: 'duplicatedEmail',
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
  },
});
export default duplicatedEmailSlice;
export const duplicatedEmailActions = duplicatedEmailSlice.actions;
