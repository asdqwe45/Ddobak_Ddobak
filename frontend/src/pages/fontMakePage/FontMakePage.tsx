import React, { useState } from "react"
import classes from './FontMakePage.module.css';
import FontMakeStep1 from "componentPages/fontMakePageComponent/FontMakeStep1";
import FontMakeStep2 from "componentPages/fontMakePageComponent/FontMakeStep2";
import FontMakeStep3 from "componentPages/fontMakePageComponent/FontMakeStep3";


const FontMakePage: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    }
  }

  return (
    <>
      <div className={classes.stepContainer}>
        <div className={`${classes.stepBar} ${step === 1 ? classes.nowStep : classes.restStep}`}><p>준비하기</p></div>
        <div className={`${classes.stepBar} ${step === 2 ? classes.nowStep : classes.restStep}`}><p>손글씨 업로드</p></div>
        <div className={`${classes.stepBar} ${step === 3 ? classes.nowStep : classes.restStep}`}><p>AI폰트 제작</p></div>
      </div>
      <div className={classes.contentContainer}>
        {step === 1 && <FontMakeStep1 />}
        {step === 2 && <FontMakeStep2 />}
        {step === 3 && <FontMakeStep3 />}
      </div>
      <div className={classes.btnContainer}>
        {step < 3 && <button onClick={handleNext} className={classes.nextBtn}>다음</button>}
      </div>
    </>
  )
}

export default FontMakePage;
