import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { axiosWithAuth, axiosWithFormData } from 'https/http';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import { goToBasketModalActions } from 'store/goToBasketModalSlice';
import { cartAddAPI } from 'https/utils/CartFunction';
import { basketErrorModalActions } from 'store/basketErrorModalSlice';
import { transactionBuyOrMakeAPI } from 'https/utils/TransactionFunction';
import { progressLoaderActions } from 'store/progressLoaderSlice';
import styled from '@emotion/styled';

// API로부터 받아올 폰트 데이터의 타입을 정의
type Font = {
  dibCheck: boolean;
  dibCount: string;
  fontFileUrl: string;
  fontId: string;
  fontName: string;
  fontPrice: number;
  introduceContext: string;
  keywords: string[];
  producerId: string;
  producerName: string;
  reviewCount: number;
  reviewResponseList: [];
  viewCount: bigint;
};

type CustomTextStyleType = {
  fontFamily: string;
  fontSrc: string;
  fontSize: number;
  inputText: string;
};

const CustomTextStyle = styled.div<CustomTextStyleType>`
  @font-face {
    font-family: ${(props) => props.fontFamily};
    src: url(${(props) => props.fontSrc});
  }
  margin: 0px 50px;
  margin-bottom: 50px;
  padding-bottom: 20px;
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => (props.inputText.length ? 'black' : 'lightGray')};
  max-width: 1286px;
  overflow: auto;
`;

const FontDetail: React.FC = () => {
  // 후기 등록 모달
  const dispatch = useDispatch();
  const { fontId } = useParams();
  const [fontDetail, setFontDetail] = useState<Font | null>(null);
  const [isBoughtOrMade, setIsBoughtOrMade] = useState<string>('nothing');

  const [webFont, setWebFont] = useState<string>('');
  const [fontName, setFontName] = useState<string>('');
  const [fontPrice, setFontPrice] = useState<number>(0);

  // 컴포넌트 마운트시 API 호출
  useEffect(() => {
    // 라우트에서 폰트 ID 가져오기
    // 폰트 데이터를 가져오는 함수
    const fetchFontDetails = async (fontId: string) => {
      await dispatch(progressLoaderActions.resetGauge());
      await dispatch(progressLoaderActions.startGuage());
      setFontDetail(null);
      try {
        const response = await axiosWithAuth.get(`/font/detail/${fontId}`).then((r) => {
          return r.data;
        });
        if (response) {
          console.log('API로부터 받은 데이터:', response);
          setFontDetail(response); // 받아온 폰트 정보로 상태 업데이트
          setWebFont(response.fontFileUrl);
          setFontPrice(response.fontPrice);
          setFontName(response.fontName);
        } else {
          console.log('API 응답에 fonts 프로퍼티가 없습니다.', response);
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
    };
    if (fontId) {
      fetchFontDetails(fontId);
    }
  }, [fontId, dispatch]);

  interface RefreshType {
    refresh: {
      fontDetail: number;
    };
  }

  const refresh = useSelector((state: RefreshType) => state.refresh.fontDetail);

  useEffect(() => {
    console.log(fontId);
    if (fontId) {
      fetchBuyOrMake(fontId); // 폰트 ID로 폰트 정보를 불러오는 함수 호출
    }
  }, [fontId, dispatch, refresh]);

  // 구매했는지 확인해주는 함수

  // interface BuyOrMakeType {
  //   fontId: string
  //   possessionType: string
  // }

  const fetchBuyOrMake = async (fontId: string) => {
    const response = await transactionBuyOrMakeAPI()
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(response);
    for (const r of response) {
      if (r.fontId.toString() === fontId) {
        setIsBoughtOrMade(r.possessionType);
        return;
      }
    }
  };

  // 책갈피 찜하기
  const [dibCheck, setDibCheck] = useState<boolean>(false);
  const [dibCount, setDibCount] = useState<number>(0);

  // 컴포넌트가 마운트될 때 API에서 가져온 폰트 정보로 상태를 초기화합니다.
  useEffect(() => {
    if (fontDetail) {
      setDibCheck(fontDetail.dibCheck);
      setDibCount(parseInt(fontDetail.dibCount));
    }
  }, [fontDetail]);

  // 찜 상태를 백엔드에 업데이트하는 비동기 함수
  const updateDibStatus = async (newDibCheck: boolean, newDibCount: number) => {
    try {
      if (newDibCheck) {
        // 찜 추가
        const formData = new FormData();
        formData.append('dibCheck', JSON.stringify(newDibCheck));
        const response = await axiosWithFormData.post(`/favorite/${fontId}`, formData);
        console.log('서버 응답:', response.data);
      } else {
        // 찜 제거
        const response = await axiosWithAuth.delete(`/favorite/${fontId}`);
        console.log('서버 응답:', response.data);
      }
    } catch (error) {
      console.error('찜 처리 중 오류 발생:', error);
    }
  };

  const handleIconClick = async () => {
    const newDibCheck = !dibCheck; // 찜 상태 반전
    const newDibCount = newDibCheck ? dibCount + 1 : dibCount - 1;

    // 로컬 상태를 먼저 업데이트
    setDibCheck(newDibCheck);
    setDibCount(newDibCount);

    if (fontId) {
      // fontId가 존재하면
      try {
        // 백엔드에 찜 상태 업데이트 요청
        await updateDibStatus(newDibCheck, newDibCount);
        console.log('찜 상태 업데이트 성공');
      } catch (error) {
        console.error('찜 상태 업데이트 실패:', error);
      }
    } else {
      console.error('fontId가 정의되지 않았습니다.');
    }
  };

  // 웹 폰트 코드 넣기
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webFont);
      console.log('클립보드에 복사되었습니다!');
    } catch (err) {
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

  const openReviewModal = () => {
    dispatch(reviewModalActions.toggle());
    // id를 넘겨준다.
    if (fontId) {
      dispatch(reviewModalActions.register({ fontId: fontId }));
    }
  };

  // // 바로 구매하기
  async function handlePayFC() {
    console.log('pay');
    const fontId = fontDetail?.fontId;
    const fontPrice = fontDetail?.fontPrice;
    const producerId = fontDetail?.producerId;
    const fontName = fontDetail?.fontName;
    console.log(fontId, fontPrice, producerId);
    if (fontId && (fontPrice || fontPrice === 0) && producerId && fontName) {
      dispatch(
        pointPayModalActions.payThePrice({ howMuch: fontPrice, boughtSometing: '폰트구매' }),
      );
      dispatch(
        pointPayModalActions.buyAll({
          buyAll: [
            {
              sellerId: +producerId,
              fontId: +fontId,
            },
          ],
        }),
      );
      dispatch(pointPayModalActions.toggle());
    }
  }

  // 장바구니
  async function handleCartFC() {
    if (fontId) {
      cartAddAPI(fontId)
        .then((r) => {
          dispatch(goToBasketModalActions.toggle());
        })
        .catch((e) => {
          console.error(e);
          dispatch(basketErrorModalActions.toggle());
        });
    }
  }

  window.scrollTo({ left: 0, top: 0 });

  const fontFaceFC = (fontName: string, webFont: string) => {
    return `@font-face { 
      font-family: ${fontName};
      src: ${webFont};
       }`;
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topContainer}>
          {/* 폰트 찜 책갈피 */}
          <div className={classes.topLeft}>
            <div className={classes.dibContainer}>
              <div className={classes.dibCount}>{dibCount}</div>
              {dibCheck ? (
                <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />
              ) : (
                <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
              )}
            </div>
            <div className={classes.title}>{fontDetail ? fontDetail.fontName : ''}</div>
          </div>
          <div>
            <span className={classes.price}>
              <>
                {fontDetail && fontDetail.fontPrice > 0
                  ? `${fontDetail.fontPrice.toLocaleString()} P`
                  : '무료'}{' '}
              </>
            </span>
          </div>
        </div>
        <div className={classes.subContainer}>
          <div className={classes.makerContainer}>
            <p>
              <strong>제작자 </strong> {fontDetail ? fontDetail.producerName : ''}
            </p>
            <p>
              <>
                <strong>조회수 </strong> {fontDetail ? fontDetail.viewCount : ''}
              </>
            </p>
            <p>
              <strong>형태 </strong> {fontDetail ? fontDetail.keywords.join(' | ') : ' | '}
            </p>
          </div>

          <div className={classes.buyContainer}>
            {isBoughtOrMade === 'nothing' ? (
              <>
                <div className={classes.cartBtn} onClick={handleCartFC}>
                  장바구니
                </div>
                <div className={classes.buyBtn} onClick={handlePayFC}>
                  바로 구매
                </div>
              </>
            ) : isBoughtOrMade === '제작' ? (
              <>
                <div className={classes.isBoughtOrMadeBox}>제작한 폰트입니다.</div>
              </>
            ) : (
              <>
                <div className={classes.isBoughtOrMadeBox}>이미 구매한 폰트입니다.</div>
              </>
            )}
            {/* <div className={classes.cartBtn} onClick={handleCartFC}>
              장바구니
            </div>
            <div className={classes.buyBtn} onClick={handlePayFC}>
              바로 구매
            </div> */}
          </div>
        </div>

        <div className={classes.boxContainer}>
          <div className={classes.intro}>
            <BoxTitle>폰트 소개</BoxTitle>
            <div className={classes.introBox} style={{ width: '35vw' }}>
              {fontDetail ? fontDetail.introduceContext : '안녕하세요. 제작자입니다.'}
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
              {fontPrice === 0
                ? fontFaceFC(fontName, webFont)
                : isBoughtOrMade === 'nothing'
                ? '구매후 이용해주세요.💸'
                : fontFaceFC(fontName, webFont)}
              {}
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
          <CustomTextStyle
            fontSize={fontSize}
            inputText={inputText}
            fontFamily={fontName}
            fontSrc={webFont}
          >
            {inputText || '다람쥐 헌 쳇바퀴에 타고파'}
          </CustomTextStyle>
        </div>

        <div className={classes.intro}>
          <BoxTitle>또박또박 라이선스</BoxTitle>
          <div className={classes.introBox} style={{ height: '110px' }}>
            <strong>저작권</strong> : "{fontDetail ? fontDetail.fontName : ''}" 폰트의 라이선스는 "
            {fontDetail ? fontDetail.producerName : '제작자'}"에게 있습니다.{'\n'}
            {fontDetail && fontDetail.fontPrice === 0 && (
              <span>
                "{fontDetail ? fontDetail.fontName : ''}" 는 개인 및 기업 사용자를 포함한 모든
                사용자에게 무료로 제공되며 자유롭게 사용할 수 있고 상업적 이용이 가능합니다.{'\n'}{' '}
              </span>
            )}
            본 서체는 글꼴 자체를 유료로 판매하거나 왜곡·변형할 수 없습니다.
          </div>
        </div>
        <br />
        <br />
        <div className={classes.titleContainer}>
          <BoxTitle>폰트 활용 후기</BoxTitle>
          <div className={classes.reviewBtn} onClick={openReviewModal}>
            후기 등록
          </div>
        </div>
        <ReviewModal />
        <hr />
        <br />
        {fontId ? <FontUserReview fontId={fontId} /> : 'null'}
      </div>
    </>
  );
};
export default FontDetail;
