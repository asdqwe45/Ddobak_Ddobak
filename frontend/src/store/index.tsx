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
import changeMakerIntroModalSlice from './changeMakerIntroSlice';
import basketErrorModalSlice from './basketErrorModalSlice';
import successModalSlice from './successModalSlice';
import progressLoaderSlice from './progressLoaderSlice';
import duplicatedEmailSlice from './duplicatedEmailSlice';
import rootLoaderModalSlice from './rootLoaderModalSlice';

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
    changeMakerIntro: changeMakerIntroModalSlice.reducer,
    basketError: basketErrorModalSlice.reducer,
    successModal: successModalSlice.reducer,
    progress: progressLoaderSlice.reducer,
    duplicatedEmail: duplicatedEmailSlice.reducer,
    rootLoader: rootLoaderModalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
