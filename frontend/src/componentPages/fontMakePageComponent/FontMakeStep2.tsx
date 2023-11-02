import React, { useState, useCallback } from 'react';
import classes from './FontMakeStep2.module.css';

// image
import MiniGuide from './fontDetailPageAssets/guideline_ex.png';
import UploadFile from './fontDetailPageAssets/upload_file.jpg';

// icon
import { FaRegTimesCircle } from 'react-icons/fa';

const FontMakeStep2: React.FC = () => {
  const [files, setFiles] = useState<{ src: string; name: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | DataTransfer) => {
    const fileList = event instanceof DataTransfer ? event.files : event.target.files;
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

  // 파일 darg & drop
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // 파일 삭제
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 가이드라인 다운로드
  const handleDownload = async () => {
    try {
      const response = await fetch('https://ddobakimage.s3.ap-northeast-2.amazonaws.com/template/english_number_template.pdf');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // 다운로드 시, 파일 이름
        a.download = 'ddobak_english_number_template.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('다운로드 중 에러가 발생했습니다', error);
    }
  };

  return (
    <>
      <div className={classes.loadContainer}>
        <div className={classes.downLoadContainer}>
          <div className={classes.info}>
            {/* 또박또박 손글씨 가이드라인을 다운로드 {'\n'} */}
            손글씨를 작성하고, 이미지를 올려주세요.
          </div>
          <img src={MiniGuide} alt="MiniGuide" className={classes.miniGuidImg} />
          <button className={classes.downBtn} onClick={handleDownload}>가이드라인 다운로드</button>
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
          <div
            className={classes.upLoadList}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {/* 파일 없을 때 문구 넣기 */}
            {files.length === 0 ? (
              <div className={classes.emptyContainer}>
                <img src={UploadFile} alt="UploadFile" />
                <div className={classes.emptyMessage}>
                  <p>파일을 끌어다 놓아주세요.</p>
                  <p>( Drag & Drop Files )</p>
                </div>
              </div>
            ) : (
              files.map((file, index) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FontMakeStep2;
