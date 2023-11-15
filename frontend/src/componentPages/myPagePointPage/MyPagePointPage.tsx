import { useState, useEffect } from 'react';
import classes from './MyPagePointPage.module.css';
import {
  MyPagePointHeader,
  MyPagePointHeaderText,
  MyPagePointContentIngredient,
  MyPagePointBox,
  MyPagePointContentBox,
  MyPagePointContentPointBox,
  MyPagePointMaker,
  MyPagePointDateText,
  MyPagePointContentText,
} from './myPagePointPageComponents/MyPagePointPageComponents';

import { chargePointModalActions } from 'store/chargePointModalSlice';
import { mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import { useDispatch } from 'react-redux';
// btn components
import {
  PointExchangeBtn,
  PointTransactionBtn,
  MyPageContent,
  SelectBox,
  SelectBtn,
  SelectDisabled,
  ContentLargeBox,
} from 'pages/myPage/myPageComponents/MyPageComponents';
import { exchangeModalActions } from 'store/exchangeModalSlice';

// 사용 함수
/*
  transactionCreationListAPI,
  transactionChargeAPI,
  transactionPurchaseAPI,
  transactionWithdrawAPI,
*/
import {
  transactionChargeListAPI,
  transactionListAllAPI,
  transactionPurchaseListAPI,
  transactionSellList,
  transactionWithdrawListAPI,
  transactionCreationListAPI,
} from 'https/utils/TransactionFunction';
import { getData } from 'https/http';
import { useNavigate } from 'react-router-dom';

import { userMypageAPI } from 'https/utils/AuthFunction';

import CommonEmptyBox from 'common/commonEmptyBox/CommonEmptyBox';
import { progressLoaderActions } from 'store/progressLoaderSlice';

interface TransactionResponse {
  transactionDate: string;
  transactionType: string;
  fontName: string;
  fontCreator: string;
  transactionAmount: number;
  transactionAfterAmount: number;
  isMultiple: boolean;
  totalOrderCount: number;
}

const MyPagePointPage: React.FC = () => {
  const [allData, setAllData] = useState<TransactionResponse[]>([]);
  const [buyData, setBuyData] = useState<TransactionResponse[]>([]);
  const [sellData, setSellData] = useState<TransactionResponse[]>([]);
  const [chargeData, setChargeData] = useState<TransactionResponse[]>([]);
  const [exchangeData, setExchangeData] = useState<TransactionResponse[]>([]);
  const [makeData, setMakeData] = useState<TransactionResponse[]>([]);
  const [myPoint, setMyPoint] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');

  const [allComplete, setAllComplete] = useState<boolean>(false);
  const [buyComplete, setBuyComplete] = useState<boolean>(false);
  const [sellComplete, setSellComplete] = useState<boolean>(false);
  const [chargeComplete, setChargeComplete] = useState<boolean>(false);
  const [exchangeComplete, setExchangeComplete] = useState<boolean>(false);
  const [makeComplete, setMakeComplete] = useState<boolean>(false);

  function formatDateTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);
    return formattedDate.replace('년 ', '.').replace('월 ', '.').replace('일', ''); // '일' 문자를 제거합니다.
  }

  userMypageAPI()
    .then(async (r) => {
      const point = r.point;
      const nickname = r.nickname;
      await setMyPoint(point);
      await setNickname(nickname);
    })
    .catch((e) => {
      console.error(e);
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetch() {
      const Token = await getData('accessToken');
      if (!Token) {
        navigate('/wrong');
      }
    }
    fetch();
  }, [navigate]);

  const [selectContent, setSelectContent] = useState({
    all: true,
    buy: false,
    sell: false,
    charge: false,
    exchange: false,
    make: false,
  });
  const selectHandler = async (content: string) => {
    if (content === 'all') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: true,
        buy: false,
        sell: false,
        charge: false,
        exchange: false,
        make: false,
      });
      await transactionListAllAPI()
        .then(async (r) => {
          setAllData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setAllComplete(true);
    } else if (content === 'buy') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: false,
        buy: true,
        sell: false,
        charge: false,
        exchange: false,
        make: false,
      });
      await transactionPurchaseListAPI()
        .then(async (r) => {
          setBuyData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setBuyComplete(true);
    } else if (content === 'sell') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: false,
        buy: false,
        sell: true,
        charge: false,
        exchange: false,
        make: false,
      });
      await transactionSellList()
        .then(async (r) => {
          setSellData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setSellComplete(true);
    } else if (content === 'charge') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: true,
        exchange: false,
        make: false,
      });
      await transactionChargeListAPI()
        .then(async (r) => {
          setChargeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setChargeComplete(true);
    } else if (content === 'exchange') {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: false,
        exchange: true,
        make: false,
      });
      await transactionWithdrawListAPI()
        .then(async (r) => {
          setExchangeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setExchangeComplete(true);
    } else {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: false,
        exchange: false,
        make: true,
      });
      await transactionCreationListAPI()
        .then(async (r) => {
          setMakeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setMakeComplete(true);
    }
  };

  const clickChargeHandler = async () => {
    dispatch(chargePointModalActions.currentMyState({ myPoint: myPoint, nickname: nickname }));
    dispatch(chargePointModalActions.chargeWhereFC({ isModal: false }));
    dispatch(chargePointModalActions.toggle());
  };
  const clickExchangeHandler = async () => {
    dispatch(chargePointModalActions.currentMyState({ myPoint: myPoint, nickname: nickname }));
    dispatch(exchangeModalActions.toggle());
  };

  useEffect(() => {
    async function fetch() {
      dispatch(progressLoaderActions.resetGauge());
      dispatch(progressLoaderActions.startGuage());
      await transactionListAllAPI()
        .then(async (r) => {
          setAllData(r);
        })
        .catch((e) => {
          console.error(e);
        });
      setTimeout(() => {
        dispatch(progressLoaderActions.resetGauge());
      }, 1500);
      setAllComplete(true);
    }
    fetch();
  }, [dispatch]);

  function formatNumberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function tooltipFormat(datetimeStr: string) {
    const dt = new Date(datetimeStr);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hour = String(dt.getHours()).padStart(2, '0');
    const minute = String(dt.getMinutes()).padStart(2, '0');
    const second = String(dt.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}시 ${minute}분 ${second}초`;
  }

  return (
    <div className={classes.container}>
      <MyPagePointHeader>
        <MyPagePointBox>
          <MyPagePointHeaderText style={{ paddingRight: 40 }}>보유한 포인트</MyPagePointHeaderText>
          <MyPagePointHeaderText>{formatNumberWithCommas(myPoint)} P</MyPagePointHeaderText>
        </MyPagePointBox>
        <MyPagePointBox style={{ justifyContent: 'flex-end' }}>
          <PointExchangeBtn onClick={clickChargeHandler}>충전하기</PointExchangeBtn>
          <PointTransactionBtn onClick={clickExchangeHandler}>인출하기</PointTransactionBtn>
        </MyPagePointBox>
      </MyPagePointHeader>
      <MyPageContent style={{ maxHeight: 480 }}>
        <SelectBox>
          {selectContent.all ? (
            <SelectDisabled>전체</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('all');
              }}
            >
              전체
            </SelectBtn>
          )}
          {selectContent.buy ? (
            <SelectDisabled>구매</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('buy');
              }}
            >
              구매
            </SelectBtn>
          )}
          {selectContent.sell ? (
            <SelectDisabled>판매</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('sell');
              }}
            >
              판매
            </SelectBtn>
          )}
          {selectContent.charge ? (
            <SelectDisabled>충전</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('charge');
              }}
            >
              충전
            </SelectBtn>
          )}
          {selectContent.exchange ? (
            <SelectDisabled>인출</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('exchange');
              }}
            >
              인출
            </SelectBtn>
          )}
          {selectContent.make ? (
            <SelectDisabled>제작</SelectDisabled>
          ) : (
            <SelectBtn
              onClick={() => {
                selectHandler('make');
              }}
            >
              제작
            </SelectBtn>
          )}
        </SelectBox>
        <ContentLargeBox
          style={{ paddingTop: 10, paddingBottom: 10, overflow: 'auto', height: 370 }}
        >
          {selectContent.all ? (
            <>
              {' '}
              {allComplete ? (
                <>
                  {allData.length ? (
                    <>
                      {allData.map((data, index) => {
                        if (data.transactionType === '포인트 충전') {
                          return (
                            // 데이터 형식에 따라 다르게 적용
                            <MyPagePointContentIngredient key={index + 'allA'}>
                              <MyPagePointContentBox>
                                <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                  {formatDateTime(data.transactionDate)}
                                </MyPagePointDateText>
                                <MyPagePointContentText>
                                  {data.transactionType}
                                </MyPagePointContentText>
                              </MyPagePointContentBox>
                              <MyPagePointContentPointBox>
                                <MyPagePointContentText>
                                  + {formatNumberWithCommas(data.transactionAmount)}
                                </MyPagePointContentText>
                                <MyPagePointDateText style={{ color: likeCountColor }}>
                                  잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                                </MyPagePointDateText>
                              </MyPagePointContentPointBox>
                            </MyPagePointContentIngredient>
                          );
                        } else if (data.transactionType === '포인트 인출') {
                          return (
                            <MyPagePointContentIngredient key={index + 'allB'}>
                              <MyPagePointContentBox>
                                <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                  {formatDateTime(data.transactionDate)}
                                </MyPagePointDateText>
                                <MyPagePointContentText style={{ color: mainRedColor }}>
                                  포인트 인출
                                </MyPagePointContentText>
                              </MyPagePointContentBox>
                              <MyPagePointContentPointBox>
                                <MyPagePointContentText style={{ color: mainRedColor }}>
                                  - {formatNumberWithCommas(data.transactionAmount)}
                                </MyPagePointContentText>
                                <MyPagePointDateText style={{ color: likeCountColor }}>
                                  잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                                </MyPagePointDateText>
                              </MyPagePointContentPointBox>
                            </MyPagePointContentIngredient>
                          );
                        } else if (data.transactionType === '폰트 판매') {
                          return (
                            <MyPagePointContentIngredient key={index + 'allC'}>
                              <MyPagePointContentBox>
                                <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                  {formatDateTime(data.transactionDate)}
                                </MyPagePointDateText>
                                <MyPagePointContentText>판매</MyPagePointContentText>
                                <MyPagePointContentText style={{ fontSize: 20 }}>
                                  {data.fontName}
                                </MyPagePointContentText>
                              </MyPagePointContentBox>
                              <MyPagePointContentPointBox>
                                <MyPagePointContentText>
                                  + {formatNumberWithCommas(data.transactionAmount)}
                                </MyPagePointContentText>
                                <MyPagePointDateText style={{ color: likeCountColor }}>
                                  잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                                </MyPagePointDateText>
                              </MyPagePointContentPointBox>
                            </MyPagePointContentIngredient>
                          );
                        } else if (data.transactionType === '제작') {
                          return (
                            <MyPagePointContentIngredient key={index + 'allD'}>
                              <MyPagePointContentBox>
                                <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                  {formatDateTime(data.transactionDate)}
                                </MyPagePointDateText>
                                <MyPagePointContentText style={{ color: mainRedColor }}>
                                  제작
                                </MyPagePointContentText>
                                <MyPagePointContentText style={{ fontSize: 20 }}>
                                  {data.fontName}
                                </MyPagePointContentText>
                              </MyPagePointContentBox>
                              <MyPagePointContentPointBox>
                                <MyPagePointContentText style={{ color: mainRedColor }}>
                                  - {formatNumberWithCommas(data.transactionAmount)}
                                </MyPagePointContentText>
                                <MyPagePointDateText style={{ color: likeCountColor }}>
                                  잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                                </MyPagePointDateText>
                              </MyPagePointContentPointBox>
                            </MyPagePointContentIngredient>
                          );
                        }
                        // 폰트 구매
                        return (
                          <MyPagePointContentIngredient key={index + 'allE'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                구매
                              </MyPagePointContentText>
                              <MyPagePointContentText style={{ fontSize: 20 }}>
                                {data.fontName}
                              </MyPagePointContentText>
                              <MyPagePointMaker>|</MyPagePointMaker>
                              <MyPagePointMaker style={{ fontSize: 14 }}>
                                {data.fontCreator}
                              </MyPagePointMaker>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {formatNumberWithCommas(data.transactionAmount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="전체 거래 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.buy ? (
            <>
              {buyComplete ? (
                <>
                  {buyData.length ? (
                    <>
                      {buyData.map((data, index) => {
                        return (
                          <MyPagePointContentIngredient key={index + 'buy'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                구매
                              </MyPagePointContentText>
                              <MyPagePointContentText style={{ fontSize: 20 }}>
                                {data.fontName}
                              </MyPagePointContentText>
                              <MyPagePointMaker>|</MyPagePointMaker>
                              <MyPagePointMaker style={{ fontSize: 14 }}>
                                {data.fontCreator}
                              </MyPagePointMaker>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {formatNumberWithCommas(data.transactionAmount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="폰트 구매 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.sell ? (
            <>
              {sellComplete ? (
                <>
                  {sellData.length ? (
                    <>
                      {sellData.map((data, index) => {
                        return (
                          <MyPagePointContentIngredient key={index + 'sell'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText>판매</MyPagePointContentText>
                              <MyPagePointContentText style={{ fontSize: 20 }}>
                                {data.fontName}
                              </MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText>
                                + {formatNumberWithCommas(data.transactionAmount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="판매한 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.charge ? (
            <>
              {chargeComplete ? (
                <>
                  {chargeData.length ? (
                    <>
                      {chargeData.map((data, index) => {
                        return (
                          <MyPagePointContentIngredient key={index + 'charge'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText>포인트 충전</MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText>
                                + {formatNumberWithCommas(data.transactionAmount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)}P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="포인트 충전 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.exchange ? (
            <>
              {exchangeComplete ? (
                <>
                  {exchangeData.length ? (
                    <>
                      {exchangeData.map((data, index) => {
                        return (
                          <MyPagePointContentIngredient key={index + 'exchange'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                포인트 인출
                              </MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {formatNumberWithCommas(data.transactionAmount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="인출 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.make ? (
            <>
              {makeComplete ? (
                <>
                  {makeData.length ? (
                    <>
                      {makeData.map((data, index) => {
                        return (
                          <MyPagePointContentIngredient key={index + 'make'}>
                            <MyPagePointContentBox>
                              <MyPagePointDateText title={tooltipFormat(data.transactionDate)}>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                제작
                              </MyPagePointContentText>
                              <MyPagePointContentText style={{ fontSize: 20 }}>
                                {data.fontName}
                              </MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {formatNumberWithCommas(data.totalOrderCount)}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {formatNumberWithCommas(data.transactionAfterAmount)} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        );
                      })}
                    </>
                  ) : (
                    <CommonEmptyBox text="제작한 내역이 없습니다." />
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </ContentLargeBox>
      </MyPageContent>
    </div>
  );
};
export default MyPagePointPage;
