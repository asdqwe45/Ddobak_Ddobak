import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    mainList: 0,
  },
  reducers: {
    mainPlus(state) {
      state.mainList++;
    },
  },
});
export const refreshActions = refreshSlice.actions;
export default refreshSlice;
