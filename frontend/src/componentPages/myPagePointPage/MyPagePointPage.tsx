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

  function formatDateTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
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

  // 데이터 가공
  const manufactureDate = (transactionDate: string, where: string) => {
    const key = where + transactionDate;
    return key;
  };

  const [selectContent, setSelectContent] = useState({
    all: true,
    buy: false,
    sell: false,
    charge: false,
    exchange: false,
    make: false,
  });
  const selectHandler = (content: string) => {
    if (content === 'all') {
      setSelectContent({
        all: true,
        buy: false,
        sell: false,
        charge: false,
        exchange: false,
        make: false,
      });
      transactionListAllAPI()
        .then(async (r) => {
          console.log(r);
          setAllData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (content === 'buy') {
      setSelectContent({
        all: false,
        buy: true,
        sell: false,
        charge: false,
        exchange: false,
        make: false,
      });
      transactionPurchaseListAPI()
        .then(async (r) => {
          console.log(r);
          setBuyData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (content === 'sell') {
      setSelectContent({
        all: false,
        buy: false,
        sell: true,
        charge: false,
        exchange: false,
        make: false,
      });
      transactionSellList()
        .then(async (r) => {
          console.log(r);
          setSellData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (content === 'charge') {
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: true,
        exchange: false,
        make: false,
      });
      transactionChargeListAPI()
        .then(async (r) => {
          console.log(r);
          console.log(r[0].transactionDate);
          console.log(r[0].transactionType);
          console.log(r[0].fontName);
          console.log(r[0].fontCreator);
          console.log(r[0].transactionAmount);
          console.log(r[0].transactionAfterAmount);
          console.log(r[0].isMultiple);
          console.log(r[0].totalOrderCount);
          setChargeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (content === 'exchange') {
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: false,
        exchange: true,
        make: false,
      });
      transactionWithdrawListAPI()
        .then(async (r) => {
          console.log(r.transactionDate);
          setExchangeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: false,
        exchange: false,
        make: true,
      });
      transactionCreationListAPI()
        .then(async (r) => {
          console.log(r);
          setMakeData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const dispatch = useDispatch();
  const clickChargeHandler = async () => {
    dispatch(chargePointModalActions.currentMyState({ myPoint: myPoint, nickname: nickname }));
    dispatch(chargePointModalActions.toggle());
  };
  const clickExchangeHandler = async () => {
    dispatch(chargePointModalActions.currentMyState({ myPoint: myPoint, nickname: nickname }));
    dispatch(exchangeModalActions.toggle());
  };

  useEffect(() => {
    async function fetch() {
      transactionListAllAPI()
        .then(async (r) => {
          console.log(r);
          setAllData(r);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    fetch();
  }, []);

  return (
    <div className={classes.container}>
      <MyPagePointHeader>
        <MyPagePointBox>
          <MyPagePointHeaderText style={{ paddingRight: 40 }}>보유한 포인트</MyPagePointHeaderText>
          <MyPagePointHeaderText>{myPoint} P</MyPagePointHeaderText>
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
          style={{ paddingTop: 10, paddingBottom: 10, overflow: 'auto', maxHeight: 370 }}
        >
          {selectContent.all ? (
            <>
              {allData.length ? (
                <>
                  {allData.map((data) => {
                    if (data.transactionType === '포인트 충전') {
                      return (
                        // 데이터 형식에 따라 다르게 적용
                        <MyPagePointContentIngredient
                          key={manufactureDate(data.transactionDate, 'all')}
                        >
                          <MyPagePointContentBox>
                            <MyPagePointDateText>
                              {formatDateTime(data.transactionDate)}
                            </MyPagePointDateText>
                            <MyPagePointContentText>{data.transactionType}</MyPagePointContentText>
                          </MyPagePointContentBox>
                          <MyPagePointContentPointBox>
                            <MyPagePointContentText>
                              + {data.transactionAmount}
                            </MyPagePointContentText>
                            <MyPagePointDateText style={{ color: likeCountColor }}>
                              잔여 {data.transactionAfterAmount} P
                            </MyPagePointDateText>
                          </MyPagePointContentPointBox>
                        </MyPagePointContentIngredient>
                      );
                    } else if (data.transactionType === '포인트 인출') {
                      return (
                        <>
                          {/* 포인트 인출 */}
                          <MyPagePointContentIngredient
                            key={manufactureDate(data.transactionDate, 'all')}
                          >
                            <MyPagePointContentBox>
                              <MyPagePointDateText>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                포인트 인출
                              </MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {data.transactionAmount}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {data.transactionAfterAmount} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        </>
                      );
                    } else if (data.transactionType === '폰트 판매') {
                      return (
                        <>
                          {/* 폰트 판매 */}
                          <MyPagePointContentIngredient
                            key={manufactureDate(data.transactionDate, 'all')}
                          >
                            <MyPagePointContentBox>
                              <MyPagePointDateText>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText>폰트 판매</MyPagePointContentText>
                              <MyPagePointContentText>{data.fontName}</MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText>
                                + {data.transactionAmount}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {data.transactionAfterAmount} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        </>
                      );
                    } else if (data.transactionType === '폰트 제작') {
                      return (
                        <>
                          {/* 폰트 제작 */}
                          <MyPagePointContentIngredient
                            key={manufactureDate(data.transactionDate, 'all')}
                          >
                            <MyPagePointContentBox>
                              <MyPagePointDateText>
                                {formatDateTime(data.transactionDate)}
                              </MyPagePointDateText>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                폰트 제작
                              </MyPagePointContentText>
                              <MyPagePointContentText>{data.fontName}</MyPagePointContentText>
                            </MyPagePointContentBox>
                            <MyPagePointContentPointBox>
                              <MyPagePointContentText style={{ color: mainRedColor }}>
                                - {data.transactionAmount}
                              </MyPagePointContentText>
                              <MyPagePointDateText style={{ color: likeCountColor }}>
                                잔여 {data.transactionAfterAmount} P
                              </MyPagePointDateText>
                            </MyPagePointContentPointBox>
                          </MyPagePointContentIngredient>
                        </>
                      );
                    }
                    // 폰트 구매
                    return (
                      <>
                        {/* 폰트 구매 */}
                        <MyPagePointContentIngredient
                          key={manufactureDate(data.transactionDate, 'all')}
                        >
                          <MyPagePointContentBox>
                            <MyPagePointDateText>
                              {formatDateTime(data.transactionDate)}
                            </MyPagePointDateText>
                            <MyPagePointContentText style={{ color: mainRedColor }}>
                              폰트 구매
                            </MyPagePointContentText>
                            <MyPagePointContentText>{data.fontName}</MyPagePointContentText>
                            <MyPagePointMaker>|</MyPagePointMaker>
                            <MyPagePointMaker>{data.fontCreator}</MyPagePointMaker>
                          </MyPagePointContentBox>
                          <MyPagePointContentPointBox>
                            <MyPagePointContentText style={{ color: mainRedColor }}>
                              - {data.transactionAmount}
                            </MyPagePointContentText>
                            <MyPagePointDateText style={{ color: likeCountColor }}>
                              잔여 {data.transactionAfterAmount} P
                            </MyPagePointDateText>
                          </MyPagePointContentPointBox>
                        </MyPagePointContentIngredient>
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.buy ? (
            <>
              {buyData.length ? (
                <>
                  {buyData.map((data) => {
                    return (
                      <MyPagePointContentIngredient
                        key={manufactureDate(data.transactionDate, 'buy')}
                      >
                        <MyPagePointContentBox>
                          <MyPagePointDateText>
                            {formatDateTime(data.transactionDate)}
                          </MyPagePointDateText>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            폰트 구매
                          </MyPagePointContentText>
                          <MyPagePointContentText>{data.fontName}</MyPagePointContentText>
                          <MyPagePointMaker>|</MyPagePointMaker>
                          <MyPagePointMaker>{data.fontCreator}</MyPagePointMaker>
                        </MyPagePointContentBox>
                        <MyPagePointContentPointBox>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            - {data.transactionAmount}
                          </MyPagePointContentText>
                          <MyPagePointDateText style={{ color: likeCountColor }}>
                            잔여 {data.transactionAfterAmount} P
                          </MyPagePointDateText>
                        </MyPagePointContentPointBox>
                      </MyPagePointContentIngredient>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.sell ? (
            <>
              {sellData.length ? (
                <>
                  {sellData.map((data) => {
                    return (
                      <MyPagePointContentIngredient
                        key={manufactureDate(data.transactionDate, 'sell')}
                      >
                        <MyPagePointContentBox>
                          <MyPagePointDateText>
                            {formatDateTime(data.transactionDate)}
                          </MyPagePointDateText>
                          <MyPagePointContentText>폰트 판매</MyPagePointContentText>
                          <MyPagePointContentText>또박또박_테스트체</MyPagePointContentText>
                        </MyPagePointContentBox>
                        <MyPagePointContentPointBox>
                          <MyPagePointContentText>+ 5,000</MyPagePointContentText>
                          <MyPagePointDateText style={{ color: likeCountColor }}>
                            잔여 5,000P
                          </MyPagePointDateText>
                        </MyPagePointContentPointBox>
                      </MyPagePointContentIngredient>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.charge ? (
            <>
              {chargeData.length ? (
                <>
                  {chargeData.map((data) => {
                    return (
                      <MyPagePointContentIngredient
                        key={manufactureDate(data.transactionDate, 'charge')}
                      >
                        <MyPagePointContentBox>
                          <MyPagePointDateText>
                            {formatDateTime(data.transactionDate)}
                          </MyPagePointDateText>
                          <MyPagePointContentText>포인트 충전</MyPagePointContentText>
                        </MyPagePointContentBox>
                        <MyPagePointContentPointBox>
                          <MyPagePointContentText>+ 5,000</MyPagePointContentText>
                          <MyPagePointDateText style={{ color: likeCountColor }}>
                            잔여 10,000P
                          </MyPagePointDateText>
                        </MyPagePointContentPointBox>
                      </MyPagePointContentIngredient>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : selectContent.exchange ? (
            <>
              {exchangeData.length ? (
                <>
                  {exchangeData.map((data) => {
                    return (
                      <MyPagePointContentIngredient
                        key={manufactureDate(data.transactionDate, 'exchange')}
                      >
                        <MyPagePointContentBox>
                          <MyPagePointDateText>
                            {formatDateTime(data.transactionDate)}
                          </MyPagePointDateText>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            포인트 인출
                          </MyPagePointContentText>
                        </MyPagePointContentBox>
                        <MyPagePointContentPointBox>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            - 5,000
                          </MyPagePointContentText>
                          <MyPagePointDateText style={{ color: likeCountColor }}>
                            잔여 0P
                          </MyPagePointDateText>
                        </MyPagePointContentPointBox>
                      </MyPagePointContentIngredient>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {makeData.length ? (
                <>
                  {makeData.map((data) => {
                    return (
                      <MyPagePointContentIngredient
                        key={manufactureDate(data.transactionDate, 'make')}
                      >
                        <MyPagePointContentBox>
                          <MyPagePointDateText>
                            {formatDateTime(data.transactionDate)}
                          </MyPagePointDateText>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            폰트 제작
                          </MyPagePointContentText>
                          <MyPagePointContentText>또박또박_테스트체</MyPagePointContentText>
                        </MyPagePointContentBox>
                        <MyPagePointContentPointBox>
                          <MyPagePointContentText style={{ color: mainRedColor }}>
                            - 50,000
                          </MyPagePointContentText>
                          <MyPagePointDateText style={{ color: likeCountColor }}>
                            잔여 10,000P
                          </MyPagePointDateText>
                        </MyPagePointContentPointBox>
                      </MyPagePointContentIngredient>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </ContentLargeBox>
      </MyPageContent>
    </div>
  );
};
export default MyPagePointPage;
