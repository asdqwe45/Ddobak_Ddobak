import classes from './WrongPage.module.css';
import oops from './wrongPageAssets/oops.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WrongPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 세로 스크롤 막기, 가로 스크롤 허용
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'auto'; // 또는 'scroll'

    // 컴포넌트가 언마운트될 때 원래 상태로 복구
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'auto'; // 원래의 스크롤 설정으로 복구
    };
  }, []);
  return (
    <div id={'scroll'} className={classes.container}>
      <div className={classes.warningBox}>
        <h1 style={{ marginBottom: 20, fontSize: 90 }}>잠시만요!</h1>
        <h1 style={{ marginBottom: 5, fontSize: 24 }}>
          로그인 상태 또는 접속 경로를 확인해주세요.
        </h1>
        <div>
          <button
            className={classes.loginBtn}
            onClick={() => {
              navigate('/');
            }}
          >
            홈페이지 이동
          </button>
          <button
            className={classes.signupBtn}
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인 하기
          </button>
        </div>
      </div>
      <img src={oops} alt="" className={classes.oops} />
    </div>
  );
};

export default WrongPage;
