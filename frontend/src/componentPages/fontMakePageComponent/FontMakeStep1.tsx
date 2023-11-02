import React from 'react';
import classes from './FontMakeStep1.module.css';

const FontMakeStep1: React.FC = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.titleBox}>준비물</div>
        {/* 준비물 박스 (종이, 태블릿PC) */}
        <div className={classes.supplyContainer}>
          <div className={classes.supplyBox}>
            <div className={classes.supplyTitle}>종이에 또박또박</div>
            <br />
            <div className={classes.supplyContent}>
              {/* - <strong>인쇄</strong>한 가이드라인 <br />*/}- 0.7mm 이상의{' '}
              <strong>검정색</strong> 잉크펜
              <br />- 받치고 쓸 <strong>책받침</strong> 또는 여분의 종이
            </div>
          </div>
          <div className={classes.supplyBox}>
            <div className={classes.supplyTitle}>태블릿PC에 또박또박</div>
            <br />
            <div className={classes.supplyContent}>
              {/* - <strong>다운로드</strong>한 가이드라인 <br />*/}
              - 태블릿용 펜슬
              <br />- 0.5mm 이상의 <strong>검정색</strong>으로 작성
            </div>
          </div>
        </div>
        {/* 주의해주세요 박스 */}
        <div className={classes.warningBox}>
          <div className={classes.warningTitle}>주의해주세요!</div>
          <div className={classes.warningContent}>
            - 글자가 <strong>가이드라인에 닿지 않게</strong> 작성해 주세요. <br />- 틀린 글자는
            수정테이프로 고쳐주세요.
          </div>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep1;
