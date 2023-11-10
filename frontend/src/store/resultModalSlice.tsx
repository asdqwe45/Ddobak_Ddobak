import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ResultModalState {
//   resultIsVisible: boolean;
//   step: number;
// }

// const initialState: ResultModalState = {
//   resultIsVisible: false,
//   step: 1,
// };

const resultModalSlice = createSlice({
  name: 'resultModal',
  initialState: { resultIsVisible: false, step: 1 },
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
  },
});

export const { toggle, nextStep, setStep } = resultModalSlice.actions;
export const resultModalActions = resultModalSlice.actions;
export default resultModalSlice;
