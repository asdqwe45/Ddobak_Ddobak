import React, { useState } from 'react';
import classes from './FontBoxComponent.module.css';
import { useNavigate } from 'react-router-dom';

// icons
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

interface FontBoxProps {
  id?: string;
  title?: string;
  maker?: string;
  content?: string;
}

const FontBoxComponent: React.FC<FontBoxProps> = (props) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/font/${props.id}`, {
      // state 객체 전달
      state: {
        id: props.id,
        title: props.title,
        maker: props.maker,
        content: props.content,
      },
    });
  };

  const handleMakerClick = () => {
    navigate(`/maker`, {
      // state 객체 전달
      state: {
        id: props.id,
        title: props.title,
        maker: props.maker,
        content: props.content,
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
            <span> {props.title} </span>
          </div>
          {isClicked ? (
            <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />
          ) : (
            <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
          )}
        </div>
        <div className={classes.fontMaker} onClick={handleMakerClick}>
          <span> {props.maker} </span>
        </div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content} onClick={handleTitleClick}>
          <span> {props.content} </span>
        </div>
      </div>
    </>
  );
};
export default FontBoxComponent;
