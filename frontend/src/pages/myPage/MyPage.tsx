import { useState, useRef, useEffect } from 'react';
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
  ContentGrayTransaction,
  ContentGrayBtn,
  ContentRedBtn,
  ContentIconsBox,
  FontBasketTopBox,
  FontBasketBottomBox,
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
import { FaCircleUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { borderColor } from 'common/colors/CommonColors';
import { FaBookmark, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';

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
import { changePwModalActions } from 'store/changePwModalSlice';
import { reviewModalActions } from 'store/reviewModalSlice';
import { exchangeModalActions } from 'store/exchangeModalSlice';
import { changeProfileImgModalActions } from 'store/changeProfileImgModalSlice';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import { goToBasketModalActions } from 'store/goToBasketModalSlice';

// navigation
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { checkToken, userMypageAPI } from 'https/utils/AuthFunction';
import { changeNicknameModalActions } from 'store/changeNicknameSlice';

import { dibListAPI, dibRemoveAPI } from 'https/utils/FavoriteFunction';
import { chargePointModalActions } from 'store/chargePointModalSlice';
import { getData } from 'https/http';

const MyPage: React.FC = () => {
  const [myNickname, setMyNickname] = useState<string>('');
  const [myPoint, setMyPoint] = useState<number>(0);
  const [myProfileImage, setMyProfileImage] = useState<string>('');
  const [myId, setMyId] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const myValue = location.state?.pageValue;
  useEffect(() => {
    async function fetch() {
      if (myValue) {
        if (myValue === 'fontBasket') {
          setPageLocation({
            productsState: false,
            likeList: false,
            fontBasket: true,
            boughtFonts: false,
            likeProducers: false,
          });
        }
      }
    }
    fetch();
  }, [myValue]);

  useEffect(() => {
    async function fetch() {
      const token = await checkToken();
      const id = await getData('id');
      setMyId(id);
      if (token) {
        console.log('have Token');
        // 마이페이지 불러오기
        userMypageAPI()
          .then(async (r) => {
            const nickname = r.nickname;
            const point = r.point;
            const profileImg = r.profileImg;
            await setMyNickname(nickname);
            await setMyPoint(point);
            await setMyProfileImage(
              'https://ddobak-profile-image.s3.ap-northeast-2.amazonaws.com/' + profileImg,
            );
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        console.log('잘못된 접근입니다.');
        navigate('/wrong');
      }
    }
    fetch();
    // navigate를 의존성 배열에 추가합니다.
  }, [navigate]);

  const [pageLocation, setPageLocation] = useState({
    productsState: true,
    likeList: false,
    fontBasket: false,
    boughtFonts: false,
    likeProducers: false,
  });
  const [dibList, setDibList] = useState([]);
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
      dibListAPI().then((response) => {
        console.log(response);
        setDibList(response);
      });
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

  const transactionClick = () => {
    dispatch(pointPayModalActions.toggle());
  };

  // redux
  const dispatch = useDispatch();
  const clickDownloadHandler = () => {
    console.log('다운로드');
  };
  const clickChangePwHandler = () => {
    dispatch(changePwModalActions.toggle());
  };
  const clickReviewHandler = () => {
    dispatch(reviewModalActions.toggle());
  };
  const exchangeHandler = () => {
    dispatch(chargePointModalActions.currentMyState({ myPoint: myPoint, nickname: myNickname }));
    dispatch(exchangeModalActions.toggle());
  };
  const clickProfileImgHandler = () => {
    dispatch(changeProfileImgModalActions.toggle());
  };
  const clickBasketHandler = () => {
    console.log('click');
    dispatch(goToBasketModalActions.toggle());
  };

  const clickMyWorkspaceHandler = () => {
    navigate(`/maker/${myNickname}/${myId}`, {
      state: {
        myNickname: myNickname,
        myEnter: true,
      },
    });
    // 실제로 내 페이지로 가려면 id나 뭐가 필요하겠지
  };

  interface DibType {
    dibcheck: boolean;
    fontFileUrl: string;
    fontId: number;
    fontName: string;
    producerName: string;
  }

  const clickBookmarkButton = (dib: DibType) => {
    console.log('click');
    dibRemoveAPI(dib.fontId.toString()).then(() => {
      dibListAPI().then((response) => {
        console.log(response);
        setDibList(response);
      });
    });
  };

  // 닉네임 수정하기 마우스 호버시
  const [isPencilHovered, setIsPencilHovered] = useState(false);
  const [isWorkspaceHovered, setIsWorkspaceHovered] = useState(false);

  const [screenWidth, setScreenWidth] = useState<number>(1510);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  // resize 이벤트에 대한 리스너를 설정합니다.
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  function formatNumberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const movePointPage = true;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ProfileBox>
          <IngredientContent>
            <ProfilImgBox onClick={clickProfileImgHandler}>
              {myProfileImage ? (
                <>
                  <img src={myProfileImage} alt="프로필 이미지" className={classes.ImgStyle} />
                </>
              ) : (
                <>
                  <FaCircleUser color={borderColor} className={classes.ImgStyle} />
                </>
              )}
            </ProfilImgBox>
            <ProfileContent>
              <ProfilNameBox>
                <ProfileName>{myNickname}</ProfileName>
                <FaPencilAlt
                  size={30}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(changeNicknameModalActions.toggle());
                    setIsPencilHovered(false);
                  }}
                  className={classes.pencilBtn}
                  onMouseEnter={() => setIsPencilHovered(true)}
                  onMouseLeave={() => setIsPencilHovered(false)}
                />
                <BsPersonWorkspace
                  size={30}
                  onClick={() => {
                    clickMyWorkspaceHandler();
                    setIsWorkspaceHovered(false);
                  }}
                  className={classes.workspaceBtn}
                  onMouseEnter={() => setIsWorkspaceHovered(true)}
                  onMouseLeave={() => setIsWorkspaceHovered(false)}
                />
                {myNickname.length <= 5 ? (
                  <>
                    {screenWidth > 1500 && isPencilHovered ? (
                      <>
                        <p className={classes.changeNickName}>닉네임 수정</p>
                      </>
                    ) : (
                      <></>
                    )}
                    {screenWidth > 1500 && isWorkspaceHovered ? (
                      <>
                        <p className={classes.changeNickName}>메이커 페이지</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
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
                <PointHeaderText>{formatNumberWithCommas(myPoint)} P</PointHeaderText>
              </PointHeader>
              <PointBtnBox>
                <NavLink to={'/point'} state={{ myPoint, movePointPage }}>
                  <PointTransactionBtn>거래내역</PointTransactionBtn>
                </NavLink>
                <PointExchangeBtn onClick={exchangeHandler}>인출하기</PointExchangeBtn>
              </PointBtnBox>
            </PointIngredient>
          </IngredientContent>
        </PointBox>
      </div>
      <div className={classes.content}>
        <MyPageContent>
          <SelectBox>
            {pageLocation.productsState ? (
              <SelectDisabled>제작한 폰트</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('productsState');
                }}
              >
                제작한 폰트
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
              <SelectDisabled>팔로우</SelectDisabled>
            ) : (
              <SelectBtn
                onClick={() => {
                  pageClickHandle('likeProducers');
                }}
              >
                팔로우
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
                      </ContentHeader>
                      <ContentInnerContentText>다람쥐 헌 쳇바퀴 타고파</ContentInnerContentText>
                    </ContentInnerTextBox>
                  </ContentInnerLeft>
                  <ContentInnerRight>
                    <ContentGrayDisabled>결제완료</ContentGrayDisabled>
                    <ContentRedBtn onClick={clickDownloadHandler}>다운로드</ContentRedBtn>
                  </ContentInnerRight>
                </ContentIngredient>
                {/* 이게 한 콘텐트 */}
              </ContentLargeBox>
            </>
          ) : pageLocation.likeList ? (
            <>
              {/* ======== */}
              {/* 찜 목록 */}
              {/* ======== */}
              <ContentLargeBox>
                {dibList.length > 0 ? (
                  dibList.map((dib) => {
                    console.log(dib);
                    return (
                      <ContentIngredient key={dib['fontId']}>
                        <ContentInnerLeft>
                          <ContentIconsBox
                            onClick={() => {
                              clickBookmarkButton(dib);
                            }}
                          >
                            <FaBookmark className={classes.bookmarkIcon}></FaBookmark>
                          </ContentIconsBox>
                          <ContentInnerTextBox>
                            <ContentHeader>
                              <ContentInnerHeaderText>{dib['fontName']}</ContentInnerHeaderText>
                              <ContentProducerName>| {dib['producerName']}</ContentProducerName>
                            </ContentHeader>
                            <ContentInnerContentText>
                              다람쥐 헌 쳇바퀴 타고파
                            </ContentInnerContentText>
                          </ContentInnerTextBox>
                        </ContentInnerLeft>
                        <ContentInnerRight>
                          <ContentRedBtn onClick={clickBasketHandler}>장바구니 담기</ContentRedBtn>
                        </ContentInnerRight>
                      </ContentIngredient>
                    );
                  })
                ) : (
                  <div className={classes.noContent}>"찜한 폰트가 없습니다."</div>
                )}
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
                  <ContentGrayTransaction onClick={transactionClick}>
                    결제하기
                  </ContentGrayTransaction>
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
