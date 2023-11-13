import { useEffect, useState } from 'react';
import { NavLink, NavigateFunction } from 'react-router-dom';
import classes from './NavBar.module.css';
import NavLogo from '../common/commonAssets/ddobak_logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { mainRedColor } from 'common/colors/CommonColors';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogout } from 'https/utils/AuthFunction';
/*
// Save to local storage
window.localStorage.setItem(key, JSON.stringify(newValue))
const item = window.localStorage.getItem(key)
return item ? (parseJSON(item) as T) : initialValue

// 데이터 저장하기
localStorage.setItem("key", value);

// 데이터 읽기
localStorage.getItem("key");

// 데이터 삭제
localStorage.removeItem("key");

// 모든 데이터 삭제
localStorage.clear();

// 저장된 키/값 쌍의 개수
localStorage.length;

*/

const NavBar: React.FC = () => {
  // 로그인이 되면 새로고침되게 할 것
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const hamburgerToggle = () => {
    setIsClicked(!isClicked);
  };

  const [haveToken, setHaveToken] = useState<boolean>(false);
  const [myToken, setMyToken] = useState<string>('');
  useEffect(() => {
    async function fetch() {
      const offset = new Date().getTimezoneOffset() * 60000;
      const today = new Date(Date.now() - offset);
      const accessToken = localStorage.getItem('accessToken');
      const prevDate = localStorage.getItem('today');
      if (accessToken && prevDate) {
        const newAccessToken = JSON.parse(accessToken);
        // 현재 시간이랑 비교
        // 1시간
        const oneHour = 3540000;
        const prevToday = new Date(prevDate);
        if (today.getTime() <= prevToday.getTime() + oneHour) {
          setHaveToken(true);
          setMyToken(newAccessToken);
        } else {
          localStorage.removeItem('id');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('profileImgUrl');
          localStorage.removeItem('today');
          window.location.reload();
        }
      }
    }
    fetch();
  }, [myToken]);

  const location = useLocation();

  const isActivePath = (pathPatterns: string[]): boolean => {
    for (const pattern of pathPatterns) {
      if (location.pathname.startsWith(pattern)) {
        return true;
      }
    }
    return false;
  };

  const logoutHandler = async () => {
    await userLogout()
      .then(async (r) => {
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  localStorage.removeItem('id');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('profileImgUrl');
  localStorage.removeItem('today');
  navigate('/');
  window.location.reload();
  return (
    <div className={classes.header}>
      <div className={classes.list}>
        <div className={haveToken ? classes.leftBox : classes.leftNoTokenBox}>
          <div className={classes.logoBox}>
            <NavLink to="/">
              <img src={NavLogo} alt="NavLogo" className={classes.navImage} />
            </NavLink>
          </div>
          <div className={classes.smallBox}>
            {haveToken ? (
              <>
                <NavLink
                  to="/fontMake"
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                >
                  제작하기
                </NavLink>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={classes.smallBox}>
            <NavLink
              to="/fontList"
              className={
                isActivePath(['/fontList', '/font/', '/maker']) ? classes.active : undefined
              }
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
          {haveToken ? (
            <>
              <div className={classes.loginBox}>
                <NavLink
                  to="/myPage"
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                >
                  마이페이지
                </NavLink>
              </div>
              <div className={classes.loginBox}>
                <p className={classes.navFont} onClick={logoutHandler}>
                  로그아웃
                </p>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className={classes.hamburgerBarBox}>
          <GiHamburgerMenu
            size={40}
            color={mainRedColor}
            onClick={hamburgerToggle}
            className={classes.hamburgerBar}
          />
          {isClicked ? <>{hamburgerMenuBar(haveToken, navigate, setIsClicked)}</> : <></>}
        </div>
      </div>
    </div>
  );
};
export default NavBar;

const hamburgerMenuBar = (
  haveToken: boolean,
  navigate: NavigateFunction,
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const logoutHandler = async () => {
    setIsClicked(false);
    userLogout()
      .then(async (r) => {
        console.log(r);
        localStorage.removeItem('id');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('profileImgUrl');
        localStorage.removeItem('today');
        navigate('/');
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className={classes.menuDiv}>
      <div className={classes.menuList}>
        <div
          className={classes.menuDetail}
          onClick={async () => {
            setIsClicked(false);
            navigate('/fontMake');
          }}
        >
          <p className={classes.menuFont}>제작하기</p>
        </div>
      </div>
      <div className={classes.menuList}>
        <div
          className={classes.menuDetail}
          onClick={async () => {
            setIsClicked(false);
            navigate('/fontList');
          }}
        >
          <p className={classes.menuFont}>폰트보기</p>
        </div>
      </div>
      <div className={classes.menuList}>
        <div
          className={classes.menuDetail}
          onClick={async () => {
            setIsClicked(false);
            navigate('/faqPage');
          }}
        >
          <p className={classes.menuFont}>궁금해요</p>
        </div>
      </div>
      {haveToken ? (
        <>
          <div className={classes.menuList}>
            <div
              className={classes.menuDetail}
              onClick={async () => {
                setIsClicked(false);
                navigate('/myPage');
              }}
            >
              <p className={classes.menuFont}>마이페이지</p>
            </div>
          </div>
          <div className={classes.menuList}>
            <div
              className={classes.menuDetail}
              onClick={async () => {
                logoutHandler();
              }}
            >
              <p className={classes.menuFont}>로그아웃</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.menuList}>
            <div
              className={classes.menuDetail}
              onClick={async () => {
                setIsClicked(false);
                navigate('/login');
              }}
            >
              <p className={classes.menuFont}>로그인</p>
            </div>
          </div>
          <div className={classes.menuList}>
            <div
              className={classes.menuDetail}
              onClick={async () => {
                setIsClicked(false);
                navigate('/signup');
              }}
            >
              <p className={classes.menuFont}>회원가입</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
