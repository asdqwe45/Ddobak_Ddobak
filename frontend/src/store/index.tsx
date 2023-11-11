import { configureStore } from '@reduxjs/toolkit';

import resultModalSlice from './resultModalSlice';
import pointModalSlice from './pointPayModalSlice';
import changePwModalSlice from './changePwModalSlice';
import reviewModalSlice from './reviewModalSlice';
import chargePointModalSlice from './chargePointModalSlice';
import exchangeModalSlice from './exchangeModalSlice';
import changeProfileImgModalSlice from './changeProfileImgModalSlice';
import goToBasketModalSlice from './goToBasketModalSlice';
import signupLoaderSlice from './signupLoaderSlice';
import failAuthModalSlice from './failAuthModalSlice';
import changeNicknameModalSlice from './changeNicknameSlice';

const store = configureStore({
  reducer: {
    resultModal: resultModalSlice.reducer,
    pointModal: pointModalSlice.reducer,
    changePwModal: changePwModalSlice.reducer,
    reviewModal: reviewModalSlice.reducer,
    chargePoint: chargePointModalSlice.reducer,
    exchangeModal: exchangeModalSlice.reducer,
    changeProfileImg: changeProfileImgModalSlice.reducer,
    goToBasket: goToBasketModalSlice.reducer,
    signupLoader: signupLoaderSlice.reducer,
    failAuth: failAuthModalSlice.reducer,
    changeNickname: changeNicknameModalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
