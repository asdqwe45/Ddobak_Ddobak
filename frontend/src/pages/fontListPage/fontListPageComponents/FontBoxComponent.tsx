import React from "react"
import classes from "./FontBoxComponent.module.css"
import { useNavigate } from 'react-router-dom';

// 폰트 찜 before
import { FaRegBookmark } from 'react-icons/fa';
// 폰트 찜 after
// import { FaBookmark } from 'react-icons/fa';

interface FontBoxProps {
  id?: string;
  title?: string;
  maker?: string;
  content?: string;
}

const FontBoxComponent: React.FC<FontBoxProps> = (props) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate(`/font/${props.id}`, {
      // state 객체 전달
      state: {
        id: props.id,
        title: props.title,
        maker: props.maker,
        content: props.content
      }
    });
  };
  
  return (
    <>
      <div className={classes.container} onClick={handleBoxClick}>
        <div className={classes.header}>
          <div className={classes.title}>{props.title}</div>
          {/* 폰트 찜 before */}
          <FaRegBookmark className={classes.bookIcon} />
          {/* 폰트 찜 after */}
          {/* <FaBookmark className={classes.bookIcon} /> */}
        </div>
        <div className={classes.fontMaker}>{props.maker}</div>
        {/* box 중앙 선 */}
        <div className={classes.borderTop}></div>
        <div className={classes.content}>
          {props.content}
        </div>
      </div>
    </>
  );
};
export default FontBoxComponent;
