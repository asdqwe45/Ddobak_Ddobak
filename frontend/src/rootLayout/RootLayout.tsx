import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import classes from './RootLayout.module.css';

import FontResultModal from 'common/fontResultModal/FontResultModal';

const RootLayout: React.FC = () => {
  return (
    <div>
      <FontResultModal />
      <NavBar />
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  );
};
export default RootLayout;
