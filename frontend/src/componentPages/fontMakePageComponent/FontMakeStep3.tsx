import React, { useEffect, useState } from 'react';
import classes from './FontMakeStep3.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import RedPencil from './fontMakePageAssets/red_pencil.png';
import { useNavigate } from 'react-router-dom';

interface pointPayModalState {
  pointModal: {
    pointPayVisible: boolean;
    howMuch: number;
    boughtSometing: string;
    isPaid: boolean;
  };
}

const FontMakeStep3: React.FC = () => {
  const navigate = useNavigate();
  const boughtSometing = useSelector(
    (state: pointPayModalState) => state.pointModal.boughtSometing,
  );
  const howMuch = useSelector((state: pointPayModalState) => state.pointModal.howMuch);
  const isPaid = useSelector((state: pointPayModalState) => state.pointModal.isPaid);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const loadingTime = 5000; // 로딩 시간을 5000ms (5초)로 설정

  useEffect(() => {
    if (isPaid) {
      // console.log(boughtSometing, howMuch);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, loadingTime / 100); // 1%씩 증가
    }
  }, [loadingTime, boughtSometing, howMuch, isPaid]);
  useEffect(() => {
    if (progress === 100) {
      dispatch(pointPayModalActions.resetState());
    }
  }, [progress, dispatch]);
  return (
    <>
      <div>
        <div className={classes.loadingContainer}>
          <div className={classes.loadingInfo}>
            <div style={{ display: 'flex' }}>
              <div>AI가 열심히 폰트를 제작하고 있어요!</div>
              <img src={RedPencil} alt="RedPencil" className={classes.redPencilImg} />
            </div>
          </div>
        </div>
        <div className={classes.loadingInfo}>
          <p>제작이 완료되면 메일📧로 알려드립니다.</p>
          <p>마이페이지에서 확인해 주세요. 😊</p>
        </div>
        <div className={classes.btnContainer}>
          <button
            className={classes.mypageBtn}
            onClick={async () => {
              navigate('/myPage');
              window.location.reload();
            }}
          >
            마이페이지로 이동
          </button>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep3;
