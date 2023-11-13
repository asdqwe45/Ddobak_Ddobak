import React from 'react';
import classes from './FontMakeStep1.module.css';
import guideLine from './fontMakePageAssets/guideLine.png';

// 가이드라인 다운로드
const handleEngDownload = async () => {
  try {
    const response = await fetch(
      'https://ddobakimage.s3.ap-northeast-2.amazonaws.com/template/template.pdf',
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // 다운로드 시, 파일 이름
      a.download = 'ddobak_english.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('한글 템플릿 다운로드 중 에러 발생', error);
  }
};
const handleKorDownload = async () => {
  try {
    const response = await fetch(
      'https://ddobakimage.s3.ap-northeast-2.amazonaws.com/template/template.pdf',
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // 다운로드 시, 파일 이름
      a.download = 'ddobak_korean.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('영어 템플릿 다운로드 중 에러 발생', error);
  }
};

const FontMakeStep1: React.FC = () => {
  return (
    <>
      {/* 가이드라인 */}
      <div className={classes.container}>
        <div className={classes.downLoadContainer}>
          <img src={guideLine} alt="" className={classes.guideImg} />
            <div className={classes.templateText}>가이드라인 다운로드</div>
            <div className={classes.btnContainer}>  
            <button className={classes.downBtn} onClick={handleEngDownload}>
              영어 | 특수기호
            </button>
            <button className={classes.downBtn} onClick={handleKorDownload}>
              한글 템플릿
            </button>
          </div>
        </div>

        <div className={classes.rightContainer}>
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
              - 글자가 <strong>가이드라인에 닿지 않게, 중앙에</strong> 작성해 주세요. <br />- 틀린
              글자는 수정테이프로 고쳐주세요. <br />- 제작 비용 : 50,000P (첫 제작은 무료에요. 🤗)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep1;
