import React, { useState, CSSProperties } from 'react';
import classes from './TermsAgreement.module.css';

interface TermsProps {
  onAgree: (agreed: boolean) => void; // 모든 약관에 동의했는지 알려주는 콜백
  style?: CSSProperties;
}

const terms = [
  '(필수) 저작권법 및 또박또박 서비스 이용 약관에 따라 제작된 폰트의 저작권이 다음과 같이 부여되는 것에 동의합니다.',
  "1. 저작재산권 : 사용자 80%, 또박또박 20% \n2. 저작인격권 : 또박또박",
  '(필수) 제작된 폰트를 회사의 동의 없이 유료로 판매하거나, 저작재산권을 제3자에게 양도할 수 없다는 것에 동의합니다.',
  '(필수) 제작된 폰트는 제작 완료 후 환불할 수 없다는 것을 인지하였으며, 동의합니다.',
  '(필수) 제작 완료 후 오탈자 이외의 글자들에 대해서 수정 작업을 제공하지 않는다는 것에 동의합니다.',
  '(필수) 제작된 폰트를 또박또박 서비스를 통해 배포하는 것에 동의합니다.',
];

const TermsAgreement: React.FC<TermsProps> = ({ onAgree }) => {
  const [agreedTerms, setAgreedTerms] = useState<boolean[]>(new Array(terms.length).fill(false));

  const handleAllAgree = () => {
    // 전체 약관이 모두 체크되어 있는지 확인
    const isAllAgreed = agreedTerms.every((term) => term);

    // 모두 체크되어 있다면 전체 해제, 아니라면 전체 체크
    const newAgreement = new Array(terms.length).fill(!isAllAgreed);

    setAgreedTerms(newAgreement);
    onAgree(newAgreement.every((term) => term));
  };

  const handleCheckboxChange = (index: number) => {
    const newAgreedTerms = [...agreedTerms];
    newAgreedTerms[index] = !newAgreedTerms[index];
    setAgreedTerms(newAgreedTerms);
    onAgree(newAgreedTerms.every((term) => term));
  };

  return (
    <div className={classes.container}>
      <div className={classes.rowContainer}>
        <input
          type="checkbox"
          checked={agreedTerms.every((term) => term)}
          onChange={handleAllAgree}
        />
        <span>
          <strong>약관 전체 동의</strong>
        </span>
      </div>
      <div className={classes.termContainer}>
        {terms.map((term, index) => (
          <div key={index} className={classes.rowContainer}>
            {index !== 1 && (
            <input
              type="checkbox"
              checked={agreedTerms[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            )}
            <span className={index === 1 ? classes.specialTerm : ''}>
              {index === 1 ? (
                // 인라인 스타일 대신 CSS 클래스를 적용합니다.
                term.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className={classes.termSmallText}>{line}</div>
                ))
              ) : (
                term
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAgreement;
