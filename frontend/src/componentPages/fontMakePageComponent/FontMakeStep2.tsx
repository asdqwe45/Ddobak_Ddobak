import React, { useState, useCallback, useRef } from 'react';
import classes from './FontMakeStep2.module.css';

// image
import UploadFile from './fontDetailPageAssets/upload_file.png';

// icon
import { FaRegTimesCircle } from 'react-icons/fa';

const FontMakeStep2: React.FC = () => {
  const [files, setFiles] = useState<{ src: string; name: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.rowContainer}>
          <div className={classes.info}>
            <p>업로드 후 반듯하게 정렬해주세요.</p>
          </div>
          <button className={classes.uploadBtn} onClick={openFileSelector}>
            이미지 업로드
          </button>
          {/* 숨겨진 파일 입력 필드 */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <div className={classes.upLoadList} onDrop={onDrop} onDragOver={onDragOver}>
          {/* 파일 없을 때 문구 넣기 */}
          {files.length === 0 ? (
            <div className={classes.emptyContainer}>
              <img src={UploadFile} alt="UploadFile" />
              <div className={classes.emptyMessage}>
                <p>파일을 끌어다 놓아주세요.</p>
                <p>(Drag & drop files here)</p>
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
    </>
  );
};
export default FontMakeStep2;
