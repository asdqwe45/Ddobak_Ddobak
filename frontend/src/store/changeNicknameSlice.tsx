import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChangeNicknameType {
  changeNickname: string;
}

const changeNicknameModalSlice = createSlice({
  name: 'changeNickname',
  initialState: {
    wantChange: false,
    nickname: '',
  },
  reducers: {
    toggle(state) {
      state.wantChange = !state.wantChange;
    },
    loadNickname(state, action: PayloadAction<ChangeNicknameType>) {
      state.nickname = action.payload.changeNickname;
    },
  },
});

export const changeNicknameModalActions = changeNicknameModalSlice.actions;
export default changeNicknameModalSlice;
