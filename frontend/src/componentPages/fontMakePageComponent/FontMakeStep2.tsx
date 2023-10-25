import React from 'react';
import classes from './FontMakeStep2.module.css'
import MinuGuide from './fontMakePageAssets/guideline_ex.png'

import { FaRegTimesCircle } from "react-icons/fa";

const FontMakeStep2: React.FC = () => {
  return (
    <>
      <div className={classes.loadContainer}>
        <div className={classes.downLoadContainer}>
          <div className={classes.info}>
            또박또박 손글씨 가이드라인을 다운받아 {'\n'}
            손글씨를 작성하고, 업로드 해주세요.
          </div>
          <img src={MinuGuide} alt="MinuGuide" className={classes.minuGuidImg} />
          <button className={classes.downBtn}>다운로드</button>
        </div>

        <div className={classes.upLoadContainer}>
          <div className={classes.upLoadBar}>
            파일 업로드
          </div>
          <div className={classes.upLoadList}>
            <div className={classes.upLoadFile}>
              파일 목록
              <FaRegTimesCircle style={{ marginLeft: '10px' }} />
            </div>
          </div>
          <div className={classes.info}>
            ※ 또박또박 폰트 제작에는 약간의 시간이 소요되며, {'\n'}
            완료 시 메일을 발송해드립니다.
          </div>
        </div>
      </div>
    </>
  )
}
export default FontMakeStep2
