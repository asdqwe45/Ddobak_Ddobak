import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from './FontDetail.module.css'

// 폰트 찜 before
import { FaRegBookmark } from 'react-icons/fa';
// 폰트 찜 after
// import { FaBookmark } from 'react-icons/fa';


const FontDetail: React.FC = () => {
  const { state } = useLocation();
  const font = state as { id: string, title: string, maker: string, content: string };

  return (
    <>
      <div className={classes.topContainer}>
        {/* 폰트 이름 */}
        <div className={classes.title}>{font.title}</div>

        {/* 폰트 찜 */}
        <div className={classes.dibContainer}>
          <FaRegBookmark className={classes.bookIcon} />
          {/* 폰트 찜 수 */}
          <div className={classes.dibCount} >10</div>
        </div>
      </div>

      {/* 제작, 조회수 */}
      <div className={classes.makerContainer}>
        <p><strong>제작 </strong>{font.maker}</p>
        <p><strong>조회수 </strong>224K</p>
      </div>

      {/* 제작자 소개 */}
      <div className={classes.introBox}>
        안녕하세요. {font.maker} 님이 만든 {font.title} 입니다. {'\n'}
        많이 사용해주세요. :)
      </div>

      {/* 키워드 리스트 */}


      {/* 장바구니, 바로 구매 */}


    </>
  )
}
export default FontDetail