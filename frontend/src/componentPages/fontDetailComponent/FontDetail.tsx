import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from './FontDetail.module.css';

// components
import RangeSlider from '../../common/fontRangeSlider/RangeSlider';

// icons
import { FaRegBookmark } from 'react-icons/fa'; // 폰트 찜 before
// import { FaBookmark } from 'react-icons/fa'; // 폰트 찜 after
import { FaRegCopy } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

const FontDetail: React.FC = () => {
  const { state } = useLocation();
  const font = state as { id: string; title: string; maker: string; content: string };

  return (
    <>
      <div className={classes.topContainer}>
        {/* 폰트 이름 */}
        <div className={classes.title}>{font.title}</div>
        {/* 폰트 찜 */}
        <div className={classes.dibContainer}>
          <FaRegBookmark className={classes.bookIcon} />
          {/* 폰트 찜 수 */}
          <div className={classes.dibCount}>10</div>
        </div>
      </div>

      <div className={classes.subContainer}>
        <div className={classes.makerContainer}>
          <p>
            <strong>제작 </strong>
            {font.maker}
          </p>
          <p>
            <strong>조회수 </strong>224K
          </p>
          <p>
            <strong>형태 </strong>네모네모 | 가지런한 | 어른같은
          </p>
        </div>

        <div className={classes.buyContainer}>
          <div className={classes.cart}>장바구니</div>
          <div className={classes.buy}>바로 구매</div>
        </div>
      </div>

      <div className={classes.subContainer}>
        <div className={classes.intro}>
          <span>폰트 소개</span>
          <div className={classes.introBox} style={{ width: '40vw' }}>
            안녕하세요. {font.maker} 님이 만든 {font.title} 입니다. {'\n'}
            많이 사용해주세요. :)
          </div>
        </div>
        <div>
          <div className={classes.titleContainer}>
            <span>웹 폰트로 사용하기</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaRegCopy size={25} color="#484848" />
              복사하기
            </div>
          </div>

          <div className={classes.introBox} style={{ width: '35vw' }}>
            @font-face
          </div>
        </div>
      </div>

      <div className={classes.fontContainer}>
        <span>폰트 미리보기</span>
        <hr />
        {/* 폰트 체험 */}
        <div className={classes.testContainer}>
          <div className={classes.typingBar}>
            <input
              placeholder="예시 문구 적기"
              // 폰트 체험 로직 구현 필요
            ></input>
            <FaPen />
          </div>
          {/* 폰트 크기 조절 바 */}
          <RangeSlider />
        </div>
      </div>

      {/* 라이선스 */}

      {/* 폰트 활용 후기 - 컴포넌트 만들기 */}
    </>
  );
};
export default FontDetail;
