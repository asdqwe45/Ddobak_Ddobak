import React, { useEffect, useState } from 'react';
import classes from './KeywordBtn.module.css';

const options = ["단정한", "가지런한", "둥글둥글", "네모네모", "삐뚤빼뚤", "귀여운", "문서체", "어른같은", "아이같은", "자유로운"];

const KeywordBtn: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    const selectedOptions: string[] = [];
    while (selectedOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex];
      if (!selectedOptions.includes(selectedOption)) {
        selectedOptions.push(selectedOption);
      }
    }
    setKeywords(selectedOptions);
  }, []);

  return (
    <div className={classes.btnContainer}>
      {keywords.map((keyword, index) => (
        <div className={classes.keyword}>
          <p key={index}>{keyword}</p>
        </div>
      ))}
    </div>
  );
};

export default KeywordBtn;
