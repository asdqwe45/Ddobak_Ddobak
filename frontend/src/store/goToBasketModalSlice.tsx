import { createSlice } from '@reduxjs/toolkit';

const goToBasketModalSlice = createSlice({
  name: 'goToBasket',
  initialState: {
    basketVisible: false,
  },
  reducers: {
    toggle(state) {
      state.basketVisible = !state.basketVisible;
    },
  },
});

export const goToBasketModalActions = goToBasketModalSlice.actions;
export default goToBasketModalSlice;
