import styled from '@emotion/styled';
import { mainRedColor, likeCountColor, bolderColor } from 'common/colors/CommonColors';

// const newInput = styled(가져올 변수이름)``
export const IngredientBox = styled.div`
  height: 100%;
  width: 50%;
`;
export const IngredientContent = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid ${bolderColor};
  border-radius: 10px;
  display: flex;
`;
// profile
export const ProfileBox = styled(IngredientBox)`
  padding: 0px 20px;
`;
export const ProfilImgBox = styled.div`
  height: 100%;
  aspect-ratio: 1;
  padding: 20px;
  box-sizing: border-box; /* 이 줄을 추가합니다. */
`;

export const ProfileContent = styled.div`
  height: 100%;
  padding: 20px;
  box-sizing: border-box; /* 이 줄을 추가합니다. */
`;
export const ProfilNameBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileName = styled.h1`
  margin: 5px;
  font-size: 40px;
  font-weight: bold;
`;

export const ChangePassword = styled.p`
  margin: 0px;
  font-size: 30px;
  &:hover {
    opacity: 0.6;
    font-weight: bold;
    cursor: pointer;
  }
`;

// 포인트 박스
export const PointBox = styled(IngredientBox)`
  padding: 0px 20px;
  display: flex;
`;
export const PointIngredient = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const PointHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  box-sizing: border-box;
`;
export const PointHeaderText = styled.p`
  margin: 0px;
  font-size: 30px;
`;

export const PointBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PointBtnIngredient = styled.button`
  height: 40px;
  width: 150px;
  margin: 10px;
  border-radius: 10px;
  font-size: 20px;
  border: 0px;
  color: white;
  margin-bottom: 0px;
  &:hover {
    // 이 부분이 hover 상태일 때 적용될 스타일입니다.
    cursor: pointer; // 마우스 커서를 포인터로 변경합니다.
    opacity: 0.7; // 불투명도를 조정하여 버튼이 약간 투명해지도록 합니다.
  }
`;
export const PointTransactionBtn = styled(PointBtnIngredient)`
  background-color: ${likeCountColor};
`;
export const PointExchangeBtn = styled(PointBtnIngredient)`
  background-color: ${mainRedColor};
`;

// content components
// 핵심 콘텐트
export const MyPageContent = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
  border: 2px solid ${bolderColor};
  display: flex;
`;
// 선택 상자
export const SelectBox = styled.div`
  width: 28%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 0px;
  padding-right: 40px;
  border-right: 2px solid ${bolderColor};
`;

export const SelectBtn = styled.button`
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0px;
  aspect-ratio: 4/1;
  border-radius: 15px;
  border: 2px solid ${mainRedColor};
  background-color: white;
  font-size: 24px;
  box-shadow: 5px 5px 0px ${mainRedColor};
  &:hover {
    opacity: 0.7;
    cursor: pointer;
    background-color: ${mainRedColor};
    color: white;
    font-weight: bold;
  }
`;

export const SelectDisabled = styled.button`
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0px;
  aspect-ratio: 4/1;
  border-radius: 15px;
  border: 2px solid ${mainRedColor};
  background-color: ${mainRedColor};
  font-size: 24px;
  color: white;
  box-shadow: 1px 1px 0px #b6b6b6;
  font-weight: bold;
`;

// 콘텐트
export const ContentLargeBox = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
`;

export const ContentIngredient = styled.div`
  width: 100%;
  aspect-ratio: 6/1;
  box-sizing: border-box;
  padding: 20px 40px;
  border-radius: 15px;
  border: 2px solid ${bolderColor};
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const ContentInnerLeft = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContentInnerTextBox = styled.div``;
export const ContentHeader = styled.div`
  display: flex;
  margin: 10px 0px;
  align-items: center;
`;
export const ContentInnerHeaderText = styled.h1`
  margin: 0px;
  font-size: 32px;
  padding-right: 20px;
`;

export const ContentProducerName = styled.p`
  margin: 0px;
  font-size: 32px;
`;

export const ContentInnerContentText = styled.p`
  font-size: 32px;
  margin: 0px;
`;

export const ContentInnerRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContentBtnIngredient = styled.button`
  height: 45%;
  aspect-ratio: 15/4;
  border-radius: 10px;
  font-size: 20px;
  border: 0px;
  color: white;
  margin-bottom: 0px;
  font-weight: bold;
`;
export const ContentGrayDisabled = styled(ContentBtnIngredient)`
  background-color: ${likeCountColor};
`;

export const ContentRedBtn = styled(ContentBtnIngredient)`
  background-color: ${mainRedColor};
  &:hover {
    // 이 부분이 hover 상태일 때 적용될 스타일입니다.
    cursor: pointer; // 마우스 커서를 포인터로 변경합니다.
    opacity: 0.7; // 불투명도를 조정하여 버튼이 약간 투명해지도록 합니다.
  }
`;

export const ContentGrayBtn = styled(ContentBtnIngredient)`
  background-color: ${likeCountColor};
  height: 80%;
  &:hover {
    // 이 부분이 hover 상태일 때 적용될 스타일입니다.
    cursor: pointer; // 마우스 커서를 포인터로 변경합니다.
    opacity: 0.7; // 불투명도를 조정하여 버튼이 약간 투명해지도록 합니다.
  }
`;

// 아이콘
export const ContentIconsBox = styled.div`
  box-sizing: border-box;
  height: 100%;
  aspect-ratio: 1;
  padding: 30px 20px;
  padding-left: 0px;
`;

// 장바구니
export const FontBasketTopBox = styled.div`
  position: sticky;
  top: -40px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const FontBasketBottomBox = styled.div`
  position: sticky;
  bottom: -40px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const SelectListDelete = styled(ContentInnerContentText)`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: ${mainRedColor};
  }
`;

// 구매한 폰트
export const CCLBox = styled(ContentBtnIngredient)`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CCLIcons = styled.img`
  margin: 0px 2px;
  height: 80%;
`;

//  찜한 제작자
export const LikeIconBox = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
`;

export const LikeProducerBox = styled.div`
  width: 100%;
  aspect-ratio: 4/1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;
export const LikeBoxText = styled.p`
  margin: 0px;
  font-size: 30px;
  font-weight: bold;
`;
