import React, { useState } from 'react';
import classes from './FontOptionPage.module.css';

import { BoxTitle, InputTitle } from 'common/titleComponents/TitleComponents';

import RadioBtn from 'common/checkButton/RadioBtn';
import KeywordBtn from 'common/keywordButton/KeywordBtn';

import TermsAgreement from 'common/checkButton/TermsAgreement';
import { useSelector, useDispatch } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import { axiosWithAuth, getData } from 'https/http';
import type { RootState } from 'store';

const FontOptionPage: React.FC = () => {
  const fontId = useSelector((state: RootState) => state.resultModal.fontId);
  const fontSortUrl = useSelector((state: RootState) => state.resultModal.sortUrl);

  const [korFontName, setKorFontName] = useState<string>('');
  const [isKorNameAvailable, setIsKorNameAvailable] = useState(false);
  // 폰트명 입력 핸들러 함수
  const handleKorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKorFontName(event.target.value);
  };

  const korNameCheck = async () => {
    if (!korFontName.trim()) {
      alert('폰트 이름을 입력해 주세요!');
      console.log('클릭임')
      console.log(fontId, fontSortUrl);
      return;
    }
    try {
      const params = { korFontName: korFontName }
      const response = await axiosWithAuth.get('/font/name/check', { params });
      if (!response.data) { // false: 사용가능 | true: 중복
        alert('사용가능한 이름입니다.');
        setIsKorNameAvailable(true);
      } else {
        alert('중복된 폰트 이름입니다.');
        setKorFontName('')
      }
    } catch (error) {
      console.error('한글명 중복체크 오류 발생:', error);
    }
  };

  const [engFontName, setEngFontName] = useState<string>('');
  const [isEngNameAvailable, setIsEngNameAvailable] = useState(false);
  // 파일명(영문) 입력 핸들러 함수
  const handleEngNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[A-Za-z0-9]*$/;

    if (regex.test(value)) {
      setEngFontName(value);
    } else {
      alert('영문과 숫자만 입력할 수 있습니다.');
    }
  };

  const engNameCheck = async () => {
    if (!engFontName.trim()) {
      alert('폰트 이름을 입력해 주세요!');
      return;
    }
    try {
      const params = { engFontName: engFontName }
      const response = await axiosWithAuth.get('/font/name/check', { params });
      if (!response.data) { // false: 사용가능 | true: 중복
        alert('사용가능한 파일명입니다.');
        setIsEngNameAvailable(true);
      } else {
        alert('중복된 파일명입니다.');
        setEngFontName('')
      }
    } catch (error) {
      console.error('파일명(영문) 중복체크 오류 발생:', error);
    }
  };

  const [inputFontIntro, setInputFontIntro] = useState<string>('');

  // 폰트 소개글 핸들러 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputFontIntro(event.target.value);
  };

  // 라디오 버튼 선택 핸들러 함수
  const [openOption, setOptionOpen] = useState<boolean>(true);
  // 공개|비공개 선택
  const handleOpenChange = (option: string) => {
    setOptionOpen(option === '공개');
  };

  const [saleOption, setSaleOption] = useState<boolean>(true);
  const [priceValue, setPriceValue] = useState<number>(0);
  // 가격 입력 핸들러 함수
  const handlePriceValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setPriceValue(Number(value));
    } else {
      alert('숫자만 입력할 수 있습니다.');
    }
  };

  // 무료|유료 선택
  const handleSaleChange = (option: string) => {
    if (option === '무료') {
      setSaleOption(true);
      setPriceValue(0); // 가격을 0으로 설정
    } else {
      setSaleOption(false);
    }
  };

  // 키워드 상태 관리
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const [agreed, setAgreed] = useState(false);

  // 약관 동의 여부
  const handleAgreement = (agreed: boolean) => {
    if (agreed) {
      console.log('모든 약관에 모두 동의하였습니다.');
      setAgreed(agreed);
    } else {
      console.log('모든 약관에 동의하지 않았습니다.');
    }
  };

  const isReadyToPay = () => {
    // 유료일 때는 금액이 입력되어야하고, 무료일 때는 항상 유효함
    const isPriceValid = !saleOption ? priceValue !== 0 : true;
    return (
      korFontName.trim() !== '' &&
      isKorNameAvailable &&
      engFontName.trim() !== '' &&
      isEngNameAvailable &&
      inputFontIntro.trim() !== '' &&
      openOption !== undefined &&
      saleOption !== undefined &&
      isPriceValid &&
      selectedKeywords.length > 0 &&
      agreed
    );
  };

  // 폰트 정보 API 연결
  const fontOptionAPI = async () => {
    const token = await getData('accessToken');
    if (token) {
      try {
        const requestBody = {
          fontId: fontId,
          fontSortUrl: fontSortUrl,
          korFontName: korFontName,
          engFontName: engFontName,
          openStatus: openOption,
          freeStatus: saleOption,
          price: !saleOption && priceValue !== null ? priceValue : 0,
          introduceText: inputFontIntro,
          keywords: selectedKeywords,
        }
        const response = await axiosWithAuth.put('/font/make/request', requestBody);
        if (response.data) {
          console.log(response.data)
        } else {
          console.error('Unexpected response:', response);
        }
      }
      catch (error) {
        console.error('폰트 정보 업데이트 중 오류 발생:', error);
      }
    }
  };

  // 결제하기 버튼의 핸들러 함수
  const handlePaymentClick = async () => {
    if (isReadyToPay()) {
      await clickPayHandler(); // 모든 조건 충족
      // 폰트 정보 API 항목 값 확인
      console.log('fontId', fontId);
      console.log('fontSortUrl', fontSortUrl);
      console.log('korFontName', korFontName);
      console.log('engFontName', engFontName);
      console.log('openStatus', openOption);
      console.log('freeStatus', saleOption);
      console.log('price', priceValue);
      console.log('introduceText', inputFontIntro);
      console.log('keywords', selectedKeywords);
      await fontOptionAPI(); // 폰트 정보 API 호출
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const dispatch = useDispatch();

  const clickPayHandler = async () => {
    dispatch(pointPayModalActions.payThePrice({ howMuch: 50000, boughtSometing: '폰트제작' }));
    dispatch(pointPayModalActions.toggle());
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.fontNameContainer}>
          <BoxTitle>폰트 이름 설정</BoxTitle>
          <div className={classes.name}>

            <div className={classes.nameInput} style={{ flexGrow: '1' }}>
              <InputTitle>폰트명</InputTitle>
              <input
                type="text"
                placeholder="예시) 또박또박_글씨체"
                value={korFontName}
                onChange={handleKorNameChange}
                style={{ width: '20vw', height: '50px' }}
              />
              <button onClick={korNameCheck}>중복확인</button>
            </div>

            <div className={classes.nameInput} style={{ flexGrow: '2' }}>
              <InputTitle>파일명(영문)</InputTitle>
              <input
                type="text"
                placeholder="예시) ddobak_test"
                value={engFontName}
                onChange={handleEngNameChange}
                style={{ width: '20vw', height: '50px' }}
              />
              <button onClick={engNameCheck}>중복확인</button>
            </div>

          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className={classes.fontInfoContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BoxTitle>폰트 소개글</BoxTitle>
            <span style={{ marginLeft: '20px' }}>({inputFontIntro.length}/200)</span>
          </div>
          <div>
            <textarea
              placeholder=""
              value={inputFontIntro}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <hr />
        <br />

        {/* 상태 설정 라디오버튼 */}
        <div className={classes.radioBtnContainer}>
          <BoxTitle>상태 설정</BoxTitle>
          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw' }}>공개 여부</InputTitle>
            <RadioBtn
              options={['공개', '비공개']}
              name="open"
              onChange={handleOpenChange}
            />
          </div>

          <div className={classes.rowContainer}>
            <InputTitle style={{ width: '20vw', height: '53px' }}>판매 금액</InputTitle>
            <RadioBtn
              options={['유료', '무료']}
              name="charge"
              onChange={handleSaleChange}
            />
            {!saleOption && ( // 유료 선택 시 금액 설정
              <>
                <InputTitle style={{ marginLeft: '100px' }}>판매 금액 설정</InputTitle>
                <input type="text"
                  value={priceValue !== null ? priceValue.toString() : ''}
                  onChange={handlePriceValue}
                  style={{ width: '15vw', height: '50px' }} />
                <InputTitle>원</InputTitle>
              </>
            )}
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
          <KeywordBtn onKeywordsChange={handleKeywordsChange} />
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
          <button className={classes.nextBtn} onClick={handlePaymentClick}>
            결제하기
          </button>
        </div>
      </div>
    </>
  );
};
export default FontOptionPage;