import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import classes from './RootLayout.module.css';

import FontResultModal from 'common/modals/fontResultModal/FontResultModal';
import PointPayModal from 'common/modals/pointPayModal/PointPayModal';
import ChangePwModal from 'common/modals/changePwModal/ChangePwModal';
import ReviewModal from 'common/modals/reviewModal/ReviewModal';
import ChargePointModal from 'common/modals/chargePointModal/ChargePointModal';
import ExchangeModal from 'common/modals/exchangeModal/ExchangeModal';
import ChangeProfileImgModal from 'common/modals/changeProfileImgModal/ChangeProfileImgModal';
import GoToBasketModal from 'common/modals/goToBasketModal/GoToBasketModal';
import SignupLoaderModal from 'common/modals/signupLoaderModal/SignupLoaderModal';
import FailAuthModal from 'common/modals/failAuthModal/FailAuthModal';

const RootLayout: React.FC = () => {
  return (
    <div>
      <FailAuthModal />
      <SignupLoaderModal />
      <GoToBasketModal />
      <ChangeProfileImgModal />
      <ExchangeModal />
      <ChargePointModal />
      <ChangePwModal />
      <PointPayModal />
      <FontResultModal />
      <ReviewModal />
      <NavBar />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};
export default RootLayout;
