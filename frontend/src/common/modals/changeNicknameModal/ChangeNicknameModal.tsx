import { useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { changeNicknameModalActions } from 'store/changeNicknameSlice';
import { useDispatch } from 'react-redux';
import classes from './ChangeNicknameModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import { NewAuthInput } from 'pages/signupPage/SignupPage';
import { userChangeNicknameAPI, userNicknameAPI } from 'https/utils/AuthFunction';
import { NotValid } from 'pages/signupPage/signupPageComponents/SignupPageComponents';

interface ChangeNicknameType {
  changeNickname: {
    wantChange: boolean;
    nickname: string;
  };
}

const ChangeNicknameModal: React.FC = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(changeNicknameModalActions.toggle());
  };

  const showChangeNickname = useSelector(
    (state: ChangeNicknameType) => state.changeNickname.wantChange,
  );

  // 닉네임 change 이벤트 핸들러
  // 닉네임==================================================
  // 닉네임 확인
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
  const [validNickname, setValidNickname] = useState<boolean>(false);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const checkNickname = () => {
    // 중복확인 결과 중복이 아닌경우
    // 중복확인 util이 필요
    const signupNickname = nickNameRef.current?.value;
    if (signupNickname) {
      console.log(signupNickname);
      userNicknameAPI(signupNickname)
        .then((r) => {
          console.log(r);
          setValidNickname(true);
          setNicknameUseState(true);
        })
        .catch((e) => {
          console.log(e);
          setNicknameUseState(true);
          setIsDuplicated(true);
        });
    }
  };
  const [nicknameUseState, setNicknameUseState] = useState(true);
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDuplicated(false);
    const nickname = e.target.value;
    if (nickname) {
      setNicknameUseState(false);
    } else {
      setNicknameUseState(true);
    }
  };

  const changeNicknameFC = () => {
    const nickname = nickNameRef.current?.value;
    if (nickname) {
      const data = {
        nickname: nickname,
      };
      userChangeNicknameAPI(data)
        .then(async (r) => {
          console.log(r);
          setIsDuplicated(false);
          setValidNickname(false);
          closeModal();
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
          alert('다시 시도해주세요.');
        });
    }
  };
  return (
    <ReactModal
      isOpen={showChangeNickname}
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
            <h1 className={classes.changeNicknameH1}>변경할 닉네임</h1>
          </div>
          <div>
            <NewAuthInput
              ref={nickNameRef}
              placeholder="9자 이내로 입력해주세요."
              disabled={validNickname}
              onChange={handleNicknameChange}
              maxLength={9}
            ></NewAuthInput>
            <button
              className={validNickname ? classes.notValidEmail : classes.emailCheckBtn}
              onClick={checkNickname}
            >
              {validNickname ? '사용 가능' : '중복 확인'}
            </button>
            {isDuplicated ? <NotValid>닉네임이 중복되었습니다.</NotValid> : <></>}
            {nicknameUseState ? <></> : <NotValid>닉네임 중복을 확인해주세요.</NotValid>}
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
          {validNickname ? (
            <>
              {' '}
              <button
                className={classes.modalBtn}
                style={{ backgroundColor: mainRedColor }}
                onClick={changeNicknameFC}
              >
                변경하기
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </ReactModal>
  );
};
export default ChangeNicknameModal;
