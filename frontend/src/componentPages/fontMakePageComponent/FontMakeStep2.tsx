import React, { useState, useRef } from 'react';
import classes from './FontMakeStep2.module.css';
import UploadFile from './fontDetailPageAssets/upload_file.png';
import { FaRegTimesCircle } from 'react-icons/fa';
import { resultModalActions } from 'store/resultModalSlice';
import { useDispatch } from 'react-redux';


const FontMakeStep2: React.FC = () => {
  const [koreanFiles, setKoreanFiles] = useState<{ src: string; name: string }[]>([]);
  const [englishFiles, setEnglishFiles] = useState<{ src: string; name: string }[]>([]);

  const koreanFileInputRef = useRef<HTMLInputElement>(null);
  const englishFileInputRef = useRef<HTMLInputElement>(null);

  // 파일 형식 검증 함수
  const isValidFileType = (file: File) => {
    const validExtensions = ['png', 'pdf', 'jpg', 'jpeg']; // 허용되는 파일 확장자 목록
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(fileExtension || '');
  };
  const handleKoreanFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0]; // 첫 번째 파일만 선택합니다.
      if (isValidFileType(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setKoreanFiles([{ src: reader.result as string, name: file.name }]);
        };
      } else {
        alert("허용되지 않는 형식의 파일입니다. png, pdf, jpg 파일로 업로드해주세요.");
      }
    }
  };

  const handleEnglishFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0]; // 첫 번째 파일만 선택합니다.
      if (isValidFileType(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEnglishFiles([{ src: reader.result as string, name: file.name }]);
      };
    }else {
      alert("허용되지 않는 형식의 파일입니다. pdf, jpg, png 파일로 업로드해주세요.");
    }
  }
};

  // 파일 darg & drop
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 기본 이벤트를 막습니다.
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, type: 'korean' | 'english') => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일을 사용합니다.
      if (isValidFileType(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = { src: reader.result as string, name: file.name };
        if (type === 'korean') {
          setKoreanFiles([result]);
        } else {
          setEnglishFiles([result]);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("허용되지 않는 형식의 파일입니다. pdf, jpg, png 파일로 업로드해주세요.");
    }
  }
};

  // 파일 삭제
  const removeKoreanFile = (index: number) => {
    setKoreanFiles((prev) => prev.filter((_, i) => i !== index));
    if (koreanFileInputRef.current) {
      koreanFileInputRef.current.value = ""; // input 초기화 (재업로드 가능하도록)
    }
  };

  const removeEnglishFile = (index: number) => {
    setEnglishFiles((prev) => prev.filter((_, i) => i !== index));
    if (englishFileInputRef.current) {
      englishFileInputRef.current.value = "";
    }
  };

  // 파일 선택기 열기
  const openKoreanFileSelector = () => {
    koreanFileInputRef.current?.click();
  };

  const openEnglishFileSelector = () => {
    englishFileInputRef.current?.click();
  };

  // 파일 미리보기 생성
  const createFilePreview = (file: { src: string; name: string }) => {
    // 파일 확장자 추출
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    // 이미지 파일 미리보기
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'jpeg') {
      return <img src={file.src} alt={file.name} className={classes.filePreview} />;
    }
    // PDF 파일 미리보기
    else if (fileExtension === 'pdf') {
      return (
        <div className={classes.pdfPreview}>
          <object data={file.src} type="application/pdf" width="80%" height="200px" >
            <p>PDF 파일을 표시할 수 없습니다. <a href={file.src}>여기</a>를 클릭하여 파일을 다운로드하세요.</p>
          </object>
        </div>
      );
    }
    // 기타 파일 유형
    else {
      return (
        <div style={{ margin: '60px 30px', whiteSpace: 'pre-line', fontSize: '22px' }}><p>미리보기를 지원하지 않는{'\n'} 파일 형식입니다.</p></div>
      )
    }
  };

  const [isImageStraightened, setIsImageStraightened] = useState(false);

  // 이미지 반듯하게 처리
  const straightenImage = () => {
    // 이미지를 반듯하게 처리하는 로직 추가
    setIsImageStraightened(true);
  };

    // 미리보기 모달 가져오기
    const dispatch = useDispatch();
    const showPreviewHandler = () => {
      dispatch(resultModalActions.toggle());
    };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.subContainer}>
          <p className={classes.fileboxTitle}>한글 파일</p>
          {/* 숨겨진 파일 입력 필드 */}
          <input
            type="file"
            ref={koreanFileInputRef}
            style={{ display: 'none' }}
            onChange={handleKoreanFileChange}
          />
          <div
            className={classes.upLoadList}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'korean')}
          >
            {/* 파일 없을 때 문구 넣기 */}
            {koreanFiles.length === 0 ? (
              <div className={classes.emptyContainer}>
                <p>pdf, jpg, png 파일만 업로드 가능합니다.</p>
                <div>
                  <button className={classes.uploadBtn} onClick={openKoreanFileSelector}>이미지 업로드</button>
                </div>
                <img src={UploadFile} alt="UploadFile" />
                <div className={classes.emptyMessage}>
                  <p>파일을 끌어다 놓아주세요.</p>
                  <p>(Drag & drop files here)</p>
                </div>
              </div>
            ) : (
              koreanFiles.map((file, index) => (
                <div key={index} className={classes.upLoadFile}>
                  <div className={classes.upLoadFileName}>
                    <FaRegTimesCircle
                      className={classes.deleteIcon}
                      onClick={() => removeKoreanFile(index)}
                    />
                    {file.name}
                  </div>
                  {/* 파일 미리보기 */}
                  {createFilePreview(file)}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={classes.subContainer}>
          <p className={classes.fileboxTitle}>영문 및 숫자 파일</p>
          {/* 숨겨진 파일 입력 필드 */}
          <input
            type="file"
            ref={englishFileInputRef}
            style={{ display: 'none' }}
            onChange={handleEnglishFileChange}
          />
          <div
            className={classes.upLoadList}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'english')}
          >
            {/* 파일 없을 때 문구 넣기 */}
            {englishFiles.length === 0 ? (
              <div className={classes.emptyContainer}>
                <p>pdf, jpg, png 파일만 업로드 가능합니다.</p>
                <div>
                  <button className={classes.uploadBtn} onClick={openEnglishFileSelector}>이미지 업로드</button>
                </div>
                <img src={UploadFile} alt="UploadFile" />
                <div className={classes.emptyMessage}>
                  <p>파일을 끌어다 놓아주세요.</p>
                  <p>(Drag & drop files here)</p>
                </div>
              </div>
            ) : (
              englishFiles.map((file, index) => (
                <div key={index} className={classes.upLoadFile}>
                  <div className={classes.upLoadFileName}>
                    <FaRegTimesCircle
                      className={classes.deleteIcon}
                      onClick={() => removeEnglishFile(index)}
                    />
                    {file.name}
                  </div>
                  {/* 파일 미리보기 */}
                  {createFilePreview(file)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        {koreanFiles.length > 0 && englishFiles.length > 0 && !isImageStraightened ? (
          <button className={classes.cropBtn} onClick={straightenImage}>이미지 반듯하게</button>
        ) : null}
        {koreanFiles.length > 0 && englishFiles.length > 0 && isImageStraightened ? (
          <button className={classes.nextBtn} onClick={showPreviewHandler}>다음</button>
        ) : null}
      </div>
    </>
  );
};
export default FontMakeStep2;
