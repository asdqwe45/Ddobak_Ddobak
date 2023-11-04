import React, { useState, useEffect } from 'react';
import classes from './FaqPage.module.css';
import { FaSistrix } from 'react-icons/fa';

// components
import { PageTitle } from 'common/titleComponents/TitleComponents';

// FAQ 데이터
const faqs = [
  {
    question: "제작 비용은 무료인가요?",
    answer: "첫 제작은 무료로 제작해드리고 있습니다. \n 두번째 제작 시 50,000 포인트의 제작 비용을 받고 있습니다."
  },
  { question: "손글씨로 몇 글자를 작성해야 하나요?", answer: "글자 수 답변" },
  { question: "폰트를 제작하는데 얼마나 걸리나요?", answer: "제작 소요 시간 답변" },
  { question: "제작이 완료되면 어떻게 알 수 있나요?", answer: "회원가입 시 인증 받으셨던 이메일로 제작 완료 알림을 발송해 드립니다." },
];

const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    const results = faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(results);
  }, [searchTerm]);

  return (
    <>
      <div className={classes.saerchContainer}>
        <PageTitle>
          <span>자주 묻는 질문</span>
        </PageTitle>
        <div className={classes.searchBar}>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FaSistrix size={24} color="black" />
        </div>
      </div>
      <div className={classes.containerStyle}>
      {filteredFaqs.map((faq, index) => (
          <div key={index} className={classes.faqStyle}>
            <div className={classes.qText}>Q. {faq.question}</div>
            <hr />
            <div className={classes.aText}><strong>A.</strong> {faq.answer}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FaqPage;
