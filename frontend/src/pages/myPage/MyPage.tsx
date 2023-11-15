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
  ContentInnerHeaderText,
  ContentInnerRight,
  ContentGrayDisabled,
  ContentGrayTransaction,
  ContentGrayBtn,
  ContentRedBtn,
  ContentIconsBox,
  NewBtnBox,
  NewBtnText,
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

// navigation
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { checkToken, userMypageAPI } from 'https/utils/AuthFunction';
import { changeNicknameModalActions } from 'store/changeNicknameSlice';

import { dibListAPI, dibRemoveAPI } from 'https/utils/FavoriteFunction';
import { chargePointModalActions } from 'store/chargePointModalSlice';
import { getData } from 'https/http';
import { transactionMyAllAPI } from 'https/utils/TransactionFunction';
import { cartAddAPI, cartDeleteAPI, cartGetAPI } from 'https/utils/CartFunction';
import { followDeleteAPI, getFollowingList } from 'https/utils/FollowFunction';

import styled from '@emotion/styled';
import CommonEmptyBox from '../../common/commonEmptyBox/CommonEmptyBox';
import { progressLoaderActions } from 'store/progressLoaderSlice';
import { successModalActions } from 'store/successModalSlice';
import { fontMypageAPI } from 'https/utils/FontFunction';

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
  // redux
  const dispatch = useDispatch();
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
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      if (myValue) {
        if (myValue === 'fontBasket') {
          setPageLocation({
            productsState: false,
            likeList: false,
            fontBasket: true,
            boughtFonts: false,
            likeProducers: false,
          });
          await cartGetAPI()
            .then(async (r) => {
              setCartData(r);
            })
            .catch((e) => console.error(e));
          setTimeout(() => {
            dispatch(progressLoaderActions.resetGauge());
          }, 1500);
          setFontBasketComplete(true);
        }
      }
    }
    fetch();
  }, [myValue, dispatch]);

  useEffect(() => {
    async function fetch() {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      const token = await checkToken();
      const id = await getData('id');
      setMyId(id);
      if (token) {
        // 마이페이지 불러오기
        await userMypageAPI()
          .then(async (r) => {
            const nickname = r.nickname;
            const point = r.point;
            const profileImg = r.profileImg;
            await setMyNickname(nickname);
            await setMyPoint(point);
            await setMyProfileImage(profileImg);
            setTimeout(() => {
              dispatch(progressLoaderActions.resetGauge());
            }, 1500);
          })
          .catch((e) => console.error(e));

        // 제작 상태 가져오기
        await fontMypageAPI()
          .then(async (r) => {
            setCreatedFontList(r);
          })
          .catch((e) => {
            console.error(e);
          });
        setProductsComplete(true);
      } else {
        navigate('/wrong');
      }
    }
    fetch();
    // navigate를 의존성 배열에 추가합니다.
  }, [navigate, dispatch]);

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

  const [productsComplete, setProductsComplete] = useState<boolean>(false);
  const [likeListComplete, setLikeListComplete] = useState<boolean>(false);
  const [fontBasketComplete, setFontBasketComplete] = useState<boolean>(false);
  const [boughtComplete, setBoughtComplete] = useState<boolean>(false);
  const [likeProComplete, setLikeProComplete] = useState<boolean>(false);

  const pageClickHandle = async (pageName: string) => {
    if (pageName === 'productsState') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      await fontMypageAPI()
        .then(async (r) => {
          setCreatedFontList(r);
        })
        .catch((e) => console.error(e));

      setPageLocation({
        productsState: true,
        likeList: false,
        fontBasket: false,
        boughtFonts: false,
        likeProducers: false,
      });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setProductsComplete(true);
    } else if (pageName === 'likeList') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      await dibListAPI()
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
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setLikeListComplete(true);
    } else if (pageName === 'fontBasket') {
      dispatch(progressLoaderActions.resetGauge());
      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: true,
        boughtFonts: false,
        likeProducers: false,
      });
      dispatch(progressLoaderActions.startGuage());
      await cartGetAPI()
        .then(async (response) => {
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
      const timer = setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setFontBasketComplete(true);
      return () => {
        clearTimeout(timer);
      };
    } else if (pageName === 'boughtFonts') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      await transactionMyAllAPI()
        .then(async (r) => setPurchaseFontList(r))
        .catch((e) => console.error(e));

      setPageLocation({
        productsState: false,
        likeList: false,
        fontBasket: false,
        boughtFonts: true,
        likeProducers: false,
      });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setBoughtComplete(true);
    } else {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      await getFollowingList()
        .then((r) => {
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
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setLikeProComplete(true);
    }
  };
  // 포인트 결제

  const transactionClick = async () => {
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
    if (buyAllList.length > 0) {
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

  interface FontType {
    fontId: number;
    fontName: string;
    fontFileUrl: string;
    openStatus: boolean;
    makeStatus: string;
  }
  // makeStatus: COMPLETE, MAKING, FAIL

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
  const clickBasketHandler = async (fontId: string) => {
    cartAddAPI(fontId)
      .then(async (r) => {
        dispatch(
          successModalActions.showSomething({
            successHeader: '담기 완료',
            successContext: '장바구니에 잘 담아졌어요!',
          }),
        );
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          successModalActions.showSomething({
            successHeader: '담기 실패',
            successContext: '이미 장바구니에 들어있어요.',
          }),
        );
      });
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
    window.scrollTo({ left: 0, top: 0 });
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

  const handleClickFontNameFC = async (fontId: string) => {
    navigate(`/font/${fontId}`);
  };

  function removeSpaces(str: string) {
    if (str === null) {
      return '';
    }
    // 공백이 있는지 확인
    if (str.includes(' ')) {
      // 모든 공백 제거
      return str.replace(/\s+/g, '');
    } else {
      // 공백이 없으면 원래 문자열 그대로 반환
      return str;
    }
  }

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
              {productsComplete ? (
                <>
                  <ContentLargeBox>
                    {createdFontList.length > 0 ? (
                      createdFontList.map((font) => {
                        if (font.makeStatus === 'COMPLETE') {
                          return (
                            <ContentIngredient key={font.fontId + 'COMPLETE'}>
                              <ContentInnerLeft>
                                <ContentInnerTextBox>
                                  <ContentHeader>
                                    <ContentInnerHeaderText
                                      onClick={() => {
                                        handleClickFontNameFC(font.fontId.toString());
                                      }}
                                    >
                                      {font.fontName}
                                    </ContentInnerHeaderText>
                                  </ContentHeader>
                                  <div>
                                    <CartStyle
                                      fontFamily={removeSpaces(font.fontName)}
                                      fontSrc={font.fontFileUrl}
                                    >
                                      다람쥐 헌 쳇바퀴 타고파
                                    </CartStyle>
                                  </div>
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
                        } else if (font.makeStatus === 'MAKING') {
                          return (
                            <ContentIngredient key={font.fontId + 'MAKING'}>
                              <ContentInnerLeft>
                                <ContentInnerTextBox>
                                  <ContentHeader>
                                    <ContentInnerHeaderText style={{ pointerEvents: 'none' }}>
                                      {font.fontName}
                                    </ContentInnerHeaderText>
                                  </ContentHeader>
                                  <div>
                                    <CartStyle
                                      fontFamily={removeSpaces(font.fontName)}
                                      fontSrc={font.fontFileUrl}
                                    >
                                      다람쥐 헌 쳇바퀴 타고파
                                    </CartStyle>
                                  </div>
                                </ContentInnerTextBox>
                              </ContentInnerLeft>
                              <ContentInnerRight>
                                <ContentGrayDisabled>제작중</ContentGrayDisabled>
                              </ContentInnerRight>
                            </ContentIngredient>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <CommonEmptyBox text="제작한 폰트가 없습니다." />
                    )}
                  </ContentLargeBox>
                </>
              ) : (
                <></>
              )}
            </>
          ) : pageLocation.likeList ? (
            <>
              {likeListComplete ? (
                <>
                  <ContentLargeBox>
                    {dibList.length > 0 ? (
                      dibList.map((dib) => {
                        return (
                          <ContentIngredient key={dib['fontId'] + 'dib'}>
                            <ContentInnerLeft>
                              <ContentIconsBox
                                onClick={() => {
                                  clickBookmarkButton(dib);
                                }}
                              >
                                <FaBookmark className={classes.bookmarkIcon} />
                              </ContentIconsBox>
                              <ContentInnerTextBox>
                                <ContentHeader>
                                  <ContentInnerHeaderText
                                    onClick={() => {
                                      handleClickFontNameFC(dib.fontId.toString());
                                    }}
                                  >
                                    {dib.fontName}
                                  </ContentInnerHeaderText>
                                  <ContentProducerName>| {dib.producerName}</ContentProducerName>
                                </ContentHeader>
                                <div>
                                  <CartStyle
                                    fontFamily={dib.fontName.replaceAll(' ', '_')}
                                    fontSrc={dib.fontFileUrl}
                                  >
                                    다람쥐 헌 쳇바퀴 타고파
                                  </CartStyle>
                                </div>
                              </ContentInnerTextBox>
                            </ContentInnerLeft>
                            <ContentInnerRight style={{ justifyContent: 'center' }}>
                              <NewBtnBox
                                onClick={() => {
                                  clickBasketHandler(dib.fontId.toString());
                                }}
                              >
                                <NewBtnText>장바구니</NewBtnText>
                                <NewBtnText>담기</NewBtnText>
                              </NewBtnBox>
                            </ContentInnerRight>
                          </ContentIngredient>
                        );
                      })
                    ) : (
                      <CommonEmptyBox text="찜한 폰트가 없습니다." />
                    )}
                  </ContentLargeBox>
                </>
              ) : (
                <></>
              )}
            </>
          ) : pageLocation.fontBasket ? (
            <>
              {/* ======== */}
              {/* 장바구니 */}
              {/* ======== */}
              {fontBasketComplete ? (
                <>
                  <ContentLargeBox>
                    {cartData.length > 0 ? (
                      <>
                        <FontBasketTopBox>
                          <SelectListDelete onClick={deleteCartFC}>선택 항목 삭제</SelectListDelete>
                        </FontBasketTopBox>
                        {cartData.map((cart) => {
                          return (
                            <ContentIngredient key={'cart' + cart.fontId}>
                              <ContentInnerLeft>
                                <ContentInnerTextBox>
                                  <ContentHeader>
                                    <ContentInnerHeaderText
                                      onClick={() => {
                                        handleClickFontNameFC(cart.fontId.toString());
                                      }}
                                    >
                                      {cart.fontName}
                                    </ContentInnerHeaderText>
                                    <ContentProducerName>| {cart.producer} </ContentProducerName>
                                    <ContentProducerName style={{ marginLeft: 10 }}>
                                      |{' '}
                                      {cart.fontPrice === 0 ? (
                                        <span className={classes.freePrice}>무료 폰트</span>
                                      ) : (
                                        `${formatNumberWithCommas(cart.fontPrice)} P`
                                      )}
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
                      </>
                    ) : (
                      <>
                        <CommonEmptyBox text="장바구니에 담긴 폰트가 없습니다." />
                      </>
                    )}
                  </ContentLargeBox>
                </>
              ) : (
                <></>
              )}
            </>
          ) : pageLocation.boughtFonts ? (
            <>
              {boughtComplete ? (
                <>
                  <ContentLargeBox>
                    {purchaseFontList.length > 0 ? (
                      purchaseFontList.map((font) => {
                        return (
                          <ContentIngredient key={font.fontId + 'boughtFonts'}>
                            <ContentInnerLeft>
                              <ContentInnerTextBox>
                                <ContentHeader>
                                  <ContentInnerHeaderText
                                    onClick={() => {
                                      handleClickFontNameFC(font.fontId.toString());
                                    }}
                                  >
                                    {font.fontName}
                                  </ContentInnerHeaderText>
                                  <ContentProducerName>| {font.producerName}</ContentProducerName>
                                </ContentHeader>
                                <div>
                                  <CartStyle
                                    fontSrc={font.fontUrl}
                                    fontFamily={font.fontName.replaceAll(' ', '_')}
                                  >
                                    다람쥐 헌 쳇바퀴 타고파
                                  </CartStyle>
                                </div>
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
                      <CommonEmptyBox text="구매한 폰트가 없습니다." />
                    )}
                  </ContentLargeBox>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {/* ======== */}
              {/* 찜한 제작자 */}
              {/* ======== */}
              {likeProComplete ? (
                <>
                  <ContentLargeBox>
                    {myFollowingList.length > 0 ? (
                      <Swiper
                        onBeforeInit={(swiper: SwiperInstance) => (swiperRef.current = swiper)} // ref에 swiper 저장
                        slidesPerView={3}
                        spaceBetween={15}
                        loop={myFollowingList && myFollowingList.length > 3}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Navigation]}
                        className={classes.swiper}
                      >
                        {myFollowingList.map((item) => {
                          return (
                            <SwiperSlide
                              key={item['memberId'] + 'creator'}
                              className={classes.swiperSlide}
                            >
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
                      <CommonEmptyBox text="찜한 제작자가 없습니다." />
                    )}
                  </ContentLargeBox>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </MyPageContent>
      </div>
      {/* result modal 실행 */}
    </div>
  );
};

export default MyPage;
