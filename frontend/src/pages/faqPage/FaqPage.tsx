import React from 'react';
import classes from './FaqPage.module.css';
// FAQ 데이터
const faqs = [
  {
    question: ' 제작 비용은 무료인가요?',
    answer:
      '첫 제작은 무료로 제작해드리고 있습니다. \n 두번째 제작 시 50,000 포인트의 제작 비용을 받고 있습니다.',
  },
  { question: '질문 1', answer: '답변 1' },
  { question: '질문 2', answer: '답변 2' },
];

const FaqPage: React.FC = () => {
  return (
    <>
      <div className={classes.pageName}>
        <span>자주 묻는 질문</span>
      </div>
      <div className={classes.containerStyle}>
        {faqs.map((faq, index) => (
          <div key={index} className={classes.faqStyle}>
            <div className={classes.qText}>Q. {faq.question}</div>
            <hr />
            <div className={classes.aText}>A. {faq.answer}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqPage;
