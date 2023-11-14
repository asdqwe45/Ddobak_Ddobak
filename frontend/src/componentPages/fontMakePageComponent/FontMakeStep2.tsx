import React, { useState, useRef } from 'react';
import classes from './FontMakeStep2.module.css';
import AlertCustomModal from 'common/modals/alertCustomModal/AlertCustomModal';

import { useDispatch } from 'react-redux';
import { resultModalActions, setSortUrl } from 'store/resultModalSlice';
import { axiosWithFormData } from 'https/http';

import UploadFile from './fontMakePageAssets/upload_file.png';
import { FaRegTimesCircle } from 'react-icons/fa';

const FontMakeStep2: React.FC = () => {
  const [koreanFiles, setKoreanFiles] = useState<{ src: string; name: string }[]>([]);
  const [englishFiles, setEnglishFiles] = useState<{ src: string; name: string }[]>([]);
  const [KorfileData, setKorFileData] = useState<File | null>(null); // 파일 객체를 위한 상태
  const [EngfileData, setEngFileData] = useState<File | null>(null); // 파일 객체를 위한 상태

  const koreanFileInputRef = useRef<HTMLInputElement>(null);
  const englishFileInputRef = useRef<HTMLInputElement>(null);

  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleInvalidFileType = () => {
    setShowAlertModal(true); //
  };

  // 파일 형식 검증 함수
  const isValidFileType = (file: File) => {
    const validExtensions = ['png', 'pdf', 'jpg', 'jpeg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(fileExtension || '');
  };
  const handleKoreanFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0]; // 첫 번째 파일 선택
      if (isValidFileType(file)) {
        setKorFileData(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setKoreanFiles([{ src: reader.result as string, name: file.name }]);
        };
      } else {
        handleInvalidFileType();
      }
    }
  };

  const handleEnglishFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0]; // 첫 번째 파일 선택
      if (isValidFileType(file)) {
        setEngFileData(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setEnglishFiles([{ src: reader.result as string, name: file.name }]);
        };
      } else {
        handleInvalidFileType();
      }
    }
  };

  // 파일 darg & drop
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 기본 이벤트 막기
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, type: 'korean' | 'english') => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0]; // 첫 번째 파일 사용
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
        handleInvalidFileType();
      }
    }
  };

  // 파일 삭제
  const removeKoreanFile = (index: number) => {
    setKoreanFiles((prev) => prev.filter((_, i) => i !== index));
    setIsImageStraightened(false);
    if (koreanFileInputRef.current) {
      koreanFileInputRef.current.value = ''; // input 초기화 (재업로드 가능하도록)
    }
  };

  const removeEnglishFile = (index: number) => {
    setEnglishFiles((prev) => prev.filter((_, i) => i !== index));
    setIsImageStraightened(false);
    if (englishFileInputRef.current) {
      englishFileInputRef.current.value = '';
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
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg') {
      return <img src={file.src} alt={file.name} className={classes.filePreview} />;
    }
    // PDF 파일 미리보기
    else if (fileExtension === 'pdf') {
      return (
        <div className={classes.pdfPreview}>
          <object data={file.src} type="application/pdf" height="210">
            pdf미리보기
          </object>
        </div>
      );
    }
    // 기타 파일 유형
    else {
      return (
        <div style={{ margin: '60px 30px', whiteSpace: 'pre-line', fontSize: '22px' }}>
          <p>미리보기를 지원하지 않는{'\n'} 파일 형식입니다.</p>
        </div>
      );
    }
  };

  const [isImageStraightened, setIsImageStraightened] = useState(false);

  // 이미지 반듯하게 처리
  const straightenImage = async () => {
    console.log(KorfileData);
    console.log(EngfileData);
    if (KorfileData && EngfileData) {
      try {
        const formData = new FormData();
        console.log(KorfileData);
        console.log(EngfileData);
        formData.append('kor_file', KorfileData);
        formData.append('eng_file', EngfileData);

        const response = axiosWithFormData
          .post('/font/sort', formData)
          .then((r) => {
            return r;
          })
          .catch((e) => {
            throw e;
          });
        console.log((await response).data);
        // 성공적으로 처리되었다면, 결과 이미지 URL을 파싱하여 상태 업데이트
        if ((await response).data) {
          // 이미지 URL을 `$` 기준으로 파싱
          const imageUrls = (await response).data
            .split('$')
            .filter((url: string) => url.trim() !== '');
          // console.log(imageUrls)

          const sortedUrl = (await response).data;
          dispatch(setSortUrl(sortedUrl));

          // 첫 번째 이미지로 한국어 파일 미리보기 업데이트
          if (imageUrls.length > 0) {
            setKoreanFiles([{ ...koreanFiles[0], src: imageUrls[0] }]);
            createFilePreview({ src: imageUrls[0], name: 'kor_file.png' }); // 파일 이름은 예시임
          }

          // 영어 파일 미리보기는 두 번째 URL을 사용
          if (imageUrls.length > 1) {
            setEnglishFiles([{ ...englishFiles[0], src: imageUrls[1] }]);
            createFilePreview({ src: imageUrls[1], name: 'eng_file.png' }); // 파일 이름은 예시임
          }

          setIsImageStraightened(true);
        } else {
          alert('이미지를 처리하는데 실패했다.');
        }
      } catch (error) {
        alert('이미지를 처리 중 오류가 발생하였습니다. 담당자에게 문의하세요.');
        console.error('이미지 처리 중 오류가 발생했다:', error);
      }
    }
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
            {/* 파일 없을 때 문구 */}
            {koreanFiles.length === 0 ? (
              <div className={classes.emptyContainer}>
                <p>pdf, jpg, png 파일만 업로드 가능합니다.</p>
                <div>
                  <button className={classes.uploadBtn} onClick={openKoreanFileSelector}>
                    이미지 업로드
                  </button>
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
            {/* 파일 없을 때 문구 */}
            {englishFiles.length === 0 ? (
              <div className={classes.emptyContainer}>
                <p>pdf, jpg, png 파일만 업로드 가능합니다.</p>
                <div>
                  <button className={classes.uploadBtn} onClick={openEnglishFileSelector}>
                    이미지 업로드
                  </button>
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
        {koreanFiles.length > 0 && englishFiles.length > 0 && !isImageStraightened && (
          <button className={classes.cropBtn} onClick={straightenImage}>
            이미지 반듯하게
          </button>
        )}
        {koreanFiles.length > 0 && englishFiles.length > 0 && isImageStraightened && (
          <button className={classes.nextBtn} onClick={showPreviewHandler}>
            다음
          </button>
        )}
      </div>
      <AlertCustomModal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        message1="허용되지 않는 형식의 파일입니다."
        message2="pdf, jpg, png 파일로 업로드해주세요."
        btnName="확인"
      />
    </>
  );
};
export default FontMakeStep2;
