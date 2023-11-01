import { useState, useRef } from 'react';
import {
  ProfileBox,
  PointBox,
  IngredientContent,
  ProfilImgBox,
  ProfileContent,
  ProfilNameBox,
  ProfileName,
  ChangePassword,
  PointIngredient,
  PointHeader,
  PointHeaderText,
  PointBtnBox,
  PointTransactionBtn,
  PointExchangeBtn,
  MyPageContent,
  SelectBox,
  SelectBtn,
  SelectDisabled,
  ContentLargeBox,
  ContentIngredient,
  ContentHeader,
  ContentInnerLeft,
  ContentInnerTextBox,
  ContentProducerName,
  ContentInnerContentText,
  ContentInnerHeaderText,
  ContentInnerRight,
  ContentGrayDisabled,
  ContentRedBtn,
  ContentIconsBox,
  FontBasketTopBox,
  FontBasketBottomBox,
  ContentGrayBtn,
  SelectListDelete,
  CCLBox,
  CCLIcons,
  LikeIconBox,
  LikeProducerBox,
  LikeBoxText,
} from './myPageComponents/MyPageComponents';
import classes from './MyPage.module.css';

import Attribution from './myPageAssets/Attribution.png';
import NoDerivativeWorks from './myPageAssets/NoDerivativeWorks.png';
import ShareAlike from './myPageAssets/ShareAlike.png';
import Noncommercial from './myPageAssets/Noncommercial.png';

// 아이콘
import { FiSettings } from 'react-icons/fi';
import { FaCircleUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { borderColor } from 'common/colors/CommonColors';
import { FaBookmark, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';

// testImg
import Test1 from './myPageAssets/Test1.png';
import Test2 from './myPageAssets/Test2.png';
import Test3 from './myPageAssets/Test3.png';
import Test4 from './myPageAssets/Test4.png';
import Test5 from './myPageAssets/Test5.png';
import Test6 from './myPageAssets/Test6.png';

// redux
import { useDispatch } from 'react-redux';
import { resultModalActions } from 'store/resultModalSlice';
import { changePwModalActions } from 'store/changePwModalSlice';
import { reviewModalActions } from 'store/reviewModalSlice';

// navigation
import { NavLink } from 'react-router-dom';

const MyPage: React.FC = () => {
  const [pageLocation, setPageLocation] = useState({
    productsState: true,
    likeList: false,
    fontBasket: false,
    boughtFonts: false,
    likeProducers: false,
  });
  // 스와이퍼 참조
  const swiperRef = useRef<SwiperCore>();
  const pageClickHandle = (pageName: string) => {
    if (pageName === 'productsState') {
      setPageLocation({
        productsState: true,
        likeList: false,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: false,
      });
    } else if (pageName === 'likeList') {
      setPageLocation({
        productsState: false,
        likeList: true,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: false,
      });
    } else if (pageName === 'fontBasket') {
      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: true,
        boughtFonts: false,
        likeProducers: false,
      });
    } else if (pageName === 'boughtFonts') {
      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: false,
        boughtFonts: true,
        likeProducers: false,
      });
    } else {
      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: true,
      });
    }
  };

  const pencilClick = () => {
    console.log('name change');
  };
  const transactionClick = () => {
    console.log('transaction');
  };
  const exchangeClick = () => {
    console.log('exchange');
  };

  // redux
  const dispatch = useDispatch();
  const clickResultHandler = () => {
    dispatch(resultModalActions.toggle());
  };
  const clickChangePwHandler = () => {
    dispatch(changePwModalActions.toggle());
  };
  const clickReviewHandler = () => {
    dispatch(reviewModalActions.toggle());
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ProfileBox>
          <IngredientContent>
            <ProfilImgBox>
              <FaCircleUser color={borderColor} className={classes.ImgStyle} />
            </ProfilImgBox>
            <ProfileContent>
              <ProfilNameBox>
                <ProfileName>김싸피</ProfileName>
                <FaPencilAlt
                  size={30}
                  style={{ cursor: 'pointer' }}
                  onClick={pencilClick}
                  className={classes.pencilBtn}
                />
              </ProfilNameBox>
              <ChangePassword onClick={clickChangePwHandler}>비밀번호 변경</ChangePassword>
            </ProfileContent>
          </IngredientContent>
        </ProfileBox>
        <PointBox>
          <IngredientContent>
            <PointIngredient>
              <PointHeader>
                <PointHeaderText>보유포인트</PointHeaderText>
                <PointHeaderText>10,000P</PointHeaderText>
              </PointHeader>
              <PointBtnBox>
                <NavLink to={'/point'}>
                  <PointTransactionBtn onClick={transactionClick}>거래내역</PointTransactionBtn>
                </NavLink>
                <PointExchangeBtn onClick={exchangeClick}>인출하기</PointExchangeBtn>
              </PointBtnBox>
            </PointIngredient>
          </IngredientContent>
        </PointBox>
      </div>
      <div className={classes.content}>
        <MyPageContent>
          <SelectBox>
            {pageLocation.productsState ? (
              <SelectDisabled>제작 상태</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('productsState');
                }}
              >
                제작 상태
              </SelectBtn>
            )}

            {pageLocation.likeList ? (
              <SelectDisabled>찜 목록</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('likeList');
                }}
              >
                찜 목록
              </SelectBtn>
            )}
            {pageLocation.fontBasket ? (
              <SelectDisabled>장바구니</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('fontBasket');
                }}
              >
                장바구니
              </SelectBtn>
            )}
            {pageLocation.boughtFonts ? (
              <SelectDisabled>구매한 폰트</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('boughtFonts');
                }}
              >
                구매한 폰트
              </SelectBtn>
            )}
            {pageLocation.likeProducers ? (
              <SelectDisabled>찜한 제작자</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('likeProducers');
                }}
              >
                찜한 제작자
              </SelectBtn>
            )}
          </SelectBox>
          {pageLocation.productsState ? (
            <>
              {/* ======== */}
              {/* 제작 상태 */}
              {/* ======== */}
              <ContentLargeBox>
                {/* 이게 한 콘텐트 */}
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>제작완료</ContentGrayDisabled>
                    <ContentRedBtn onClick={clickResultHandler}>결과확인</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                {/* 이게 한 콘텐트 */}
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>결제완료</ContentGrayDisabled>
                    <ContentRedBtn>다운로드</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>진행중</ContentGrayDisabled>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>진행중</ContentGrayDisabled>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>진행중</ContentGrayDisabled>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <FiSettings className={classes.settingIcon} />
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>진행중</ContentGrayDisabled>
                  </ContentInnerRight>
                </ContentIngredient>
              </ContentLargeBox>
            </>
          ) : pageLocation.likeList ? (
            <>
              {/* ======== */}
              {/* 찜 목록 */}
              {/* ======== */}
              <ContentLargeBox>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentRedBtn>장바구니 담기</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
              </ContentLargeBox>
            </>
          ) : pageLocation.fontBasket ? (
            <>
              {/* ======== */}
              {/* 장바구니 */}
              {/* ======== */}
              <ContentLargeBox>
                <FontBasketTopBox>
                  <SelectListDelete>선택 항목 삭제</SelectListDelete>
                </FontBasketTopBox>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <FaRegCheckSquare className={classes.checkIcon} />
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentIconsBox>
                      <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                    </ContentIconsBox>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <FaRegSquare className={classes.checkIcon} />
                  </ContentInnerRight>
                </ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <FontBasketBottomBox>
                  <ContentGrayBtn>결제하기</ContentGrayBtn>
                </FontBasketBottomBox>
              </ContentLargeBox>
            </>
          ) : pageLocation.boughtFonts ? (
            <>
              {/* ======== */}
              {/* 구매한 폰트 */}
              {/* ======== */}
              {/* import Attribution from "./myPageAssets/Attribution.png"
                  import NoDerivativeWorks from "./myPageAssets/NoDerivativeWorks.png"
                  import ShareAlike from "./myPageAssets/ShareAlike.png"
                  import Noncommercial from "./myPageAssets/Noncommercial.png" */}
              <ContentLargeBox>
                <ContentIngredient>
                  <ContentInnerLeft>
                    <ContentInnerTextBox>
                      <ContentHeader>
                        <ContentInnerHeaderText>또박또박_이태성체</ContentInnerHeaderText>
                        <ContentProducerName>| 이태성</ContentProducerName>
                        <CCLBox>
                          <CCLIcons src={Attribution} />
                          <CCLIcons src={NoDerivativeWorks} />
                          <CCLIcons src={ShareAlike} />
                          <CCLIcons src={Noncommercial} />
                        </CCLBox>
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayBtn onClick={clickReviewHandler}>후기등록</ContentGrayBtn>
                    <ContentRedBtn>다운로드</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                {/* 여기까지 */}
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
              </ContentLargeBox>
            </>
          ) : (
            <>
              {/* ======== */}
              {/* 찜한 제작자 */}
              {/* ======== */}
              <ContentLargeBox>
                <Swiper
                  onBeforeInit={(swiper: SwiperInstance) => (swiperRef.current = swiper)} // ref에 swiper 저장
                  slidesPerView={3}
                  spaceBetween={15}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation]}
                  className={classes.swiper}
                >
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test1} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>LTS 운영팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test2} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>LJE 기획팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test3} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>KJJ FE팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test4} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>LKM 배포팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test5} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>LMK AI팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                  <SwiperSlide className={classes.swiperSlide}>
                    <img src={Test6} alt="" className={classes.swiperImg} />
                    <LikeIconBox>
                      <FaHeart size={40} color={'#d71718'} />
                    </LikeIconBox>
                    <LikeProducerBox>
                      <LikeBoxText>LJM BE팀장</LikeBoxText>
                    </LikeProducerBox>
                  </SwiperSlide>
                </Swiper>
              </ContentLargeBox>
            </>
          )}
        </MyPageContent>
      </div>
      {/* result modal 실행 */}
    </div>
  );
};

export default MyPage;
