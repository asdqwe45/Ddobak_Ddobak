import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

import classes from './ReviewModal.module.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reviewModalActions } from 'store/reviewModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';

interface ReviewModalState {
  reviewModal: {
    reviewVisible: boolean;
  };
}

const ReviewModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const dispatch = useDispatch();
  const clickReviewHandler = () => {
    dispatch(reviewModalActions.toggle());
  };
  const showReview = useSelector((state: ReviewModalState) => state.reviewModal.reviewVisible);
  const closeModal = () => {
    clickReviewHandler();
  };
  //   이미지
  const [reviewImg, setReviewImg] = useState<string | null>(null);
  const [reviewImgName, setReviewImgName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImg(reader.result as string);
        setReviewImgName(file.name); // 파일 이름 설정
      };
      reader.readAsDataURL(file);
    } else {
      setReviewImg(null);
      setReviewImgName(null);
    }
  };
  return (
    <ReactModal
      isOpen={showReview}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={classes.overLay}
      style={{
        content: {
          zIndex: 10003, // NavBar보다 2 높게 설정
          // ... other styles
        },
        overlay: {
          zIndex: 10002, // NavBar보다 1 높게 설정
          // ... other styles
        },
      }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.topBox}>
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={closeModal} />
        </div>
        <div className={classes.middleBox}>
          <div>
            <p className={classes.innerText}>한줄 리뷰 작성하기</p>
          </div>
          <div>
            <input type="text" className={classes.inputText} />
          </div>
          <div className={classes.innerMiddleBox}>
            <p className={classes.innerText}>이미지 첨부</p>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={inputRef}
              onChange={handleImgChange}
            />
            <button className={classes.uploadBtn} onClick={() => inputRef.current?.click()}>
              파일업로드
            </button>
          </div>
          <div>
            <div className={classes.innerImgBox}>
              {reviewImg && (
                <img src={reviewImg} alt="Uploaded Preview" className={classes.innerImgSize} />
              )}
              <div className={classes.imgNameBox}>
                <p className={classes.innerText}>{reviewImgName}</p>
                {reviewImg && (
                  <AiOutlineClose
                    size={30}
                    className={classes.closeIcon}
                    onClick={() => {
                      setReviewImg(null);
                      setReviewImgName(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={closeModal}
          >
            등록하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default ReviewModal;
