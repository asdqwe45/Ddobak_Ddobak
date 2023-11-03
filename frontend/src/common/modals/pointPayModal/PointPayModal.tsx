import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './PointPayModal.module.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import { chargePointModalActions } from 'store/chargePointModalSlice';

import { AiOutlineClose } from 'react-icons/ai';
import { borderColor, mainRedColor, likeCountColor } from 'common/colors/CommonColors';

interface PointModalState {
  pointModal: {
    pointPayVisible: boolean;
  };
}

const PointPayModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const dispatch = useDispatch();
  const clickPayHandler = () => {
    dispatch(pointPayModalActions.toggle());
  };
  const showPayModal = useSelector((state: PointModalState) => state.pointModal.pointPayVisible);

  const closeModal = () => {
    clickPayHandler();
  };
  const clickChargeHandler = () => {
    dispatch(chargePointModalActions.toggle());
  };

  return (
    <ReactModal
      isOpen={showPayModal}
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
            <p className={classes.innerText}>현재 포인트</p>
            <p className={classes.innerText}>45,000 P</p>
          </div>
          <div className={classes.innerBox}>
            <p className={classes.innerText}>구매 포인트</p>
            <p className={classes.innerText}>50,000 P</p>
          </div>
          <div className={classes.innerBox}>
            <p className={classes.innerText}>잔여 포인트</p>
            <p className={classes.innerText}>0 P</p>
          </div>
          <div
            className={classes.innerBox}
            style={{ borderTop: 2, borderColor: borderColor, borderTopStyle: 'solid' }}
          >
            <p className={classes.innerText} style={{ color: mainRedColor }}>
              부족 포인트
            </p>
            <p className={classes.innerText} style={{ color: mainRedColor }}>
              5,000 P
            </p>
          </div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: likeCountColor }}
            onClick={clickChargeHandler}
          >
            충전하기
          </button>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={closeModal}
          >
            결제하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default PointPayModal;
