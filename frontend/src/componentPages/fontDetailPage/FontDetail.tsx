import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reviewModalActions } from 'store/reviewModalSlice';
import ReviewModal from 'common/modals/reviewModal/ReviewModal';
import classes from './FontDetail.module.css';

// components
import { BoxTitle } from 'common/titleComponents/TitleComponents';
import RangeSlider from 'common/fontRangeSlider/RangeSlider';
import FontUserReview from './fontDetailPageComponent/FontUserReview';

// icons
import { FaRegBookmark, FaBookmark, FaRegCopy, FaPen } from 'react-icons/fa';

import { axiosWithAuth } from 'https/http';
// import axios from 'axios';

// API로부터 받아올 폰트 데이터의 타입을 정의
type Font = {
  dibCheck: boolean;
  dibCount: string;
  fontFileUrl: string;
  fontId: string;
  introduceContext: string;
  keywords: string[];
  producerName: string;
  viewCount: bigint;
};

const FontDetail: React.FC = () => {
  const { fontId } = useParams<{ fontId: string }>();
  const [fontDetail, setFontDetail] = useState<Font | null>(null);

  // 컴포넌트 마운트시 API 호출
  useEffect(() => {
    // 라우트에서 폰트 ID 가져오기
    if (fontId) {
      fetchFontDetails(fontId); // 폰트 ID로 폰트 정보를 불러오는 함수 호출
    }
  }, [fontId]);

  // 폰트 데이터를 가져오는 함수
  const fetchFontDetails = async (fontId: string) => {
    try {
      const response = await axiosWithAuth.get(`/font/detail/${fontId}`)
        .then((r) => { return r });
      if (response.data) {
        console.log("API로부터 받은 데이터:", response.data);
        setFontDetail(response.data); // 받아온 폰트 정보로 상태 업데이트
      } else {
        console.log("API 응답에 fonts 프로퍼티가 없습니다.", response.data);
      }
    } catch (error) {
      console.error('API 호출 에러:', error); // 에러 로깅 개선
    }
  };

  // 책갈피 찜하기
  const [isClicked, setIsClicked] = useState(false);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  // 웹 폰트 코드 넣기
  const webFontCode = fontDetail ? fontDetail.fontFileUrl : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webFontCode);
      console.log('클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      console.log('복사에 실패했습니다.');
    }
  };

  const [inputText, setInputText] = useState('');

  // 입력 필드의 값이 변경될 때마다 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const [fontSize, setFontSize] = useState<number>(30);

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  // 후기 등록 모달
  const dispatch = useDispatch();

  const openReviewModal = () => {
    dispatch(reviewModalActions.toggle());
  };

  window.scrollTo({ left: 0, top: 0 });

  return (
    <>
      <div className={classes.topContainer}>
        {/* 폰트 찜 책갈피 */}
        <div className={classes.dibContainer}>
          <div className={classes.dibCount}>{fontDetail ? fontDetail.dibCount : '정보를 불러오는 중...'}</div>
          {isClicked ? (
            <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />

          ) : (
            <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
            
          )}
        </div>
        {/* 폰트 이름 */}
        {/* <div className={classes.title}>{font.title}</div> */}
      </div>

      <div className={classes.subContainer}>
        <div className={classes.makerContainer}>
          <p>
            <strong>제작 </strong>
            {fontDetail ? fontDetail.producerName : '정보를 불러오는 중...'}
          </p>
          <p>
            <>
              <strong>조회수 </strong> {fontDetail ? fontDetail.viewCount : '정보를 불러오는 중...'}
            </>
          </p>
          <p>
            <strong>형태 </strong> {fontDetail ? fontDetail.keywords.join(' | ') : '정보를 불러오는 중...'}
          </p>
        </div>

        <div className={classes.buyContainer}>
          <div
            className={classes.buyBtn}
            style={{
              backgroundColor: '#D71718',
              border: '2px solid #D71718',
              color: '#FFFFFF',
            }}
          >
            장바구니
          </div>
          <div
            className={classes.buyBtn}
            style={{
              border: '2px solid #D71718',
            }}
          >
            바로 구매
          </div>
        </div>
      </div>

      <div className={classes.boxContainer}>
        <div className={classes.intro}>
          <BoxTitle>폰트 소개</BoxTitle>
          <div className={classes.introBox} style={{ width: '35vw' }}>
            {fontDetail ? fontDetail.introduceContext : '정보를 불러오는 중...'}
          </div>
        </div>
        <div>
          <div className={classes.titleContainer}>
            <BoxTitle>웹 폰트로 사용하기</BoxTitle>
            <div className={classes.copyIconContainer} onClick={copyToClipboard}>
              <FaRegCopy size={25} color="#484848" />
              복사하기
            </div>
          </div>

          <div className={classes.introBox} style={{ width: '40vw' }}>
            {webFontCode}
          </div>
        </div>
      </div>

      <div className={classes.fontContainer}>
        <div className={classes.intro}>
          <BoxTitle>폰트 미리보기</BoxTitle>
          <hr />
        </div>
        <div className={classes.testContainer}>
          <div className={classes.typingBar}>
            <input
              placeholder="예시 문구 적기"
              value={inputText}
              onChange={handleInputChange}
            ></input>
            <FaPen />
          </div>
          {/* 폰트 크기 조절 바 */}
          <RangeSlider value={fontSize} onChange={handleFontSizeChange} />
        </div>
        <div
          style={{
            marginLeft: '50px',
            marginBottom: '50px',
            fontSize: `${fontSize}px`,
            color: inputText ? 'black' : 'lightGray',
          }}
        >
          {inputText || '다람쥐 헌 쳇바퀴에 타고파'}
        </div>
      </div>

      <div className={classes.intro}>
        <BoxTitle>또박또박 라이선스</BoxTitle>
        <div className={classes.introBox}>
          <strong>저작권</strong> : 
          '{/* "{font.title}" */}'
          폰트의 라이선스는 {fontDetail ? fontDetail.producerName : '정보를 불러오는 중...'}에게 있습니다.{'\n'}
          '{/* "{font.title}" */}'
          는 개인 및 기업 사용자를 포함한 모든 사용자에게 무료로 제공되며 자유롭게 사용할 수 있고 상업적 이용이 가능합니다. 
          본 서체는 글꼴 자체를 유료로 판매하거나 왜곡·변형할 수 없습니다.
        </div>
      </div>
      <br />
      <br />
      <div className={classes.titleContainer}>
        <BoxTitle>폰트 활용 후기</BoxTitle>
        <div
          className={classes.buyBtn}
          style={{
            backgroundColor: '#484848',
            border: '2px solid #484848',
            color: '#FFFFFF',
          }}
          onClick={openReviewModal}
        >
          후기 등록
        </div>
      </div>
      <ReviewModal />
      <hr />
      <br />
      <FontUserReview />
    </>
  );
};
export default FontDetail;
