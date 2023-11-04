import { createSlice } from '@reduxjs/toolkit';

const chargePointModalSlice = createSlice({
  name: 'chargePoint',
  initialState: { chargePointVisible: false },
  reducers: {
    toggle(state) {
      state.chargePointVisible = !state.chargePointVisible;
    },
  },
});

export const chargePointModalActions = chargePointModalSlice.actions;
export default chargePointModalSlice;
