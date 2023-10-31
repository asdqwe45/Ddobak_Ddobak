import React, { useState } from 'react';
import classes from './FontMakeStep2.module.css';
import MinuGuide from './fontMakePageAssets/guideline_ex.png';

import { FaRegTimesCircle } from 'react-icons/fa';

const FontMakeStep2: React.FC = () => {
  const [files, setFiles] = useState<{ src: string; name: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles: { src: string; name: string }[] = [];

      Array.from(fileList).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newFiles.push({ src: reader.result as string, name: file.name });
          if (newFiles.length === fileList.length) {
            setFiles((prev) => [...prev, ...newFiles]);
          }
        };
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
            {files.map((file, index) => (
              <div key={index} className={classes.upLoadFile}>
                <div className={classes.upLoadFileName}>
                  <FaRegTimesCircle
                    className={classes.deleteIcon}
                    onClick={() => removeFile(index)}
                  />
                  {file.name}
                </div>
                <img src={file.src} alt={file.name} /> {/* 이미지 미리보기 */}
                {file.src && (
                  <div className={classes.btnContainer}>
                    <button className={classes.nextBtn}>이미지 반듯하게</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep2;
