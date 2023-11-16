import React, { useState } from 'react';
import classes from './MainFontBox.module.css';
import { useNavigate } from 'react-router-dom';
import { dibAddAPI, dibRemoveAPI } from 'https/utils/FavoriteFunction';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import pointCoin from '../../../fontListPage/fontListPageAssets/point.png';

import { getData } from 'https/http';
import AlertCustomModal from 'common/modals/alertCustomModal/AlertCustomModal';
import { useDispatch } from 'react-redux';
import { refreshActions } from 'store/refreshSlice';

import styled from '@emotion/styled';

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
const MainFontBox: React.FC<FontBoxProps> = ({
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
  const dispatch = useDispatch();
  const handleLoginAlert = () => {
    setShowAlertModal(true); //
  };
  const dibToggle = async (dib: boolean, fontId: string) => {
    const token = await getData('accessToken');
    if (!token) {
      handleLoginAlert();
      return;
    }
    if (dib) {
      dibRemoveAPI(fontId)
        .then(async (r) => {
          dispatch(refreshActions.mainPlus());
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      dibAddAPI(fontId)
        .then((r) => {
          dispatch(refreshActions.mainPlus());
        })
        .catch((e) => {
          console.error(e);
        });
    }
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

  const nameFormatFC = (fontName: string) => {
    if (fontName.length > 10) {
      return fontName.substring(0, 7) + ' ...';
    }
    return fontName;
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title} onClick={handleTitleClick}>
            <CustomTextStyle
              style={{ paddingRight: 10 }}
              title={title}
              fontFamily={title}
              fontSrc={font_file_url}
            >
              <span> {nameFormatFC(title)} </span>
            </CustomTextStyle>
          </div>
          {dib ? (
            <FaBookmark
              className={classes.bookIcon}
              onClick={() => {
                dibToggle(dib, font_id);
              }}
            />
          ) : (
            <FaRegBookmark
              className={classes.bookIcon}
              onClick={() => {
                dibToggle(dib, font_id);
              }}
            />
          )}
        </div>
        <div className={classes.fontMaker} onClick={handleMakerClick}>
          <span> {maker} </span>
          {price !== 0 && (
            <img src={pointCoin} alt="유료" title="유료" className={classes.coinIcon} />
          )}
        </div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content} onClick={handleTitleClick}>
          <CustomTextStyle fontFamily={title} fontSrc={font_file_url}>
            <span>세상에 내 글씨가 font가 되다니!</span>
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
export default MainFontBox;
