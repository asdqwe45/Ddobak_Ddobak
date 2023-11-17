import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './DuplicatedEmailModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { duplicatedEmailActions } from 'store/duplicatedEmailSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { likeCountColor, mainRedColor } from 'common/colors/CommonColors';
import Duplicated from './duplicatedEmailModalAssets/Duplicated.svg';
import { useNavigate } from 'react-router-dom';
interface DuplicatedType {
  duplicatedEmail: {
    isVisible: boolean;
  };
}

const DuplicatedEmailModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const isVisible = useSelector((state: DuplicatedType) => state.duplicatedEmail.isVisible);
  const dispatch = useDispatch();
  const closeModal = async () => {
    dispatch(duplicatedEmailActions.toggle());
  };
  const navigate = useNavigate();
  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={closeModal}
      shouldCloseOnEsc={true}
      className={classes.overLay}
      style={{
        content: {
          zIndex: 10010,
        },
        overlay: {
          zIndex: 10009,
        },
      }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.topBox}>
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={closeModal} />
        </div>
        <div className={classes.duplicated}>
          <img src={Duplicated} alt="" />
        </div>
        <h1 className={classes.innerHeader}>이메일 중복</h1>
        <p className={classes.innerText}>이미 가입하신 이메일 입니다.</p>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: likeCountColor }}
            onClick={async () => {
              navigate('/login');
              closeModal();
            }}
          >
            로그인 이동
          </button>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default DuplicatedEmailModal;
