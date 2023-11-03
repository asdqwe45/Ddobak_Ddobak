import { createSlice } from '@reduxjs/toolkit';

const changePwModalSlice = createSlice({
  name: 'changePwModal',
  initialState: { changePwVisible: false },
  reducers: {
    toggle(state) {
      state.changePwVisible = !state.changePwVisible;
    },
  },
});

export const changePwModalActions = changePwModalSlice.actions;
export default changePwModalSlice;
