import React from 'react';
import classes from './FontOptionPage.module.css'

// components
import { PageTitle, BoxTitle } from 'common/titleComponents/TitleComponents';

const FontOptionPage: React.FC = () => {
  return (
    <>
      <div style={{ marginTop: '60px' }}>
        <PageTitle><span>폰트 정보 입력</span></PageTitle>
      </div>
      <br /><br />
      {/* 폰트 이름 - 한글, 영어 */}
      <div className={classes.fontNameContainer}>
        <BoxTitle>폰트 이름 설정</BoxTitle>
        <div className={classes.name}>
          <div className={classes.nameInput} style={{ flexGrow: '1' }}>
            <p>한글명</p>
            <input type="text" placeholder="예시) 또박또박_글씨체" />
            <button>중복확인</button>
          </div>
          <div className={classes.nameInput} style={{ flexGrow: '2' }}>
            <p>영문명</p>
            <input type="text" placeholder="예시) ddobak_test" />
            <button>중복확인</button>
          </div>
        </div>
      </div>
      <br /><hr /><br />
      {/* 저작권 관계 명시 */}
      <div className={classes.relationContainer}>
        <BoxTitle>저작권 관계 명시</BoxTitle>
        <div>
          <p>제작 주문자와 저작권자의 관계</p>
          {/* 라디오 버튼 import */}
        </div>
        {/* 동일인 선택시 자동으로 입력되도록 구현 */}
        <div>
          <p>저작권자 이름</p>
          <input type="text" />
        </div>


      </div>
      <br /><hr /><br />
      {/* 허용 여부 라디오버튼 */}
      <div className={classes.radioBtnContainer}>
        <BoxTitle>허용 여부 설정</BoxTitle>
        <div>라디오 버튼 5개</div>
        {/* 가격 설정 - 유/무료, 판매금액 설정 */}
        <div className={classes.priceContainer}></div>
      </div>
      <br /><hr /><br />
      {/* 폰트 키워드 */}
      <div className={classes.keywordContainer}>
        <BoxTitle>폰트 키워드</BoxTitle>
        <div>키워드 10개</div>
        {/* 컴포넌트 데려오깅 */}
      </div>
      <br /><hr /><br />
      {/* 약관 동의 라디오 버튼 */}
      <div className={classes.Container}>
        <BoxTitle>약관 동의</BoxTitle>
        <div>약관 동의 라디오 버튼 6개</div>
      </div>
      <br /><hr /><br />
      {/* 완료 or 저장하기 버튼 */}
    </>
  );
};
export default FontOptionPage;
