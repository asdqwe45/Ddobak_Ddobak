import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PayThePriceAction {
  boughtSometing: string;
  howMuch: number;
}
interface PayRequestAction {
  sellerId: number;
  fontId: number;
  howMuch: number;
}

type BuyAllType = {
  sellerId: number;
  fontId: number;
};

interface PurchaseMany {
  buyAll: BuyAllType[];
}

const pointModalSlice = createSlice({
  name: 'pointModal',
  initialState: {
    pointPayVisible: false,
    howMuch: 0,
    boughtSometing: '',
    isPaid: false,
    sellerId: 0,
    fontId: 0,
    buyAll: [{ sellerId: 0, fontId: 0 }],
  },
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
    resetState() {
      // 추가
      return {
        pointPayVisible: false,
        howMuch: 0,
        boughtSometing: '',
        isPaid: false,
        sellerId: 0,
        fontId: 0,
        buyAll: [{ sellerId: 0, fontId: 0 }],
      };
    },
    payRequest(state, action: PayloadAction<PayRequestAction>) {
      state.fontId = action.payload.fontId;
      state.sellerId = action.payload.sellerId;
      state.howMuch = action.payload.howMuch;
    },
    buyAll(state, action: PayloadAction<PurchaseMany>) {
      state.buyAll = action.payload.buyAll;
    },
  },
});

export const pointPayModalActions = pointModalSlice.actions;
export default pointModalSlice;
