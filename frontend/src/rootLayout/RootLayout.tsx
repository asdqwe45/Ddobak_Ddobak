import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import classes from './RootLayout.module.css';

import FontResultModal from 'common/fontResultModal/FontResultModal';
import PointPayModal from 'common/pointPayModal/PointPayModal';

const RootLayout: React.FC = () => {
  return (
    <div>
      <PointPayModal />
      <FontResultModal />
      <NavBar />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};
export default RootLayout;
