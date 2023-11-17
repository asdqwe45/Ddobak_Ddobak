import { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import classes from './ChangePwModal.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changePwModalActions } from 'store/changePwModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { borderColor, mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import { userChangePwAPI } from 'https/utils/AuthFunction';

interface ChangePwModalState {
  changePwModal: {
    changePwVisible: boolean;
  };
}

const ChangePwModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const dispatch = useDispatch();
  const clickChangePwHandler = () => {
    dispatch(changePwModalActions.toggle());
  };
  const showPwModal = useSelector(
    (state: ChangePwModalState) => state.changePwModal.changePwVisible,
  );

  const closeModal = () => {
    clickChangePwHandler();
  };

  const changePasswordFC = () => {
    const prevLoginPassword = currentPwRef.current?.value;
    const newLoginPassword = changePwRef.current?.value;
    if (prevLoginPassword && newLoginPassword) {
      const data = {
        prevLoginPassword: prevLoginPassword,
        newLoginPassword: newLoginPassword,
      };
      userChangePwAPI(data)
        .then(async (r) => {
          closeModal();
        })
        .catch((e) => {
          console.error(e);
          alert('비밀번호를 확인해주세요.');
        });
    }
  };

  // 연결
  const currentPwRef = useRef<HTMLInputElement>(null);
  const changePwRef = useRef<HTMLInputElement>(null);
  const checkChangePwRef = useRef<HTMLInputElement>(null);

  // 유효성 검사
  const [changeIsValid, setChangeIsValid] = useState<boolean>(false);
  const [checkIsValid, setCheckIsValid] = useState<boolean>(false);

  const validNewPwChange = () => {
    const changePw = changePwRef.current?.value;
    if (changePw) {
      if (changePw.length > 7) {
        setChangeIsValid(true);
      } else {
        setChangeIsValid(false);
      }
    } else {
      setChangeIsValid(true);
    }
  };

  const validCheckPwChange = () => {
    const checkPw = checkChangePwRef.current?.value;
    const changePw = changePwRef.current?.value;
    if (checkPw) {
      if (checkPw === changePw) {
        setCheckIsValid(true);
      } else {
        setCheckIsValid(false);
      }
    } else {
      setCheckIsValid(true);
    }
  };

  return (
    <ReactModal
      isOpen={showPwModal}
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
          <div
            className={classes.innerBox}
            style={{ borderBottom: 2, borderColor: borderColor, borderBottomStyle: 'solid' }}
          >
            <div>
              <p className={classes.innerText}>현재 비밀번호</p>
            </div>
            <input
              ref={currentPwRef}
              type="password"
              placeholder="현재 비밀번호"
              className={classes.inputText}
            />
          </div>
          <div className={classes.innerBox}>
            <div>
              <p className={classes.innerText}>새 비밀번호</p>
              {changeIsValid ? <></> : <p className={classes.notValid}>※ 8자 이상 입력해주세요.</p>}
            </div>
            <input
              ref={changePwRef}
              type="password"
              placeholder="새 비밀번호"
              className={classes.inputText}
              onChange={validNewPwChange}
            />
          </div>
          <div className={classes.innerBox}>
            <div>
              <p className={classes.innerText}>새 비밀번호 확인</p>
              {checkIsValid ? (
                <></>
              ) : (
                <p className={classes.notValid}>※ 비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <input
              ref={checkChangePwRef}
              type="password"
              placeholder="새 비밀번호 확인"
              className={classes.inputText}
              onChange={validCheckPwChange}
            />
          </div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: likeCountColor }}
            onClick={closeModal}
          >
            변경취소
          </button>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={changePasswordFC}
          >
            변경하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default ChangePwModal;
