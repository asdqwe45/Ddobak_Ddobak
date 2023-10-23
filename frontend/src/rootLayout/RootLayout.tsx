import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <h1>Root Layout</h1>
      <Outlet />
    </>
  );
};
export default RootLayout;
