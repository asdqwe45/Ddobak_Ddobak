import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import NavLogo from './navBarAssets/ddobak_logo.png';

const NavBar: React.FC = () => {
  return (
    <nav className={classes.header}>
      <div className={classes.list}>
        <div className={classes.leftBox}>
          <div className={classes.logoBox}>
            <NavLink to="/">
              <img src={NavLogo} alt="NavLogo" className={classes.navImage} />
            </NavLink>
          </div>
          <div className={classes.smallBox}>
            <NavLink
              to="/fontMake"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              제작하기
            </NavLink>
          </div>
          <div className={classes.smallBox}>
            <NavLink
              to="/fontList"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              폰트보기
            </NavLink>
          </div>
          <div className={classes.smallBox}>
            <NavLink
              to="/faqPage"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              궁금해요
            </NavLink>
          </div>
        </div>
        <div className={classes.rightBox}>
          <div className={classes.loginBox}>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              로그인
            </NavLink>
          </div>
          <div className={classes.loginBox}>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              회원가입
            </NavLink>
          </div>
          {/* <div className={classes.smallBox}>
              <NavLink
                to="/myPage"
                className={({ isActive }) => (isActive ? classes.active : undefined)}
              >
                MyPage
              </NavLink>
            </div> */}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
