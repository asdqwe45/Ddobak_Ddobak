import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './FailAuthModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';
import { failAuthModalActions } from 'store/failAuthModalSlice';
interface FailAuthModalState {
  failAuth: {
    failAuth: boolean;
  };
}
const FailAuthModal: React.FC = () => {
  const dispatch = useDispatch();
  const showFailAuth = useSelector((state: FailAuthModalState) => state.failAuth.failAuth);

  const closeModal = () => {
    dispatch(failAuthModalActions.toggle());
  };

  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);

  return (
    <ReactModal
      isOpen={showFailAuth}
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
        <AiOutlineCloseCircle size={100} color={mainRedColor} />
        <h1 className={classes.innerHeader}>로그인 에러</h1>
        <p className={classes.innerText}>아이디 혹은 비밀번호를 확인해주세요.</p>

        <button
          className={classes.modalBtn}
          style={{ backgroundColor: mainRedColor }}
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </ReactModal>
  );
};
export default FailAuthModal;
