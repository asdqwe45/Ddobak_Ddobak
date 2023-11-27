import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChangeProfileType {
  changeImg: string;
}

const changeProfileImgModalSlice = createSlice({
  name: 'changeProfileImg',
  initialState: {
    changeProfileImg: false,
    profileImg: '',
  },
  reducers: {
    toggle(state) {
      state.changeProfileImg = !state.changeProfileImg;
    },
    loadImg(state, action: PayloadAction<ChangeProfileType>) {
      state.profileImg = action.payload.changeImg;
    },
  },
});

export const changeProfileImgModalActions = changeProfileImgModalSlice.actions;
export default changeProfileImgModalSlice;
