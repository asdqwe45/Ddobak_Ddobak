import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { successModalActions } from 'store/successModalSlice';
import { mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import classes from './SuccessModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';

interface SuccessType {
  successModal: {
    successHeader: string;
    successContext: string;
    successVisible: boolean;
  };
}

const SuccessModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const navigate = useNavigate();
  const successVisible = useSelector((state: SuccessType) => state.successModal.successVisible);
  const successHeader = useSelector((state: SuccessType) => state.successModal.successHeader);
  const successContext = useSelector((state: SuccessType) => state.successModal.successContext);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(successModalActions.showSomething({ successHeader: '', successContext: '' }));
  };
  return (
    <ReactModal
      isOpen={successVisible}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={classes.overLay}
      style={{
        content: {
          zIndex: 10008,
        },
        overlay: {
          zIndex: 10007,
        },
      }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.topBox}>
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={closeModal} />
        </div>
        {/* successHeader에 따라 다른 글 넣기 */}
        {/* <FaCartPlus size={100} color={mainRedColor} /> */}
        <h1 className={classes.innerHeader}>{successHeader}</h1>
        <p className={classes.innerText}>{successContext}</p>

        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: likeCountColor }}
            onClick={async () => {
              navigate('/fontList');
              closeModal();
            }}
          >
            더 둘러보기
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
export default SuccessModal;
