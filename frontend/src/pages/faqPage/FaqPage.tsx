import React, { useState, useEffect } from 'react';
import classes from './FaqPage.module.css';
import { FaSistrix } from 'react-icons/fa';

// components
import { PageTitle } from 'common/titleComponents/TitleComponents';

// FAQ 데이터
const faqs = [
  {
    question: '폰트 제작 비용은 얼마인가요? 💰',
    answer:
      '첫 제작은 무료로 제작해드리고 있습니다. \n 두번째 제작 시 50,000 포인트의 제작 비용을 받고 있습니다.',
  },
  {
    question: '손글씨로 몇 글자를 작성해야 하나요? 📝',
    answer: `'한글' 템플릿과 '영어 및 특수기호' 템플릿으로 나뉘어 있어요. \n - 한글 : 36자 \n - 영어 및 특수기호 : 91자 [영어 52, 숫자 10, 특수기호 29]`,
  },
  { question: '폰트를 제작하는데 시간이 얼마나 걸리나요? ⏱', answer: `대략 5분 정도 소요됩니다. 단, 사용자의 요청이 많을 시 다소 지연될 수 있습니다. \n 제작 완료 시 이메일로 안내 메일을 보내드립니다.` },
  {
    question: '제작이 완료된 폰트는 어떻게 사용할 수 있나요? 🙄',
    answer: `[마이페이지]-[제작한 폰트] 에서 확인하고 다운로드 받으실 수 있어요.`,
  },
  {
    question: '웹폰트 적용하는 방법이 궁금해요. 💻',
    answer: `각 폰트의 [상세페이지] 상단의 웹폰트 코드를 복사해서 html 파일의 <style> 태그 안에 넣으시면 됩니다.`,
  },
];

const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    const results = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSistrix size={24} color="black" />
        </div>
      </div>
      <div className={classes.containerStyle}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className={classes.faqStyle}>
              <div className={classes.qText}>Q. {faq.question}</div>
              <hr />
              <div className={classes.aText}>
                <strong>A.</strong>
                <div style={{ marginLeft: '35px', marginTop: '-35px' }}>{faq.answer}</div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.noResult}>찾으시는 값이 없습니다. 💬</div>
        )}
      </div>
    </>
  );
};

export default FaqPage;
