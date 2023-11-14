import React, { useEffect } from 'react';
import classes from './FontMakePage.module.css';
import FontMakeStep1 from 'componentPages/fontMakePageComponent/FontMakeStep1';
import FontMakeStep2 from 'componentPages/fontMakePageComponent/FontMakeStep2';
import FontMakeStep3 from 'componentPages/fontMakePageComponent/FontMakeStep3';
import FontOptionPage from 'componentPages/fontMakePageComponent/FontOptionPage';
import { resultModalActions } from 'store/resultModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from 'https/utils/AuthFunction';
import { useNavigate } from 'react-router-dom';

interface ResultModalState {
  resultModal: {
    resultIsVisible: boolean;
    step: number;
  };
}

const FontMakePage: React.FC = () => {
  // const [step, setStep] = useState(1);
  const step = useSelector((state: ResultModalState) => state.resultModal.step);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetch() {
      const token = await checkToken();
      if (token) {
        console.log('have Token');
      } else {
        console.log('잘못된 접근입니다.');
        navigate('/wrong');
      }
    }
    fetch();
    // navigate를 의존성 배열에 추가합니다.
  }, [navigate]);

  const handleNext = () => {
    if (step < 4) {
      dispatch(resultModalActions.nextStep());
      if (step === 2) {
        showPreviewHandler();
      }
    }
  };

  // 미리보기 모달 가져오기
  const dispatch = useDispatch();
  const showPreviewHandler = () => {
    dispatch(resultModalActions.toggle());
  };

  return (
    <>
      <div className={classes.stepContainer}>
        <div className={`${classes.stepBar} ${step === 1 ? classes.nowStep : classes.restStep}`}>
          <p>준비하기</p>
        </div>
        <div className={`${classes.stepBar} ${step === 2 ? classes.nowStep : classes.restStep}`}>
          <p>손글씨 업로드</p>
        </div>
        <div className={`${classes.stepBar} ${step === 3 ? classes.nowStep : classes.restStep}`}>
          <p>정보 입력 및 결제</p>
        </div>
        <div className={`${classes.stepBar} ${step === 4 ? classes.nowStep : classes.restStep}`}>
          <p>AI폰트 제작</p>
        </div>
      </div>
      <div className={classes.contentContainer}>
        {step === 1 && <FontMakeStep1 />}
        {step === 2 && <FontMakeStep2 />}
        {step === 3 && <FontOptionPage />}
        {step === 4 && <FontMakeStep3 />}
      </div>
      <div className={classes.btnContainer}>
        {step < 2 && (
          <button onClick={handleNext} className={classes.nextBtn}>
            다음
          </button>
        )}
      </div>
    </>
  );
};

export default FontMakePage;
