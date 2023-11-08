import React, { useState } from 'react';
import classes from './FontBoxComponent.module.css';
import { useNavigate } from 'react-router-dom';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

interface FontBoxProps {
  id: string;
  title: string;
  maker: string;
}

const FontBoxComponent: React.FC<FontBoxProps> = ({ id, title, maker }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/font/${id}`, {
      // state 객체 전달
      state: {
        id,
        title,
        maker,
      },
    });
  };

  const handleMakerClick = () => {
    navigate(`/maker`, {
      // state 객체 전달
      state: {
        id,
        title,
        maker,
      },
    });
  };
  // 책갈피 찜하기
  const [isClicked, setIsClicked] = useState(false);

  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title} onClick={handleTitleClick}>
            <span> {title} </span>
          </div>
          {isClicked ? (
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
