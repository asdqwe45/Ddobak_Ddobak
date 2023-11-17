import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChargePointType {
  myPoint: number;
  nickname: string;
}

interface ChargeWhereType {
  isModal: boolean;
}

const chargePointModalSlice = createSlice({
  name: 'chargePoint',
  initialState: {
    chargePointVisible: false,
    myPoint: 0,
    nickname: '',
    isModal: true,
    chargeCount: 0,
  },
  reducers: {
    toggle(state) {
      state.chargePointVisible = !state.chargePointVisible;
    },
    currentMyState(state, action: PayloadAction<ChargePointType>) {
      state.myPoint = action.payload.myPoint;
      state.nickname = action.payload.nickname;
    },
    chargeWhereFC(state, action: PayloadAction<ChargeWhereType>) {
      state.isModal = action.payload.isModal;
    },
    chargePlus(state) {
      state.chargeCount = state.chargeCount + 1;
    },
  },
});

export const chargePointModalActions = chargePointModalSlice.actions;
export default chargePointModalSlice;
