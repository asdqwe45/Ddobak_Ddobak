import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './AlertCustomModal.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { goToBasketModalActions } from 'store/goToBasketModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';

interface AlertCustomModalProps {
  show: boolean; // 모달 표시 여부
  onHide: () => void; // 모달 숨김 함수
  message1: string; // 모달 메시지
  message2: string; // 모달 메시지
  btnName: string; // 확인 버튼 텍스트
}

const AlertCustomModal: React.FC<AlertCustomModalProps> = ({
  show,
  onHide,
  message1,
  message2,
  btnName,
}) => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // 앱의 루트 엘리먼트 설정
  }, []);

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={onHide}
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
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={onHide} />
        </div>
        <div className={classes.middleBox}>
          <p className={classes.innerText}>
            {message1}
            <br />
            {message2}
          </p>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={onHide}
          >
            {btnName}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default AlertCustomModal;