import { createSlice } from '@reduxjs/toolkit';

const signupLoaderSlice = createSlice({
  name: 'signupLoader',
  initialState: {
    loaderVisible: false,
    signupSuccess: false,
    signupIsLoading: true,
    signupError: false,
  },
  reducers: {
    toggle(state) {
      state.loaderVisible = !state.loaderVisible;
    },
    successSignup(state) {
      state.signupSuccess = true;
    },
    errorSignup(state) {
      state.signupError = true;
    },
    isLoadingStop(state) {
      state.signupIsLoading = false;
    },
  },
});
export const signupLoaderActions = signupLoaderSlice.actions;
export default signupLoaderSlice;
