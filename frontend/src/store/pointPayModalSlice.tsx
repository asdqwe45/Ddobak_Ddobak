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

interface MakeFontType {
  makeFontRequest: {
    fontId: string;
    fontSortUrl: string;
    korFontName: string;
    engFontName: string;
    openStatus: boolean;
    freeStatus: boolean;
    price: number;
    introduceText: string;
    keywords: string[];
  };
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
    makeFontRequest: {
      fontId: '',
      fontSortUrl: '',
      korFontName: '',
      engFontName: '',
      openStatus: false,
      freeStatus: false,
      price: 0,
      introduceText: '',
      keywords: [''],
    },
  },
  reducers: {
    toggle(state) {
      state.pointPayVisible = !state.pointPayVisible;
    },
    payThePrice(state, action: PayloadAction<PayThePriceAction>) {
      state.howMuch = action.payload.howMuch;
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
        makeFontRequest: {
          fontId: '',
          fontSortUrl: '',
          korFontName: '',
          engFontName: '',
          openStatus: false,
          freeStatus: false,
          price: 0,
          introduceText: '',
          keywords: [''],
        },
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
    makeFont(state, action: PayloadAction<MakeFontType>) {
      state.makeFontRequest = action.payload.makeFontRequest;
    },
  },
});

export const pointPayModalActions = pointModalSlice.actions;
export default pointModalSlice;
