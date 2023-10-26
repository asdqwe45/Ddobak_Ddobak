import React from 'react';
import classes from './FontBoxComponent.module.css';

// 폰트 찜 before
import { FaRegBookmark } from 'react-icons/fa';
// 폰트 찜 after
// import { FaBookmark } from 'react-icons/fa';

const FontBoxComponent: React.FC = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>또박또박_테스트체</div>
          {/* 폰트 찜 before */}
          <FaRegBookmark className={classes.bookIcon} />
          {/* 폰트 찜 after */}
          {/* <FaBookmark className={classes.bookIcon} /> */}
        </div>
        <div className={classes.fontMaker}>제작자 닉네임</div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content}>다람쥐 헌 쳇바퀴에 타고파</div>
      </div>
    </>
  );
};
export default FontBoxComponent;
