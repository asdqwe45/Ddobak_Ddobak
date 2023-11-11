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
import { FaPencil } from 'react-icons/fa6';
// 빈 하트 FaRegHeart
import { FaCircleUser } from 'react-icons/fa6';
import { borderColor } from 'common/colors/CommonColors';
import { useEffect, useState } from 'react';
import { getData } from 'https/http';
import { useDispatch } from 'react-redux';
import { changeMakerIntroModalActions } from 'store/changeMakerIntroSlice';

const MakerPage: React.FC = () => {
  const dispatch = useDispatch();
  const [myToken, setMyToken] = useState<string>('');

  useEffect(() => {
    async function fetch() {
      const currentToken = await getData('accessToken');
      setMyToken(currentToken);
    }

    fetch();
  });

  return (
    <div className={classes.container}>
      <MakerTopBox>
        <MakerSmallBox>
          <FaCircleUser size={80} color={borderColor} />
          <div className={classes.pr}>
            <MakerName>김싸피</MakerName>
            <div className={classes.pencil}>
              {myToken ? (
                <FaPencil
                  className={classes.pencilText}
                  size={30}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(changeMakerIntroModalActions.toggle());
                  }}
                />
              ) : null}
            </div>
          </div>
        </MakerSmallBox>
        <div className={classes.prCentered}>
          <MakerSmallBox>
            <MakerComment>안녕하세요. 김싸피입니다.</MakerComment>
          </MakerSmallBox>
        </div>
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
