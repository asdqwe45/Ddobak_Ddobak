import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const resultModalSlice = createSlice({
  name: 'resultModal',
  initialState: {
    resultIsVisible: false,
    step: 1,
    sortUrl: '',
  },
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
  },
});

export const { toggle, nextStep, setStep, setSortUrl } = resultModalSlice.actions;
export const resultModalActions = resultModalSlice.actions;
export default resultModalSlice;
