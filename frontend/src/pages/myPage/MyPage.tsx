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
  LikeIconBox,
  LikeProducerBox,
  LikeBoxText,
  CartPriceBox,
  CartPriceText,
} from './myPageComponents/MyPageComponents';
import classes from './MyPage.module.css';

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
import { transactionMyAllAPI, transactionProducerAPI } from 'https/utils/TransactionFunction';
import { cartDeleteAPI, cartGetAPI } from 'https/utils/CartFunction';
import styled from '@emotion/styled';
import { followDeleteAPI, getFollowingList } from 'https/utils/FollowFunction';

interface CartType {
  fontId: number;
  fontName: string;
  producer: string;
  favoriteCheck: boolean;
  fontPrice: number;
  fontUrl: string;
  sellerId: number;
}

const MyPage: React.FC = () => {
  const [myNickname, setMyNickname] = useState<string>('');
  const [myPoint, setMyPoint] = useState<number>(0);
  const [myProfileImage, setMyProfileImage] = useState<string>('');
  const [myId, setMyId] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const myValue = location.state?.pageValue;
  type CartStyleType = {
    fontFamily: string;
    fontSrc: string;
  };

  const CartStyle = styled.p<CartStyleType>`
    @font-face {
      font-family: ${(props) => props.fontFamily};
      src: url(${(props) => props.fontSrc});
    }

    font-family: ${(props) => props.fontFamily};
    font-size: 24px;
    margin: 0px;
  `;

  const [cartData, setCartData] = useState<CartType[]>([]);

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
          cartGetAPI()
            .then(async (r) => {
              console.log(r);
              setCartData(r);
            })
            .catch((e) => console.error(e));
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
            await setMyProfileImage(profileImg);
          })
          .catch((e) => console.error(e));

        // 제작 상태 가져오기
        transactionProducerAPI(id)
          .then(async (r) => setCreatedFontList(r))
          .catch((e) => console.error(e));
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

  const [dibList, setDibList] = useState<DibType[]>([]);
  const [myFollowingList, setMyFollowingList] = useState([]);
  const [createdFontList, setCreatedFontList] = useState<FontType[]>([]);
  const [purchaseFontList, setPurchaseFontList] = useState<PurchaseType[]>([]);

  interface PurchaseType {
    fontId: number;
    fontName: string;
    fontUrl: string;
    openStatus: boolean;
    producerName: string;
  }

  // 스와이퍼 참조
  const swiperRef = useRef<SwiperCore>();
  const pageClickHandle = async (pageName: string) => {
    if (pageName === 'productsState') {
      transactionProducerAPI(myId)
        .then(async (r) => setCreatedFontList(r))
        .catch((e) => console.error(e));

      setPageLocation({
        productsState: true,
        likeList: false,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: false,
      });
    } else if (pageName === 'likeList') {
      dibListAPI()
        .then((response) => {
          setDibList(response);
        })
        .catch((e) => {
          console.error(e);
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
      cartGetAPI()
        .then(async (response) => {
          console.log(response);
          response.map((r: CartType) => {
            const tmp = {
              fontId: r.fontId,
              sellerId: r.sellerId,
              selected: false,
              fontPrice: r.fontPrice,
            };
            return setSelectedFont([...selectedFont, tmp]);
          });
          setCartData(response);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (pageName === 'boughtFonts') {
      transactionMyAllAPI()
        .then(async (r) => setPurchaseFontList(r))
        .catch((e) => console.error(e));

      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: false,
        boughtFonts: true,
        likeProducers: false,
      });
    } else {
      getFollowingList()
        .then((r) => {
          console.log('여기: ', r);
          setMyFollowingList(r);
        })
        .catch((e) => {
          console.error('팔로우 에러 : ', e);
        });
      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: true,
      });
    }
  };
  // 포인트 결제

  const transactionClick = async () => {
    if (totalCartPrice > 0) {
      const buyAllList = [];
      for (const sf of selectedFont) {
        if (sf.selected === true) {
          const data = {
            sellerId: sf.sellerId,
            fontId: sf.fontId,
          };
          buyAllList.push(data);
        }
      }
      dispatch(
        pointPayModalActions.payThePrice({
          howMuch: totalCartPrice,
          boughtSometing: '장바구니구매',
        }),
      );
      dispatch(pointPayModalActions.buyAll({ buyAll: buyAllList }));
      dispatch(pointPayModalActions.toggle());
    }
  };

  // redux
  const dispatch = useDispatch();

  interface FontType {
    fontId: number;
    fontName: string;
    fontFileUrl: string;
    openStatus: boolean;
  }
  // 폰트 다운로드
  const clickDownloadHandler = async (item: FontType) => {
    const response = await fetch(item['fontFileUrl']);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // 다운로드 시, 파일 이름
    a.download = item['fontName'] + '.ttf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const clickPurchaseDownload = async (item: PurchaseType) => {
    const response = await fetch(item.fontUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // 다운로드 시, 파일 이름
    a.download = item['fontName'] + '.ttf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
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
    dibRemoveAPI(dib.fontId.toString())
      .then(() => {
        dibListAPI()
          .then((response) => {
            console.log(response);
            setDibList(response);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  interface FollowType {
    memberId: string;
    nickname: string;
    ProfileImg: string;
  }

  const clickHeartButton = (follow: FollowType) => {
    followDeleteAPI(follow['memberId'])
      .then(() => {
        getFollowingList()
          .then((r) => {
            setMyFollowingList(r);
          })
          .catch((e) => {
            console.error('팔로우 에러 : ', e);
          });
      })
      .catch((e) => {
        console.error('팔로우 에러 : ', e);
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
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  interface SelectedType {
    fontId: number;
    selected: boolean;
    sellerId: number;
    fontPrice: number;
  }

  // 시작하자마자 불러올것
  const [selectedFont, setSelectedFont] = useState<SelectedType[]>([]);

  const deleteCartFC = () => {
    const selectedCartList = selectedFont.filter((sf) => sf.selected).map((sf) => sf.fontId);

    if (selectedCartList.length > 0) {
      cartDeleteAPI(selectedCartList)
        .then((r) => {
          console.log(r);
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  useEffect(() => {
    const initialSelectedFont = cartData.map((item) => ({
      fontId: item.fontId,
      selected: false,
      sellerId: item.sellerId,
      fontPrice: item.fontPrice,
    }));

    setSelectedFont(initialSelectedFont);
  }, [cartData]);

  const currentSelected = (fontId: number) => {
    const selectedItem = selectedFont.find((sf) => sf.fontId === fontId);
    return selectedItem?.selected;
  };

  const clickCheckFC = (fontId: number) => {
    const newSelectedFont = selectedFont.map((item) => {
      if (item.fontId === fontId) {
        const newSelected = !item.selected;
        const priceChange = newSelected ? item.fontPrice : -item.fontPrice;
        setTotalCartPrice((prevPrice) => prevPrice + priceChange);

        return { ...item, selected: newSelected };
      }
      return item;
    });

    setSelectedFont(newSelectedFont);
  };

  useEffect(() => {
    const newTotalPrice = selectedFont
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.fontPrice, 0);

    setTotalCartPrice(newTotalPrice);
  }, [selectedFont]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ProfileBox>
          <IngredientContent>
            <ProfilImgBox onClick={clickProfileImgHandler}>
              {myProfileImage ? (
                <>
                  <img
                    src={
                      'https://ddobak-profile-image.s3.ap-northeast-2.amazonaws.com/' +
                      myProfileImage
                    }
                    alt="프로필 이미지"
                    className={classes.ImgStyle}
                  />
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
              <ContentLargeBox>
                {createdFontList.length > 0 ? (
                  createdFontList.map((font) => {
                    return (
                      <ContentIngredient key={font['fontId']}>
                        <ContentInnerLeft>
                          <ContentInnerTextBox>
                            <ContentHeader>
                              <ContentInnerHeaderText>{font['fontName']}</ContentInnerHeaderText>
                            </ContentHeader>
                            <ContentInnerContentText>
                              <CartStyle
                                fontFamily={font['fontName'].replaceAll(' ', '_')}
                                fontSrc={font['fontFileUrl']}
                              >
                                다람쥐 헌 쳇바퀴 타고파
                              </CartStyle>
                            </ContentInnerContentText>
                          </ContentInnerTextBox>
                        </ContentInnerLeft>
                        <ContentInnerRight>
                          <ContentGrayDisabled>결제완료</ContentGrayDisabled>
                          <ContentRedBtn
                            onClick={() => {
                              clickDownloadHandler(font);
                            }}
                          >
                            다운로드
                          </ContentRedBtn>
                        </ContentInnerRight>
                      </ContentIngredient>
                    );
                  })
                ) : (
                  <div className={classes.noContent}>"구매한 폰트가 없습니다."</div>
                )}
              </ContentLargeBox>
            </>
          ) : pageLocation.likeList ? (
            <>
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
                              <ContentInnerHeaderText>{dib.fontName}</ContentInnerHeaderText>
                              <ContentProducerName>| {dib.producerName}</ContentProducerName>
                            </ContentHeader>
                            <ContentInnerContentText>
                              <CartStyle
                                fontFamily={dib.fontName.replaceAll(' ', '_')}
                                fontSrc={dib.fontFileUrl}
                              >
                                다람쥐 헌 쳇바퀴 타고파
                              </CartStyle>
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
                  <SelectListDelete onClick={deleteCartFC}>선택 항목 삭제</SelectListDelete>
                </FontBasketTopBox>
                {cartData.map((cart) => {
                  return (
                    <ContentIngredient key={'cart' + cart.fontId}>
                      <ContentInnerLeft>
                        <ContentInnerTextBox>
                          <ContentHeader>
                            <ContentInnerHeaderText>{cart.fontName}</ContentInnerHeaderText>
                            <ContentProducerName>| {cart.producer} </ContentProducerName>
                            <ContentProducerName style={{ marginLeft: 10 }}>
                              | {formatNumberWithCommas(cart.fontPrice)} P
                            </ContentProducerName>
                          </ContentHeader>
                          <CartStyle
                            fontFamily={cart.fontName.replace(' ', '_')}
                            fontSrc={cart.fontUrl}
                          >
                            다람쥐 헌 쳇바퀴 타고파
                          </CartStyle>
                        </ContentInnerTextBox>
                      </ContentInnerLeft>
                      <ContentInnerRight>
                        {currentSelected(cart.fontId) ? (
                          <FaRegCheckSquare
                            className={classes.checkIcon}
                            onClick={() => {
                              clickCheckFC(cart.fontId);
                            }}
                          />
                        ) : (
                          <FaRegSquare
                            className={classes.checkIcon}
                            onClick={() => {
                              clickCheckFC(cart.fontId);
                            }}
                          />
                        )}
                      </ContentInnerRight>
                    </ContentIngredient>
                  );
                })}
                <FontBasketBottomBox>
                  {/* 금액이 나와야 함 */}
                  <CartPriceText>
                    <CartPriceBox>{formatNumberWithCommas(totalCartPrice)} P</CartPriceBox>
                  </CartPriceText>
                  <ContentGrayTransaction onClick={transactionClick}>
                    결제하기
                  </ContentGrayTransaction>
                </FontBasketBottomBox>
              </ContentLargeBox>
            </>
          ) : pageLocation.boughtFonts ? (
            <>
              <ContentLargeBox>
                {purchaseFontList.length > 0 ? (
                  purchaseFontList.map((font) => {
                    return (
                      <ContentIngredient key={font.fontId}>
                        <ContentInnerLeft>
                          <ContentInnerTextBox>
                            <ContentHeader>
                              <ContentInnerHeaderText>{font.fontName}</ContentInnerHeaderText>
                              <ContentProducerName>| {font.producerName}</ContentProducerName>
                            </ContentHeader>
                            <ContentInnerContentText>
                              <CartStyle
                                fontSrc={font.fontUrl}
                                fontFamily={font.fontName.replaceAll(' ', '_')}
                              >
                                다람쥐 헌 쳇바퀴 타고파
                              </CartStyle>
                            </ContentInnerContentText>
                          </ContentInnerTextBox>
                        </ContentInnerLeft>
                        <ContentInnerRight>
                          <ContentGrayBtn onClick={clickReviewHandler}>후기등록</ContentGrayBtn>
                          <ContentRedBtn onClick={() => clickPurchaseDownload(font)}>
                            다운로드
                          </ContentRedBtn>
                        </ContentInnerRight>
                      </ContentIngredient>
                    );
                  })
                ) : (
                  <div className={classes.noContent}>"구매한 폰트가 없습니다."</div>
                )}
              </ContentLargeBox>
            </>
          ) : (
            <>
              {/* ======== */}
              {/* 찜한 제작자 */}
              {/* ======== */}
              <ContentLargeBox>
                {myFollowingList.length > 0 ? (
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
                    {myFollowingList.map((item) => {
                      console.log('여기여기', item);
                      return (
                        <SwiperSlide className={classes.swiperSlide}>
                          <img
                            onClick={() => {
                              navigate(`/maker/${item['nickname']}/${item['memberId']}`);
                            }}
                            src={
                              'https://ddobak-profile-image.s3.ap-northeast-2.amazonaws.com/' +
                              item['ProfileImg']
                            }
                            alt=""
                            className={classes.swiperImg}
                          />
                          <LikeIconBox>
                            <FaHeart
                              size={40}
                              color={'#d71718'}
                              onClick={() => {
                                clickHeartButton(item);
                              }}
                            />
                          </LikeIconBox>
                          <LikeProducerBox
                            onClick={() => {
                              navigate(`/maker/${item['nickname']}/${item['memberId']}`);
                            }}
                          >
                            <LikeBoxText>{item['nickname']}</LikeBoxText>
                          </LikeProducerBox>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <div className={classes.noContent}>"팔로우한 폰트 제작자가 없습니다."</div>
                )}
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
