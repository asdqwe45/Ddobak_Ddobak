import { useState } from 'react';
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

const MyPagePointPage: React.FC = () => {
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
    } else if (content === 'buy') {
      setSelectContent({
        all: false,
        buy: true,
        sell: false,
        charge: false,
        exchange: false,
        make: false,
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
    } else if (content === 'charge') {
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: true,
        exchange: false,
        make: false,
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
    } else {
      setSelectContent({
        all: false,
        buy: false,
        sell: false,
        charge: false,
        exchange: false,
        make: true,
      });
    }
  };

  const dispatch = useDispatch();
  const clickChargeHandler = () => {
    dispatch(chargePointModalActions.toggle());
  };
  const clickExchangeHandler = () => {
    dispatch(exchangeModalActions.toggle());
  };
  return (
    <div className={classes.container}>
      <MyPagePointHeader>
        <MyPagePointBox>
          <MyPagePointHeaderText style={{ paddingRight: 40 }}>보유한 포인트</MyPagePointHeaderText>
          <MyPagePointHeaderText>10,000 P</MyPagePointHeaderText>
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
              <MyPagePointContentIngredient>
                <MyPagePointContentBox>
                  <MyPagePointDateText>2023.09.10</MyPagePointDateText>
                  <MyPagePointContentText>포인트 충전</MyPagePointContentText>
                </MyPagePointContentBox>
                <MyPagePointContentPointBox>
                  <MyPagePointContentText>+ 5,000</MyPagePointContentText>
                  <MyPagePointDateText style={{ color: likeCountColor }}>
                    잔여 10,000P
                  </MyPagePointDateText>
                </MyPagePointContentPointBox>
              </MyPagePointContentIngredient>
              <MyPagePointContentIngredient>
                <MyPagePointContentBox>
                  <MyPagePointDateText>2023.09.10</MyPagePointDateText>
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
              <MyPagePointContentIngredient>
                <MyPagePointContentBox>
                  <MyPagePointDateText>2023.09.09</MyPagePointDateText>
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
              <MyPagePointContentIngredient>
                <MyPagePointContentBox>
                  <MyPagePointDateText>2023.09.09</MyPagePointDateText>
                  <MyPagePointContentText style={{ color: mainRedColor }}>
                    폰트 구매
                  </MyPagePointContentText>
                  <MyPagePointContentText>또박또박_테스트체</MyPagePointContentText>
                  <MyPagePointMaker>|</MyPagePointMaker>
                  <MyPagePointMaker>제작자</MyPagePointMaker>
                </MyPagePointContentBox>
                <MyPagePointContentPointBox>
                  <MyPagePointContentText style={{ color: mainRedColor }}>
                    - 5,000
                  </MyPagePointContentText>
                  <MyPagePointDateText style={{ color: likeCountColor }}>
                    잔여 5,000P
                  </MyPagePointDateText>
                </MyPagePointContentPointBox>
              </MyPagePointContentIngredient>
              <MyPagePointContentIngredient>
                <MyPagePointContentBox>
                  <MyPagePointDateText>2023.09.09</MyPagePointDateText>
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
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          ) : selectContent.buy ? (
            <>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          ) : selectContent.sell ? (
            <>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          ) : selectContent.charge ? (
            <>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          ) : selectContent.exchange ? (
            <>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          ) : (
            <>
              <MyPagePointContentIngredient>안녕</MyPagePointContentIngredient>
            </>
          )}
        </ContentLargeBox>
      </MyPageContent>
    </div>
  );
};
export default MyPagePointPage;
