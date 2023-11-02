import React from 'react';
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

const KeywordBtn: React.FC = () => {
  const renderKeywords = (keywords: string[]) => (
    <div className={classes.btnContainer}>
      {keywords.map((keyword) => (
        <div className={classes.keyword} key={keyword}>
          <p>{keyword}</p>
        </div>
      ))}
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
