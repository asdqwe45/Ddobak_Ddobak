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

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from 'https/http';

// API로부터 받아올 폰트 데이터의 타입을 정의
// type Font = {
//   fontFileUrl: string;
//   fontId: string;
//   introduceContext: string;
//   keywords: string[];
//   producerName: string;
//   fontName: string;
// };

const MakerPage: React.FC = () => {
  const { producerId } = useParams();
  // const [fontMaker, setFontMaker] = useState<Font | null>(null);

  // 컴포넌트 마운트시 API 호출
  useEffect(() => {
    // 라우트에서 폰트 ID 가져오기
    if (producerId) {
      fetchFontMaker(producerId); // 폰트 ID로 폰트 정보를 불러오는 함수 호출
    }
  }, [producerId]);

  // 폰트 데이터를 가져오는 함수
  const fetchFontMaker = async (producerId: string) => {
    try {
      const response = await axiosWithAuth.get(`/font/maker/${producerId}`).then((r) => {
        return r;
      });
      if (response.data) {
        console.log('API로부터 받은 데이터:', response.data);
        // setFontMaker(response.data); // 받아온 폰트 정보로 상태 업데이트
      } else {
        console.log('API 응답에 fonts 프로퍼티가 없습니다.', response.data);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

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
