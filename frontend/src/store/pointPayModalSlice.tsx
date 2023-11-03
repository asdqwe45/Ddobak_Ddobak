import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PayThePriceAction {
  boughtSometing: string;
  howMuch: number;
}

const pointModalSlice = createSlice({
  name: 'pointModal',
  initialState: { pointPayVisible: false, howMuch: 0, boughtSometing: '', isPaid: false },
  reducers: {
    toggle(state) {
      state.pointPayVisible = !state.pointPayVisible;
    },
    payThePrice(state, action: PayloadAction<PayThePriceAction>) {
      state.howMuch = state.howMuch + action.payload.howMuch;
      state.boughtSometing = action.payload.boughtSometing;
    },
    paidSomething(state) {
      state.isPaid = !state.isPaid;
    },
    resetState(state) {
      // 추가
      return { pointPayVisible: false, howMuch: 0, boughtSometing: '', isPaid: false };
    },
  },
});

export const pointPayModalActions = pointModalSlice.actions;
export default pointModalSlice;
