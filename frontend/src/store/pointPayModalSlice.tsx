import { createSlice } from '@reduxjs/toolkit';

const pointModalSlice = createSlice({
  name: 'pointModal',
  initialState: { pointPayVisible: false },
  reducers: {
    toggle(state) {
      state.pointPayVisible = !state.pointPayVisible;
    },
  },
});

export const pointPayModalActions = pointModalSlice.actions;
export default pointModalSlice;
