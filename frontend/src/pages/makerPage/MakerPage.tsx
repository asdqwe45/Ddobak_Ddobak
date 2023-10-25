import classes from './MakerPage.module.css';
import {
  MakerTopBox,
  MakerBottomBox,
  MakerName,
  MakerSmallBox,
  MakerBar,
  MakerComment,
  MakerLikeCount,
  MakerBottomHeaderBox,
  MakerBottomHeaderText,
  MakerFontLargeBox,
  MakerFontSmallBox,
  MakerFontNameText,
  MakerFontMakerText,
  MakerFontCommentText,
  MakerSmallBoxHeader,
  MakerFontMakerBar,
} from './makerPageComponents/MakerPageComponents';
import { FcLike } from 'react-icons/fc';
import { FaCircleUser } from 'react-icons/fa6';
import { bolderColor } from 'common/colors/CommonColors';

const MakerPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <MakerTopBox>
        <MakerSmallBox>
          <FaCircleUser size={90} color={bolderColor} />
          <MakerName>김싸피</MakerName>
          <MakerBar>|</MakerBar>
          <MakerComment>안녕하세요. 김싸피입니다.</MakerComment>
        </MakerSmallBox>
        <MakerSmallBox>
          <FcLike size={60} />
          <MakerLikeCount>10</MakerLikeCount>
        </MakerSmallBox>
      </MakerTopBox>
      {/* 상하 구분 */}
      <MakerBottomBox>
        <MakerBottomHeaderBox>
          <MakerBottomHeaderText>김싸피 님이 만든 폰트</MakerBottomHeaderText>
        </MakerBottomHeaderBox>
        <MakerFontLargeBox>
          <MakerFontSmallBox>
            <MakerSmallBoxHeader>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
              <MakerFontMakerBar>|</MakerFontMakerBar>
              <MakerFontMakerText>이태성</MakerFontMakerText>
            </MakerSmallBoxHeader>
            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
          {/* small box */}
          <MakerFontSmallBox>
            <MakerSmallBoxHeader>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
              <MakerFontMakerBar>|</MakerFontMakerBar>
              <MakerFontMakerText>이태성</MakerFontMakerText>
            </MakerSmallBoxHeader>
            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
          <MakerFontSmallBox>
            <MakerSmallBoxHeader>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
              <MakerFontMakerBar>|</MakerFontMakerBar>
              <MakerFontMakerText>이태성</MakerFontMakerText>
            </MakerSmallBoxHeader>
            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
        </MakerFontLargeBox>
      </MakerBottomBox>
    </div>
  );
};
export default MakerPage;
