import React from 'react';
import classes from './MainFontBox.module.css';
import { useNavigate } from 'react-router-dom';
import { dibAddAPI, dibRemoveAPI } from 'https/utils/FavoriteFunction';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import { getData } from 'https/http';

interface FontBoxProps {
  id: string;
  title: string;
  maker: string;
  dib: boolean;
}

const MainFontBox: React.FC<FontBoxProps> = ({ id, title, maker, dib }) => {
  const navigate = useNavigate();

  const dibToggle = async (dib: boolean, fontId: string) => {
    if (dib) {
      dibRemoveAPI(fontId)
        .then(async (r) => {
          window.location.reload();
          console.log(r);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      dibAddAPI(fontId)
        .then((r) => {
          window.location.reload();
          console.log(r);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const handleTitleClick = async () => {
    const token = await getData('accessToken');
    if (token) {
      navigate(`/font/${id}`, {
        // state 객체 전달
        state: {
          id,
          title,
          maker,
          dib,
        },
      });
    } else {
      alert('로그인 해주세요');
    }
  };

  const handleMakerClick = async () => {
    const token = await getData('accessToken');
    if (token) {
      navigate(`/maker/${maker}`, {
        // state 객체 전달
        state: {
          id,
          title,
          maker,
        },
      });
    } else {
      alert('로그인 해주세요');
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title} onClick={handleTitleClick}>
            <span> {title} </span>
          </div>
          {dib ? (
            <FaBookmark
              className={classes.bookIcon}
              onClick={() => {
                dibToggle(dib, id);
              }}
            />
          ) : (
            <FaRegBookmark
              className={classes.bookIcon}
              onClick={() => {
                dibToggle(dib, id);
              }}
            />
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
export default MainFontBox;