import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import classes from './RootLayout.module.css';

import FontResultModal from 'common/modals/fontResultModal/FontResultModal';
import PointPayModal from 'common/modals/pointPayModal/PointPayModal';
import ChangePwModal from 'common/modals/changePwModal/ChangePwModal';
import ReviewModal from 'common/modals/reviewModal/ReviewModal';

const RootLayout: React.FC = () => {
  return (
    <div>
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
