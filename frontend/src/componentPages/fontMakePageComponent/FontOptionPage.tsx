import React from 'react'; // , { useState }
import classes from './FontOptionPage.module.css';

// components
import { BoxTitle, InputTitle } from 'common/titleComponents/TitleComponents';
import RadioBtn from 'common/checkButton/RadioBtn';
import KeywordBtn from 'common/keywordButton/KeywordBtn';
import TermsAgreement from 'common/checkButton/TermsAgreement';
import { useDispatch } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';

interface FontOptionPageProps {
  step?: number;
  setStep?: (step: number) => void;
}

const FontOptionPage: React.FC<FontOptionPageProps> = ({ setStep, step }) => {
  // 라디오 버튼 선택
  // const [selectedOption, setSelectedOption] = useState<string>('');

  // 약관 동의 여부
  const handleAgreement = (agreed: boolean) => {
    if (agreed) {
      console.log('모든 약관에 동의하였습니다.');
    } else {
      console.log('모든 약관에 동의하지 않았습니다.');
    }
  };

  const dispatch = useDispatch();
  const clickPayHandler = async () => {
    dispatch(pointPayModalActions.payThePrice({ howMuch: 50000, boughtSometing: '폰트제작' }));
    dispatch(pointPayModalActions.toggle());
    if (step && setStep) {
      const nextStep = step + 1;
      setStep(nextStep);
    }
  };

  return (
    <>
      <div className={classes.container}>
        {/* <div style={{ marginTop: '60px' }}>
        <PageTitle>
          <span>폰트 정보 입력</span>
        </PageTitle>
      </div> */}
        <div className={classes.fontNameContainer}>
          <BoxTitle>폰트 이름 설정</BoxTitle>
          <div className={classes.name}>
            <div className={classes.nameInput} style={{ flexGrow: '1' }}>
              <InputTitle>한글명</InputTitle>
              <input
                type="text"
                placeholder="예시) 또박또박_글씨체"
                style={{ width: '20vw', height: '50px' }}
              />

              <button>중복확인</button>
            </div>
            <div className={classes.nameInput} style={{ flexGrow: '2' }}>
              <InputTitle>영문명</InputTitle>
              <input
                type="text"
                placeholder="예시) ddobak_test"
                style={{ width: '20vw', height: '50px' }}
              />
              <button>중복확인</button>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />

        {/* 저작권 관계 명시 */}
        <div className={classes.relationContainer}>
          <BoxTitle>저작권 관계 명시</BoxTitle>
          <div>
            <div className={classes.rowContainer}>
              <InputTitle>제작 주문자와 저작권자의 관계</InputTitle>
              <RadioBtn
                options={['동일인', '동일인 아님']}
                name="same"
                // onChange={setSelectedOption}
                style={{ marginLeft: '40px' }}
              />
            </div>
          </div>
          {/* 동일인 선택시 자동으로 입력되도록 구현 */}
          <div className={classes.rowContainer}>
            <InputTitle>저작권자 이름</InputTitle>
            <input type="text" style={{ width: '15vw', height: '50px' }} />
            <div style={{ marginLeft: '40px' }}>
              ※ 작성된 이름으로 폰트의 저작권자 명이 표시됩니다.
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />

        {/* 허용 여부 라디오버튼 */}
        <div className={classes.radioBtnContainer}>
          <BoxTitle>허용 여부 설정</BoxTitle>
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>공개 여부</InputTitle>
            <RadioBtn
              options={['공개', '비공개']}
              name="open"
              // onChange={setSelectedOption}
            />
          </div>
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>상업적 이용 허용</InputTitle>
            <RadioBtn
              options={['허용', '비허용']}
              name="use"
              // onChange={setSelectedOption}
            />
          </div>
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>저작자 표시</InputTitle>
            <RadioBtn
              options={['필수', '선택']}
              name="person"
              // onChange={setSelectedOption}
            />
          </div>
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>수정 허용</InputTitle>
            <RadioBtn
              options={['수정', '금지']}
              name="edit"
              // onChange={setSelectedOption}
            />
          </div>
          <br />
          <hr />
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>판매 금액</InputTitle>
            <RadioBtn
              options={['유료', '무료']}
              name="charge"
              // onChange={setSelectedOption}
            />
            <InputTitle style={{ marginLeft: '100px' }}>판매 금액 설정</InputTitle>
            <input type="text" style={{ width: '15vw', height: '50px' }} />
            <InputTitle>원</InputTitle>
          </div>
        </div>
        <br />
        <hr />
        {/* 폰트 키워드 */}
        <div className={classes.keywordContainer}>
          <div className={classes.rowContainer}>
            <BoxTitle>폰트 키워드</BoxTitle>
            <div style={{ marginLeft: '60px' }}>
              ※ 폰트를 검색할 때 이용될 키워드입니다. (1개 이상 최대 3개 선택)
            </div>
          </div>
          <KeywordBtn />
        </div>
        <br />
        <hr />
        <br />

        {/* 약관 동의 라디오 버튼 */}
        <div className={classes.Container}>
          <BoxTitle>약관 동의</BoxTitle>
          <TermsAgreement onAgree={handleAgreement} />
        </div>
        <br />
        <hr />
        <br />
        <div className={classes.btnContainer}>
          <button className={classes.nextBtn} onClick={clickPayHandler}>
            결제하기
          </button>
        </div>
      </div>
    </>
  );
};
export default FontOptionPage;
