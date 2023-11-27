import React, { useState, useEffect, CSSProperties } from 'react';
import classes from './DibBtn.module.css';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

interface DibBtnsProps {
  dib: boolean; // 부모 컴포넌트로부터 받은 좋아요 상태
  onDibClick: () => void; // 클릭 이벤트를 부모 컴포넌트에 전달하기 위한 함수
  style?: CSSProperties;
}

const DibBtn: React.FC<DibBtnsProps> = ({ dib, onDibClick, style }) => {
  // 부모 컴포넌트로부터 받은 dib 상태로 초기값을 설정합니다.
  const [isClicked, setIsClicked] = useState(dib);

  // 부모 컴포넌트의 dib 상태가 변경되었을 때 내부 상태를 동기화합니다.
  useEffect(() => {
    setIsClicked(dib);
  }, [dib]);

  const handleIconClick = () => {
    // 내부 상태를 토글하고 부모 컴포넌트에 변경을 알립니다.
    setIsClicked(!isClicked);
    onDibClick(); // 부모 컴포넌트의 함수를 호출하여 상태 변경을 알립니다.
  };

  return (
    <div style={style} onClick={onDibClick}>
      {dib ? (
        <FaBookmark className={classes.bookIcon} onClick={handleIconClick} />
      ) : (
        <FaRegBookmark className={classes.bookIcon} onClick={handleIconClick} />
      )}
    </div>
  );
};

export default DibBtn;
