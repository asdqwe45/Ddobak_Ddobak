import React from 'react';
import classes from './FontOptionPage.module.css'

// components
import { PageTitle, BoxTitle, InputTitle } from 'common/titleComponents/TitleComponents';
// import RadioBtn from 'common/radioButton/RadioBtn';
import KeywordBtn from 'common/keywordButton/KeywordBtn';

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
            <InputTitle>한글명</InputTitle>
            <input type="text" placeholder="예시) 또박또박_글씨체" style={{ width: '20vw', height: '50px' }} />
              
            <button>중복확인</button>
          </div>
          <div className={classes.nameInput} style={{ flexGrow: '2' }}>
            <InputTitle>영문명</InputTitle>
            <input type="text" placeholder="예시) ddobak_test" style={{ width: '20vw', height: '50px' }} />
            <button>중복확인</button>
          </div>
        </div>
      </div>
      <br /><hr /><br />
      {/* 저작권 관계 명시 */}
      <div className={classes.relationContainer}>
        <BoxTitle>저작권 관계 명시</BoxTitle>
        <div>
          <div className={classes.rowContainer}>
            <InputTitle>제작 주문자와 저작권자의 관계</InputTitle>
            <input type="radio" name="same" /><p>동일인</p>
            <input type="radio" name="same" /><p>동일인 아님</p>
            {/* <RadioBtn /> */}
          </div>
        </div>
        {/* 동일인 선택시 자동으로 입력되도록 구현 */}
        <div className={classes.rowContainer}>
          <InputTitle>저작권자 이름</InputTitle>
          <input type="text" style={{ width: '15vw', height: '50px' }} />
          <div>※ 작성된 이름으로 폰트의 저작권자 명이 표시됩니다.</div>
        </div>


      </div>
      <br /><hr /><br />
      {/* 허용 여부 라디오버튼 */}
      <div className={classes.radioBtnContainer}>
        <BoxTitle>허용 여부 설정</BoxTitle>
        <div>라디오 버튼 5개</div>

        {/* 라디오 컴포넌트 만들고 import */}

        {/* 가격 설정 - 유/무료, 판매금액 설정 */}
        <div className={classes.rowContainer}><InputTitle>판매 금액 설정</InputTitle>
          <input type="text" style={{ width: '15vw', height: '50px' }} /><p>원</p></div>
        <div className={classes.priceContainer}></div>
      </div>
      <br /><hr /><br />
      {/* 폰트 키워드 */}
      <div className={classes.keywordContainer}>
        <div className={classes.rowContainer}>
          <BoxTitle>폰트 키워드</BoxTitle>
          <div style={{ marginLeft: '60px' }}>※ 폰트를 검색할 때 이용될 키워드입니다. (1개 이상 최대 3개 선택)</div>
        </div>
        <KeywordBtn />
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
