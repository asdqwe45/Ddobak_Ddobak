import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChargePointType {
  myPoint: number;
  nickname: string;
}

const chargePointModalSlice = createSlice({
  name: 'chargePoint',
  initialState: { chargePointVisible: false, myPoint: 0, nickname: '' },
  reducers: {
    toggle(state) {
      state.chargePointVisible = !state.chargePointVisible;
    },
    currentMyState(state, action: PayloadAction<ChargePointType>) {
      state.myPoint = action.payload.myPoint;
      state.nickname = action.payload.nickname;
    },
  },
});

export const chargePointModalActions = chargePointModalSlice.actions;
export default chargePointModalSlice;
