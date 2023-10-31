import React from 'react';
import classes from './FontMakeStep3.module.css'

const FontMakeStep3: React.FC = () => {
  return (
    <>
      <div className={classes.loadingContainer}>
        
        <div className={classes.loadingBar}>
          로딩 애니메이션 위치
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
