import { createSlice } from '@reduxjs/toolkit';

const changeProfileImgModalSlice = createSlice({
  name: 'changeProfileImg',
  initialState: {
    changeProfileImg: false,
  },
  reducers: {
    toggle(state) {
      state.changeProfileImg = !state.changeProfileImg;
    },
  },
});

export const changeProfileImgModalActions = changeProfileImgModalSlice.actions;
export default changeProfileImgModalSlice;
