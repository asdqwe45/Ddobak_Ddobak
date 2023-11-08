import React from 'react';
import classes from './MainFontBox.module.css';
import { useNavigate } from 'react-router-dom';

// icons
import { FaRegBookmark } from 'react-icons/fa';

interface FontBoxProps {
  id: string;
  title: string;
  maker: string;
  dib: boolean;
}

const MainFontBox: React.FC<FontBoxProps> = ({ id, title, maker, dib }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/font/${id}`, {
      // state 객체 전달
      state: {
        id,
        title,
        maker,
        dib
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

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title} onClick={handleTitleClick}>
            <span> {title} </span>
          </div>
            <FaRegBookmark className={classes.bookIcon} />
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
