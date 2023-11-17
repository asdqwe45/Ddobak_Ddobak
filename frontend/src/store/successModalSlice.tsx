import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SuccessType {
  successHeader: string;
  successContext: string;
}

const successModalSlice = createSlice({
  name: 'successModal',
  initialState: {
    successVisible: false,
    successHeader: '헤더',
    successContext: '콘텍스트',
  },
  reducers: {
    showSomething(state, action: PayloadAction<SuccessType>) {
      const nowVisible = state.successVisible;
      state.successVisible = !nowVisible;
      if (nowVisible) {
        state.successHeader = '헤더';
        state.successContext = '콘텍스트';
      } else {
        state.successHeader = action.payload.successHeader;
        state.successContext = action.payload.successContext;
      }
    },
  },
});
export const successModalActions = successModalSlice.actions;
export default successModalSlice;
