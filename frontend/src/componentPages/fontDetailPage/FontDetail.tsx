import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { reviewModalActions } from 'store/reviewModalSlice';
import ReviewModal from 'common/modals/reviewModal/ReviewModal';
import classes from './FontDetail.module.css';

// components
import { BoxTitle } from 'common/titleComponents/TitleComponents';
import RangeSlider from 'common/fontRangeSlider/RangeSlider';
import FontUserReview from './fontDetailPageComponent/FontUserReview';

// icons
import { FaRegBookmark, FaBookmark, FaRegCopy, FaPen } from 'react-icons/fa';

const FontDetail: React.FC = () => {
  const { state } = useLocation();
  const font = state as { id: string; title: string; maker: string; content: string };

  // 책갈피 찜하기
  const [isClicked, setIsClicked] = useState(false);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  // 웹 폰트 코드 넣기
  const webFontCode = `@font-face {
      font-family: "ddobak-test";
      src: url("http://163.239.223.171:8786/font_file/ddobak_test.ttf") format("truetype");
  }`;

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

  return (
    <>
      <div className={classes.topContainer}>
        {/* 폰트 찜 책갈피 */}
        <div className={classes.dibContainer}>
          {/* 폰트 찜 수 */}
          <div className={classes.dibCount}>10</div>
          {isClicked ? (
            <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />
          ) : (
            <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
          )}
        </div>
        {/* 폰트 이름 */}
        <div className={classes.title}>{font.title}</div>
      </div>

      <div className={classes.subContainer}>
        <div className={classes.makerContainer}>
          <p>
            <strong>제작 </strong>
            {font.maker}
          </p>
          <p>
            <strong>조회수 </strong>224K
          </p>
          {/* 폰트에 해당하는 키워드로 변경 필요 */}
          <p>
            <strong>형태 </strong>네모네모 | 가지런한 | 어른같은
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
            안녕하세요. {font.maker} 님이 만든 {font.title} 입니다. {'\n'}
            많이 사용해주세요. :)
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
          <strong>저작권</strong> : "{font.title}" 는 개인 및 기업 사용자를 포함한 모든 사용자에게
          무료로 제공되며 자유롭게 사용할 수 있고 상업적 이용이 가능합니다. {'\n'}본 서체는 글꼴
          자체를 유료로 판매하거나 왜곡·변형할 수 없습니다.
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
