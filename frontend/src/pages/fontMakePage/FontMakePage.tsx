import React, { useState } from "react"
import classes from './FontMakePage.module.css';

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
      <div className={step === 1 ? classes.nowStep : classes.restStep}><p>준비하기</p></div>
      <div className={step === 2 ? classes.nowStep : classes.restStep}><p>손글씨 업로드</p></div>
      <div className={step === 3 ? classes.nowStep : classes.restStep}><p>AI폰트 제작</p></div>
      </div>
      {step < 3 && <button onClick={handleNext}>다음</button>}
    </>
  )
}

export default FontMakePage;
