import { useState } from 'react';
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
} from './myPageComponents/MyPageComponents';
import classes from './MyPage.module.css';

import { FiSettings } from 'react-icons/fi';
import { FaCircleUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { bolderColor } from 'common/colors/CommonColors';
import { FaBookmark, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

const MyPage: React.FC = () => {
  const [pageLocation, setPageLocation] = useState({
    productsState: true,
    likeList: false,
    fontBasket: false,
    boughtFonts: false,
    likeProducers: false,
  });

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
  const changePwClick = () => {
    console.log('change Pw');
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ProfileBox>
          <IngredientContent>
            <ProfilImgBox>
              <FaCircleUser color={bolderColor} className={classes.ImgStyle} />
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
              <ChangePassword onClick={changePwClick}>비밀번호 변경</ChangePassword>
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
                <PointTransactionBtn onClick={transactionClick}>거래내역</PointTransactionBtn>
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
                    <ContentRedBtn>결제확인</ContentRedBtn>
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                        <FiSettings className={classes.settingIcon} />
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
                <FontBasketBottomBox><ContentGrayBtn>결제하기</ContentGrayBtn></FontBasketBottomBox>
              </ContentLargeBox>
            </>
          ) : pageLocation.boughtFonts ? (
            <>
              {/* ======== */}
              {/* 구매한 폰트 */}
              {/* ======== */}
              <ContentLargeBox>
                <ContentIngredient>구매</ContentIngredient>
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
                <ContentIngredient>찜제</ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
                <ContentIngredient></ContentIngredient>
              </ContentLargeBox>
            </>
          )}
        </MyPageContent>
      </div>
    </div>
  );
};

export default MyPage;
