import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChangeMakerIntroType {
  changeMakerIntro: string;
}

const changeMakerIntroModalSlice = createSlice({
  name: 'changeMakerIntro',
  initialState: {
    wantChange: false,
    makerIntro: '',
  },
  reducers: {
    toggle(state) {
      state.wantChange = !state.wantChange;
    },
    loadMakerIntro(state, action: PayloadAction<ChangeMakerIntroType>) {
      state.makerIntro = action.payload.changeMakerIntro;
    },
  },
});

export default changeMakerIntroModalSlice;
export const changeMakerIntroModalActions = changeMakerIntroModalSlice.actions;
