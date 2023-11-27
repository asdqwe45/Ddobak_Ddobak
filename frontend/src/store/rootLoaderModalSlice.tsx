import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RootLoaderType {
  header: string;
  context: string;
  subContext: string;
  type: string;
}

const rootLoaderModalSlice = createSlice({
  name: 'rootLoader',
  initialState: {
    header: '',
    context: '',
    subContext: '',
    type: '',
    isVisible: false,
  },
  reducers: {
    toggleModal(state, action: PayloadAction<RootLoaderType>) {
      const isVisible = state.isVisible;
      state.isVisible = !isVisible;
      if (isVisible) {
        state.header = '';
        state.context = '';
        state.type = '';
        state.subContext = '';
      } else {
        state.header = action.payload.header;
        state.context = action.payload.context;
        state.type = action.payload.type;
        state.subContext = action.payload.subContext;
      }
    },
  },
});

export const rootLoaderModalActions = rootLoaderModalSlice.actions;
export default rootLoaderModalSlice;
