import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

import classes from './ChangeProfileImgModal.module.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeProfileImgModalActions } from 'store/changeProfileImgModalSlice';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';
import { borderColor, mainRedColor } from 'common/colors/CommonColors';

interface ChangeProfileImgModalState {
  changeProfileImg: {
    changeProfileImg: boolean;
  };
}

const ChangeProfileImgModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const dispatch = useDispatch();
  const clickChangeImgHandler = () => {
    dispatch(changeProfileImgModalActions.toggle());
  };
  const showChangeProfileImg = useSelector(
    (state: ChangeProfileImgModalState) => state.changeProfileImg.changeProfileImg,
  );
  const closeModal = () => {
    clickChangeImgHandler();
  };
  //   이미지
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileImgName, setProfileImgName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
        setProfileImgName(file.name); // 파일 이름 설정
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImg(null);
      setProfileImgName(null);
    }
  };
  return (
    <ReactModal
      isOpen={showChangeProfileImg}
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
          <div className={classes.innerMiddleBox}>
            <p className={classes.innerText}>프로필 이미지 변경</p>
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
              {profileImg && (
                <img src={profileImg} alt="Uploaded Preview" className={classes.innerImgSize} />
              )}
              <div className={classes.imgNameBox}>
                <p className={classes.innerText}>{profileImgName}</p>
                {profileImg && (
                  <AiFillCloseCircle
                    size={30}
                    className={classes.closeIcon}
                    onClick={() => {
                      setProfileImg(null);
                      setProfileImgName(null);
                    }}
                    color={borderColor}
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
export default ChangeProfileImgModal;
