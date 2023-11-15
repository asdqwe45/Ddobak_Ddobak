import React, { useState, useEffect } from 'react';
import classes from './FontBoxComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { axiosWithAuth, axiosWithFormData, getData } from 'https/http';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
// import { RiCoinLine } from 'react-icons/ri';
import pointCoin from '../fontListPageAssets/point.png';

import AlertCustomModal from 'common/modals/alertCustomModal/AlertCustomModal';
import styled from '@emotion/styled';

type Font = {
  dibCheck: boolean;
};

interface FontBoxProps {
  font_id: string;
  title: string;
  producer_id: string;
  maker: string;
  dib: boolean;
  price: number;
  font_file_url: string;
}
type CustomTextStyleType = {
  fontFamily: string;
  fontSrc: string;
};

const CustomTextStyle = styled.span<CustomTextStyleType>`
  @font-face {
    font-family: ${(props) => props.fontFamily};
    src: url(${(props) => props.fontSrc});
  }

  font-family: ${(props) => props.fontFamily};
`;


const FontBoxComponent: React.FC<FontBoxProps> = ({
  font_id,
  title,
  producer_id,
  maker,
  dib,
  price,
  font_file_url,
}) => {
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleLoginAlert = () => {
    setShowAlertModal(true); //
  };

  const handleTitleClick = async () => {
    const token = await getData('accessToken');
    if (token) {
      navigate(`/font/${font_id}`, {
        // state 객체 전달
        state: {
          font_id,
          title,
          maker,
          dib,
          font_file_url,
        },
      });
    } else {
      handleLoginAlert();
    }
  };

  const handleMakerClick = async () => {
    const token = await getData('accessToken');
    if (token) {
      navigate(`/maker/${maker}/${producer_id}`, {
        // state 객체 전달
        state: {
          producer_id,
          title,
          maker,
        },
      });
    } else {
      handleLoginAlert();
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const [fontDetail, setFontDetail] = useState<Font | null>(null);
  useEffect(() => {
    // 라우트에서 폰트 ID 가져오기
    const fetchNoAuth = async () => {
      const token = await getData('accessToken');
      if (token) {
        if (font_id) {
          fetchFontDetails(font_id); // 폰트 ID로 폰트 정보를 불러오는 함수 호출
        }
      }
    };

    fetchNoAuth();
  }, [font_id]);

  // 폰트 데이터를 가져오는 함수
  const fetchFontDetails = async (font_id: string) => {
    try {
      const response = await axiosWithAuth.get(`/font/detail/${font_id}`).then((r) => {
        return r;
      });
      if (response.data) {
        // console.log("API로부터 받은 데이터:", response.data);
        setFontDetail(response.data); // 받아온 폰트 정보로 상태 업데이트
      } else {
        console.log('API 응답에 fonts 프로퍼티가 없습니다.', response.data);
      }
    } catch (error) {
      console.error('API 호출 에러:', error); // 에러 로깅 개선
    }
  };
  // 책갈피 찜하기
  const [dibCheck, setDibCheck] = useState<boolean>(false);

  // 컴포넌트가 마운트될 때 API에서 가져온 폰트 정보로 상태를 초기화합니다.
  useEffect(() => {
    const fetchNoAuth = async () => {
      const token = await getData('accessToken');
      if (token) {
        if (fontDetail) {
          setDibCheck(fontDetail.dibCheck);
        }
      }
    };

    fetchNoAuth();
  }, [fontDetail]);

  // 찜 상태를 백엔드에 업데이트하는 비동기 함수
  const updateDibStatus = async (newDibCheck: boolean) => {
    try {
      if (newDibCheck) {
        // 찜 추가
        const formData = new FormData();
        formData.append('dibCheck', JSON.stringify(newDibCheck));
        const response = await axiosWithFormData.post(`/favorite/${font_id}`, formData);
        console.log('서버 응답:', response.data);
      } else {
        // 찜 제거
        const response = await axiosWithAuth.delete(`/favorite/${font_id}`);
        console.log('서버 응답:', response.data);
      }
    } catch (error) {
      console.error('찜 처리 중 오류 발생:', error);
    }
  };

  const handleIconClick = async () => {
    const token = await getData('accessToken');
    if (!token) {
      return handleLoginAlert();
    }
    const newDibCheck = !dibCheck; // 찜 상태 반전

    // 로컬 상태를 먼저 업데이트
    setDibCheck(newDibCheck);

    if (font_id) {
      // fontId가 존재하면
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
          {/* {price !== 0 && <RiCoinLine className={classes.coinIcon} title="유료" />}  */}
          {price !== 0 && (
            <img src={pointCoin} alt="유료" title="유료" className={classes.coinIcon} />
          )}
        </div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content} onClick={handleTitleClick}>
          <CustomTextStyle fontFamily={title} fontSrc={font_file_url}>
            <span>세상에 내가 쓴 글씨가 폰트가 되다니</span>
          </CustomTextStyle>
        </div>
      </div>
      <AlertCustomModal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        onMove={navigateToLogin}
        message1="로그인이 필요한 서비스입니다."
        message2=""
        btnName="로그인 하러가기"
      />
    </>
  );
};
export default FontBoxComponent;
