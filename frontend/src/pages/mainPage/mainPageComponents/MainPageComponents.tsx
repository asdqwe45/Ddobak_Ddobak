import styled from '@emotion/styled';
import { borderColor, likeCountColor } from 'common/colors/CommonColors';

export const MainLargePage = styled.div`
  width: 100%;
  height: 90vh;
`;

export const MainFooter = styled.div`
  height: 220px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
`;

export const MainFooterBetween = styled.div`
  padding-top: 20px;
  height: 100% -20px;
  width: 100%;
`;

export const MainFooterBetweenInnerBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${borderColor};
`;

export const MainFooterMiddle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100% + 20px;
  width: 100%;
`;

export const MainFooterHeader = styled.p`
  margin: 0px;
  color: ${likeCountColor};
  font-size: 24px;
  font-weight: bold;
`;

interface MainFooterTextType {
  screenWidth: number;
}

export const MainFooterText = styled.pre<MainFooterTextType>`
  display: ${(props) => (props.screenWidth < 680 ? 'none' : 'block')};
  margin: 0px;
  color: ${likeCountColor};
  font-size: 20px;
  padding-top: 10px;
`;

export const MainFooterHeaderText1 = styled.p`
  margin: 0px;
  font-size: 16px;
  padding: 10px 0px;
`;
export const MainFooterHeaderText2 = styled.p`
  margin: 0px;
  font-size: 16px;
  padding-bottom: 10px;
`;
