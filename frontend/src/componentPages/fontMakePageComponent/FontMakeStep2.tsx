import React, { useState } from 'react';
import classes from './FontMakeStep2.module.css';
import MinuGuide from './fontMakePageAssets/guideline_ex.png';

import { FaRegTimesCircle } from 'react-icons/fa';

const FontMakeStep2: React.FC = () => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileNames: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newFileNames.push(files[i].name);
      }
      setFileNames((prev) => [...prev, ...newFileNames]);
    }
  };

  const removeFile = (index: number) => {
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={classes.loadContainer}>
        <div className={classes.downLoadContainer}>
          <div className={classes.info}>
            또박또박 손글씨 가이드라인을 다운받아 {'\n'}
            손글씨를 작성하고, 업로드 해주세요.
          </div>
          <img src={MinuGuide} alt="MinuGuide" className={classes.minuGuidImg} />
          {/* 다운로드 기능 구현 필요 */}
          <button className={classes.downBtn}>다운로드</button>
        </div>

        <div className={classes.upLoadContainer}>
          <div className={classes.upLoadBar}>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput">파일 업로드 click!</label>
          </div>
          <div className={classes.upLoadList}>

            {/* 업로드한 이미지 미리보기 넣기 */}

            {fileNames.map((name, index) => (
              <div key={index} className={classes.upLoadFile}>
                {name}
                {/* 아이콘 클릭 시 파일명 삭제 */}
                <FaRegTimesCircle
                  className={classes.deleteIcon}
                  onClick={() => removeFile(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep2;
