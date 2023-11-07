import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './SignupLoaderModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signupLoaderActions } from 'store/signupLoaderSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
interface SignupLoaderModalState {
  signupLoader: {
    loaderVisible: boolean;
    signupSuccess: boolean;
    signupIsLoading: boolean;
    signupError: boolean;
  };
}
const SignupLoaderModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSignupLoader = useSelector(
    (state: SignupLoaderModalState) => state.signupLoader.loaderVisible,
  );
  const showSuccess = useSelector(
    (state: SignupLoaderModalState) => state.signupLoader.signupSuccess,
  );
  const showIsLoading = useSelector(
    (state: SignupLoaderModalState) => state.signupLoader.signupIsLoading,
  );

  const closeModal = () => {
    dispatch(signupLoaderActions.toggle());
  };

  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);

  const checkHandler = () => {
    if (showSuccess) {
      // 로그인 페이지로 이동
      navigate('/login');
      window.location.reload();
    } else {
      closeModal();
    }
  };
  return (
    <ReactModal
      isOpen={showSignupLoader}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={classes.overLay}
      style={{
        content: {
          zIndex: 10006, // NavBar보다 2 높게 설정
        },
        overlay: {
          zIndex: 10005, // NavBar보다 1 높게 설정
        },
      }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.topBox}>
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={closeModal} />
        </div>
        <div className={classes.middleBox}>
          {showIsLoading ? (
            <div>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
              <p className={classes.innerText}>회원가입 진행중입니다.</p>
            </div>
          ) : showSuccess ? (
            <>
              <>
                <p className={classes.innerText}>
                  회원가입에 성공했습니다.
                  <br />
                  로그인페이지로 이동하겠습니다.
                </p>
              </>
            </>
          ) : (
            <>
              <>
                <p className={classes.innerText}>
                  회원가입에 실패했습니다.
                  <br />
                  다시 회원가입을 시도해주세요.
                </p>
              </>
            </>
          )}
        </div>
        <div className={classes.bottomBox}>
          {showIsLoading ? (
            <></>
          ) : (
            <>
              <button
                className={classes.modalBtn}
                style={{ backgroundColor: mainRedColor }}
                onClick={checkHandler}
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </ReactModal>
  );
};
export default SignupLoaderModal;
