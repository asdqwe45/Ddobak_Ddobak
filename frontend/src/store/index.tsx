import { createSlice, type PayloadAction, configureStore } from '@reduxjs/toolkit';

import resultModalSlice from './resultModalSlice';
import pointModalSlice from './pointPayModalSlice';
import changePwModalSlice from './changePwModalSlice';
import reviewModalSlice from './reviewModalSlice';
import chargePointModalSlice from './chargePointModalSlice';
import exchangeModalSlice from './exchangeModalSlice';
import changeProfileImgModalSlice from './changeProfileImgModalSlice';
import goToBasketModalSlice from './goToBasketModalSlice';

const initialState = { value: 0, showCounter: true, showModal: false };

interface IncreaseAction {
  amount: number;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    increase(state, action: PayloadAction<IncreaseAction>) {
      state.value = state.value + action.payload.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: {
    resultModal: resultModalSlice.reducer,
    pointModal: pointModalSlice.reducer,
    changePwModal: changePwModalSlice.reducer,
    reviewModal: reviewModalSlice.reducer,
    chargePoint: chargePointModalSlice.reducer,
    exchangeModal: exchangeModalSlice.reducer,
    changeProfileImg: changeProfileImgModalSlice.reducer,
    goToBasket: goToBasketModalSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export default store;
