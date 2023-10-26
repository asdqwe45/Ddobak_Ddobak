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
  ContentLargeBox,
  ContentIngredient,
} from './myPageComponents/MyPageComponents';
import classes from './MyPage.module.css';

import { FaCircleUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { bolderColor } from 'common/colors/CommonColors';

const MyPage: React.FC = () => {
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
                <FaPencilAlt size={30} style={{ cursor: 'pointer' }} onClick={pencilClick} />
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
            <SelectBtn>제작 상태</SelectBtn>
            <SelectBtn>찜 목록</SelectBtn>
            <SelectBtn>장바구니</SelectBtn>
            <SelectBtn>구매한 폰트</SelectBtn>
            <SelectBtn>찜한 제작자</SelectBtn>
          </SelectBox>
          <ContentLargeBox>
            <ContentIngredient></ContentIngredient>
            <ContentIngredient></ContentIngredient>
            <ContentIngredient></ContentIngredient>
            <ContentIngredient></ContentIngredient>
            <ContentIngredient></ContentIngredient>
            <ContentIngredient></ContentIngredient>
          </ContentLargeBox>
        </MyPageContent>
      </div>
    </div>
  );
};

export default MyPage;
