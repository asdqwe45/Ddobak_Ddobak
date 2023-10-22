import { NavLink } from 'react-router-dom'
import classes from './NavBar.module.css'
import NavLogo from './navBarAssets/navLogo.png'

const NavBar: React.FC = () => {
  return (
    <>
      <nav className={classes.header}>
        <div className={classes.list}>
          <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)}>
            <img src={NavLogo} alt="NavLogo" className={classes.navImage} />
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) => (isActive ? classes.active : classes.navPont)}
          >
            제작하기
          </NavLink>
          <NavLink
            to="/pontList"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
          >
            PontList
          </NavLink>
          <NavLink
            to="/question"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
          >
            Question
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
          >
            로그인 해주세요
          </NavLink>
          {/* <NavLink
            to="/signUp"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Signup
          </NavLink> */}
          <NavLink
            to="/myPage"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
          >
            MyPage
          </NavLink>
        </div>
      </nav>
    </>
  )
}
export default NavBar
