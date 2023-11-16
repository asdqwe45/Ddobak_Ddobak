import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    mainList: 0,
    fontDetail: 0,
    dibRefresh: 0,
  },
  reducers: {
    mainPlus(state) {
      state.mainList++;
    },
    detailPlus(state) {
      state.fontDetail++;
    },
    dibPlus(state) {
      state.dibRefresh++;
    },
  },
});
export const refreshActions = refreshSlice.actions;
export default refreshSlice;
