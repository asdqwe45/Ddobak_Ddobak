import styled from '@emotion/styled';
import { borderColor, likeCountColor } from '../../../common/colors/CommonColors';
import {
  SelectBox,
  SelectBtn,
  SelectDisabled,
} from 'pages/myPage/myPageComponents/MyPageComponents';

export const MyPagePointHeader = styled.div`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border: 2px solid ${borderColor};
  border-radius: 15px;
  margin-bottom: 20px;
`;

export const MyPagePointHeaderText = styled.h1`
  margin: 0px;
  font-size: 28px;
  font-weight: bold;
`;

export const MyPagePointBox = styled.div`
  width: 50%;
  height: 100%;
  min-width: 400px;
  display: flex;
  align-items: center;
`;

export const MyPagePointContentIngredient = styled.div`
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  border: 2px solid ${borderColor};
  border-radius: 15px;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MyPagePointSelectBox = styled(SelectBox)`
  min-height: 400px;
`;

export const MyPagePointSelectBtn = styled(SelectBtn)`
  max-width: 100px;
  min-height: 40px;
`;

export const MyPagePointSelectDisabled = styled(SelectDisabled)`
  max-width: 100px;
  min-height: 40px;
`;

export const MyPagePointContentPointBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const MyPagePointContentBox = styled.div`
  display: flex;
  align-items: center;
`;
export const MyPagePointContentText = styled.h1`
  font-size: 24px;
  margin: 0px 10px;
`;

export const MyPagePointDateText = styled.p`
  margin: 0px 10px;
  font-size: 16px;
`;

export const MyPagePointMaker = styled.p`
  margin: 0px 10px;
  font-weight: 0px;
  font-size: 24px;
  color: ${likeCountColor};
`;
