import classes from './MakerPage.module.css';
import {
  MakerTopBox,
  MakerBottomBox,
  MakerName,
  MakerSmallBox,
  MakerComment,
  MakerLikeCount,
  MakerBottomHeaderBox,
  MakerBottomHeaderText,
  MakerFontLargeBox,
  MakerFontSmallBox,
  MakerFontNameText,
  MakerFontCommentText,
  MakerCommemtBox,
} from './makerPageComponents/MakerPageComponents';
import { FaHeart } from 'react-icons/fa';
// 빈 하트 FaRegHeart
import { FaCircleUser } from 'react-icons/fa6';
import { borderColor } from 'common/colors/CommonColors';

const MakerPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <MakerTopBox>
        <MakerSmallBox>
          <FaCircleUser size={80} color={borderColor} />
          <MakerCommemtBox>
            <MakerName>김싸피</MakerName>
          </MakerCommemtBox>
          <MakerComment>안녕하세요. 김싸피입니다.</MakerComment>
        </MakerSmallBox>
        <MakerSmallBox>
          <FaHeart size={40} color={'#d71718'} />
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
            <MakerCommemtBox>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
            </MakerCommemtBox>

            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
          {/* small box */}
          <MakerFontSmallBox>
            <MakerCommemtBox>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
            </MakerCommemtBox>
            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
          <MakerFontSmallBox>
            <MakerCommemtBox>
              <MakerFontNameText>또박또박_테스트체</MakerFontNameText>
            </MakerCommemtBox>
            <MakerFontCommentText>다람쥐 헌 쳇바퀴 타고파</MakerFontCommentText>
          </MakerFontSmallBox>
        </MakerFontLargeBox>
      </MakerBottomBox>
    </div>
  );
};
export default MakerPage;
