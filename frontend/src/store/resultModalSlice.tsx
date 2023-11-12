import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultModalState {
  resultIsVisible: boolean;
  step: number;
  sortUrl: string;
  fontId: number;  
}

const initialState: ResultModalState = {
  resultIsVisible: false,
  step: 1,
  sortUrl: '',
  fontId: 0,
};

const resultModalSlice = createSlice({
  name: 'resultModal',
  initialState,
  reducers: {
    toggle(state) {
      state.resultIsVisible = !state.resultIsVisible;
    },
    nextStep(state) {
      state.step += 1;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setSortUrl(state, action: PayloadAction<string>) {
      state.sortUrl = action.payload;
    },
    setFontId(state, action: PayloadAction<number>) {
      state.fontId = action.payload;
    },
  },
});

export const { toggle, nextStep, setStep, setSortUrl, setFontId } = resultModalSlice.actions;
export const resultModalActions = resultModalSlice.actions;
export default resultModalSlice;
