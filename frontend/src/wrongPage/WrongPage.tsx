import classes from './WrongPage.module.css';
import oops from './wrongPageAssets/oops.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WrongPage: React.FC = () => {
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 body의 overflow를 hidden으로 설정
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 컴포넌트가 언마운트될 때 원래 상태로 복구
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // 빈 의존성 배열로 마운트와 언마운트 시점에만 실행
  return (
    <div className={classes.container}>
      <div className={classes.warningBox}>
        <h1 style={{ marginBottom: 5 }}>Something went wrong</h1>
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
