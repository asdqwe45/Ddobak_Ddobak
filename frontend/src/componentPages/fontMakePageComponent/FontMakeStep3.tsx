import React, { useEffect, useState } from 'react';
import classes from './FontMakeStep3.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import RedPencil from './fontMakePageAssets/red_pencil.png';

interface pointPayModalState {
  pointModal: {
    pointPayVisible: boolean;
    howMuch: number;
    boughtSometing: string;
    isPaid: boolean;
  };
}

const FontMakeStep3: React.FC = () => {
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
      console.log(boughtSometing, howMuch);
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
          <div className={classes.loadingBar}>
            <div className={classes.progressBar} style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
          <img src={RedPencil} alt="RedPencil" className={classes.redPencilImg} />
        </div>
        <div className={classes.loadingInfo}>
          <p>AI가 열심히 폰트를 제작하고 있어요!</p>
          <p>잠시만 기다려 주세요.</p>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep3;
