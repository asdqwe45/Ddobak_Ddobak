import { createSlice, type PayloadAction, configureStore } from '@reduxjs/toolkit';

const initialState = { value: 0, showCounter: true };

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
  reducer: { counter: counterSlice.reducer },
});

export const counterActions = counterSlice.actions;
export default store;
