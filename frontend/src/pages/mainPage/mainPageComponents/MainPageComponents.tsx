import styled from '@emotion/styled';
import { bolderColor, likeCountColor } from 'common/colors/CommonColors';

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
  border-top: 4px solid ${bolderColor};
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

export const MainFooterText = styled.p`
  margin: 0px;
  color: ${likeCountColor};
  font-size: 16px;
  padding-top: 10px;
`;
