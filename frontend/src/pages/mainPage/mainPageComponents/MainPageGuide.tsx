import classes from './MainPageGuide.module.css';
import guideLine from '../mainPageAssets/guideLine.png';
import UploadPC from '../mainPageAssets/UploadPC.png';
import Payment from '../mainPageAssets/Payment.png';
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
              <div className={classes.aspectImg} style={{ height: '80%' }}>
                <img src={guideLine} alt="가이드라인" className={classes.guideImg} />
              </div>
              <div className={classes.btnBox}>
                <button className={classes.downloadBtn} onClick={handleDownload}>
                  가이드라인 다운로드
                </button>
              </div>
            </div>
            <div className={classes.contentTextBox}>
              <p className={classes.contentHeader}>1. 작성하기</p>
              <p className={classes.contentText}>
                가이드라인을 다운받아
                <br />
                손글씨를 작성합니다.
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
                <img src={UploadPC} alt="" className={classes.contentImg} />
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
                <img src={Payment} alt="" className={classes.contentImg} />
              </div>
            </div>
            <div className={classes.contentTextBox}>
              <p className={classes.contentHeader}>3. 설정 및 결제</p>
              <p className={classes.contentText}>
                폰트 정보를 입력하고
                <br />
                결제합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPageGuide;

// 가이드라인 다운로드
const handleDownload = async () => {
  try {
    const response = await fetch(
      'https://ddobakimage.s3.ap-northeast-2.amazonaws.com/fianltemplete/template.pdf',
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // 다운로드 시, 파일 이름
      a.download = 'ddobak_template.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('다운로드 중 에러가 발생했습니다', error);
  }
};
