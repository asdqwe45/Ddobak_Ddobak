import styled from '@emotion/styled';
import { borderColor, likeCountColor } from '../../../common/colors/CommonColors';

export const MakerTopBox = styled.div`
  height: 110px;
  border: 1px solid ${borderColor};
  border-radius: 15px;
  padding: 30px 60px 30px 60px; // 상 우 하 좌
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MakerName = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const MakerCommemtBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid ${borderColor};
`;

export const MakerComment = styled.p`
  margin: 0px;
  font-size: 30px;
  padding: 0px 10px;
  height: 150px;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MakerSmallBox = styled.div`
  display: flex;
  align-items: center;
`;

export const MakerLikeCount = styled.p`
  font-size: 28px;
  font-weight: bold;
  padding: 0px 20px;
  width: 20px;
  color: ${likeCountColor};
`;

export const MakerBottomBox = styled.div`
  margin-top: 20px;
  height: 410px;
  border: 1px solid ${borderColor};
  border-radius: 15px;
  padding: 30px 60px 30px 60px; // 상 우 하 좌
`;

export const MakerBottomHeaderBox = styled.div`
  border-bottom: 1px solid ${borderColor};
  height: 60px;
  align-items: center;
  margin-bottom: 40px;
`;

export const MakerBottomHeaderText = styled.p`
  margin: 0px;
  font-size: 30px;
`;

export const MakerFontLargeBox = styled.div`
  height: 300px;
  overflow: auto;
  padding: 5px 40px 5px 5px;
`;

export const MakerFontSmallBox = styled.div`
  height: 84px;
  border: 1px solid ${borderColor};
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 2px 2px ${borderColor};
  padding: 25px 40px 25px 40px; // 상 우 하 좌
  display: flex; /* flex 컨테이너로 설정 */
  align-items: center;
`;

export const MakerFontNameText = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin-right: 20px;
`;

export const MakerFontCommentText = styled.div`
  font-size: 40px;
  font-weight: 0;
  padding-left: 20px;
`;
