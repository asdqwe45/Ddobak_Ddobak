import classes from './MainPageGuide.module.css';
import uploadPC from '../mainPageAssets/uploadPC.png';
import payment from '../mainPageAssets/payment.png';
import { FaCircleChevronRight } from 'react-icons/fa6';
import { mainRedColor } from 'common/colors/CommonColors';
const MainPageGuide: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerTextBox}>
          <p className={classes.headerText}>또박또박 사용법</p>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.contentBox}>
          <div className={classes.ingredientBox}>
            <div className={classes.contentImgBox}>
              <div className={classes.aspectImg}>
                <img src={uploadPC} alt="" className={classes.contentImg} />
              </div>
            </div>
            <div className={classes.contentTextBox}>
              <p className={classes.contentHeader}>1. 작성하기</p>
              <p className={classes.contentText}>
                가이드라인을 다운받아
                <br />
                손글씨를 작성합니다.
              </p>
              <div className={classes.btnBox}>
                <button className={classes.downloadBtn}>가이드라인 다운로드</button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.nextBox}>
          <FaCircleChevronRight size={50} color={mainRedColor} />
        </div>
        <div className={classes.contentBox}>
          <div className={classes.ingredientBox}>
            <div className={classes.contentImgBox}>
              <div className={classes.aspectImg}>
                <img src={uploadPC} alt="" className={classes.contentImg} />
              </div>
            </div>
            <div className={classes.contentTextBox}>
              <p className={classes.contentHeader}>2. 등록하기</p>
              <p className={classes.contentText}>
                손글씨를 촬영하고
                <br />
                사진을 업로드합니다.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.nextBox}>
          <FaCircleChevronRight size={50} color={mainRedColor} />
        </div>
        <div className={classes.contentBox}>
          <div className={classes.ingredientBox}>
            <div className={classes.contentImgBox}>
              <div className={classes.aspectImg}>
                <img src={payment} alt="" className={classes.contentImg} />
              </div>
            </div>
            <div className={classes.contentTextBox}>
              <p className={classes.contentHeader}>3. 결제 및 설정</p>
              <p className={classes.contentText}>
                제작된 폰트 확인 후
                <br />
                결제하고 세부사항을
                <br />
                설정합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPageGuide;
