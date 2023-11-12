import React, { useState } from 'react';
import classes from './KeywordBtn.module.css';

const options = [
  '단정한',
  '가지런한',
  '둥글둥글',
  '네모네모',
  '삐뚤빼뚤',
  '귀여운',
  '문서체',
  '어른같은',
  '아이같은',
  '자유로운',
];

const ROW_SIZE = 5;

interface KeywordBtnProps {
  onKeywordsChange: (keywords: string[]) => void;
}

const KeywordBtn: React.FC<KeywordBtnProps> = ({ onKeywordsChange }) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleKeyword = (keyword: string) => {
    let newSelectedKeywords;
    if (selectedKeywords.includes(keyword)) {
      newSelectedKeywords = selectedKeywords.filter((k) => k !== keyword);
    } else {
      if (selectedKeywords.length >= 3) {
        alert('3개까지만 선택 가능합니다.');
        return;
      }
      newSelectedKeywords = [...selectedKeywords, keyword];
    }
    setSelectedKeywords(newSelectedKeywords);
    onKeywordsChange(newSelectedKeywords);
  };

  const renderKeywords = (keywords: string[]) => (
    <div className={classes.btnContainer}>
      {keywords.map((keyword) => {
        const isSelected = selectedKeywords.includes(keyword);
        const keywordClass = isSelected
          ? `${classes.keyword} ${classes.selected}`
          : classes.keyword;

        return (
          <div className={keywordClass} key={keyword} onClick={() => toggleKeyword(keyword)}>
            <p>{keyword}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={classes.container}>
        {renderKeywords(options.slice(0, ROW_SIZE))}
        {renderKeywords(options.slice(ROW_SIZE))}
      </div>
    </>
  );
};

export default KeywordBtn;
