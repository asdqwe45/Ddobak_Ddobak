import { useEffect, useCallback } from 'react';
import ReactModal from 'react-modal';
import classes from './AlertCustomModal.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { goToBasketModalActions } from 'store/goToBasketModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';

interface AlertCustomModalProps {
  show: boolean; // 모달 표시 여부
  onHide: () => void; // 모달 숨김 함수
  message1: string; // 모달 메시지1
  message2: string; // 모달 메시지2
  btnName: string; // 버튼 텍스트
  onMove?: () => void; // 페이지 이동 함수 (선택)
}

const AlertCustomModal: React.FC<AlertCustomModalProps> = ({
  show,
  onHide,
  message1,
  message2,
  btnName,
  onMove,
}) => {
  const handleButton = useCallback(() => {
    if (onMove) {
      onMove(); // onConfirm 함수가 제공되었다면, 호출
    } else {
      onHide(); // onConfirm 함수가 없다면, onHide 함수를 호출하여 모달을 닫음
    }
  }, [onMove, onHide]);

  useEffect(() => {
    ReactModal.setAppElement('body'); // 앱의 루트 엘리먼트 설정
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && show) {
        handleButton(); // Enter 키가 눌렸을 때 handleButton 함수 호출
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [show, handleButton]); // 의존성 배열에 show와 handleButton을 추가

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
            onClick={handleButton}
          >
            {btnName}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default AlertCustomModal;
