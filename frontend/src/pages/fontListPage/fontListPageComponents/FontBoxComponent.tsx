import React, { useState, useEffect } from 'react';
import classes from './FontBoxComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { axiosWithAuth } from 'https/http';
import { axiosWithFormData } from 'https/http';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

type Font = {
  dibCheck: boolean;
}

interface FontBoxProps {
  id: string;
  title: string;
  maker: string;
  dib: boolean;
}

const FontBoxComponent: React.FC<FontBoxProps> = ({ id, title, maker, dib }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/font/${id}`, {
      // state 객체 전달
      state: { id, title, maker, dib },
    });
  };

  const handleMakerClick = () => {
    navigate(`/maker`, {
      // state 객체 전달
      state: { id, title, maker },
    });
  };

  const [fontDetail, setFontDetail] = useState<Font | null>(null);
  useEffect(() => {
    // 라우트에서 폰트 ID 가져오기
    if (id) {
      fetchFontDetails(id); // 폰트 ID로 폰트 정보를 불러오는 함수 호출
    }
  }, [id]);

  // 폰트 데이터를 가져오는 함수
  const fetchFontDetails = async (id: string) => {
    try {
      const response = await axiosWithAuth.get(`/font/detail/${id}`)
        .then((r) => { return r });
      if (response.data) {
        // console.log("API로부터 받은 데이터:", response.data);
        setFontDetail(response.data); // 받아온 폰트 정보로 상태 업데이트
      } else {
        console.log("API 응답에 fonts 프로퍼티가 없습니다.", response.data);
      }
    } catch (error) {
      console.error('API 호출 에러:', error); // 에러 로깅 개선
    }
  };
 // 책갈피 찜하기
 const [dibCheck, setDibCheck] = useState<boolean>(false);

 // 컴포넌트가 마운트될 때 API에서 가져온 폰트 정보로 상태를 초기화합니다.
 useEffect(() => {
   if (fontDetail) {
     setDibCheck(fontDetail.dibCheck);
   }
 }, [fontDetail]);

 // 찜 상태를 백엔드에 업데이트하는 비동기 함수
 const updateDibStatus = async (newDibCheck: boolean) => {
   try {
     if (newDibCheck) {
       // 찜 추가
       const formData = new FormData();
       formData.append('dibCheck', JSON.stringify(newDibCheck));
       const response = await axiosWithFormData.post(`/favorite/${id}`, formData);
       console.log('서버 응답:', response.data);
     } else {
       // 찜 제거
       const response = await axiosWithAuth.delete(`/favorite/${id}`);
       console.log('서버 응답:', response.data);
     }
   } catch (error) {
     console.error('찜 처리 중 오류 발생:', error);
   }
 };

 const handleIconClick = async () => {
   const newDibCheck = !dibCheck; // 찜 상태 반전
 
   // 로컬 상태를 먼저 업데이트
   setDibCheck(newDibCheck);

   if (id) { // fontId가 존재하면
     try {
       // 백엔드에 찜 상태 업데이트 요청
       await updateDibStatus(newDibCheck);
       console.log('찜 상태 업데이트 성공');
     } catch (error) {
       console.error('찜 상태 업데이트 실패:', error);
     }
   } else {
     console.error('fontId가 정의되지 않았습니다.');
   }
 };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title} onClick={handleTitleClick}>
            <span> {title} </span>
          </div>
          {dibCheck ? (
            <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />
          ) : (
            <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
          )}
        </div>
        <div className={classes.fontMaker} onClick={handleMakerClick}>
          <span> {maker} </span>
        </div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content} onClick={handleTitleClick}>
          {/* <span> {content} </span> */}
          <span>다람쥐 헌 쳇바퀴에 타고파</span>
        </div>
      </div>
    </>
  );
};
export default FontBoxComponent;
