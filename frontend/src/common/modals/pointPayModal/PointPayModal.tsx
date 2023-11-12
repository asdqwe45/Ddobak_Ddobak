import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import classes from './PointPayModal.module.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { pointPayModalActions } from 'store/pointPayModalSlice';
import { chargePointModalActions } from 'store/chargePointModalSlice';

import { AiOutlineClose } from 'react-icons/ai';
import { borderColor, mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import { resultModalActions } from 'store/resultModalSlice';
import { checkToken, userMypageAPI } from 'https/utils/AuthFunction';
import { transactionPurchaseAPI } from 'https/utils/TransactionFunction';
import { cartDeleteAPI } from 'https/utils/CartFunction';

interface PointModalState {
  pointModal: {
    pointPayVisible: false;
    howMuch: number;
    boughtSometing: string;
    isPaid: false;
    sellerId: number;
    fontId: number;
    buyAll: { sellerId: 0; fontId: 0 }[];
  };
}

interface ChargePointType {
  chargePoint: {
    chargePointVisible: boolean;
    myPoint: number;
    nickname: string;
    isModal: boolean;
    chargeCount: number;
  };
}

const PointPayModal: React.FC = () => {
  const [currentPoint, setCurrentPoint] = useState<number>(0);
  const refresh = useSelector((state: ChargePointType) => state.chargePoint.chargeCount);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(refresh);
    console.log('아무거나');
    async function fetch() {
      if (await checkToken()) {
        userMypageAPI()
          .then((r) => {
            console.log(r);
            setCurrentPoint(r.point);
            dispatch(
              chargePointModalActions.currentMyState({ myPoint: r.point, nickname: r.nickname }),
            );
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
    fetch();
  }, [refresh, dispatch]);

  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const clickPayHandler = () => {
    dispatch(pointPayModalActions.toggle());
  };
  const showPayModal = useSelector((state: PointModalState) => state.pointModal.pointPayVisible);
  const howMuch = useSelector((state: PointModalState) => state.pointModal.howMuch);
  const closeModal = () => {
    clickPayHandler();
  };
  const clickChargeHandler = () => {
    dispatch(chargePointModalActions.toggle());
  };

  const boughtSomething = useSelector((state: PointModalState) => state.pointModal.boughtSometing);
  // const fontId = useSelector((state: PointModalState) => state.pointModal.fontId)
  const buyAll = useSelector((state: PointModalState) => state.pointModal.buyAll);
  const payHandler = async () => {
    // 결제가 완료되면 순차적으로 실행
    transactionPurchaseAPI(buyAll)
      .then(async (r) => {
        console.log(r);
        if (boughtSomething === '폰트제작') {
          dispatch(pointPayModalActions.paidSomething());
          clickPayHandler();
          // 다음 페이지로 이동
          dispatch(resultModalActions.nextStep());
          return;
        } else if (boughtSomething === '폰트구매') {
          // 장바구니 삭제
          const data = [];
          // buyAll
          for (const bA of buyAll) {
            data.push(bA.fontId);
          }
          cartDeleteAPI(data)
            .then(async (r) => {
              console.log(r);
              closeModal();
              dispatch(pointPayModalActions.resetState());
              window.location.reload();
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (boughtSomething === '장바구니구매') {
          // 장바구니 삭제
          const data = [];
          // buyAll
          for (const bA of buyAll) {
            data.push(bA.fontId);
          }
          cartDeleteAPI(data)
            .then(async (r) => {
              console.log(r);
              closeModal();
              dispatch(pointPayModalActions.resetState());
              window.location.reload();
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          closeModal();
          dispatch(pointPayModalActions.resetState());
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  function formatNumberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const notEnoughPoint = () => {
    if (currentPoint >= howMuch) {
      return 0;
    }
    return formatNumberWithCommas(howMuch - currentPoint);
  };

  const restPoint = () => {
    if (currentPoint >= howMuch) {
      return formatNumberWithCommas(currentPoint - howMuch);
    }
    return 0;
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
            <p className={classes.innerText}>{formatNumberWithCommas(currentPoint)} P</p>
          </div>
          <div className={classes.innerBox}>
            <p className={classes.innerText}>구매 포인트</p>
            <p className={classes.innerText}>{formatNumberWithCommas(howMuch)} P</p>
          </div>
          <div className={classes.innerBox}>
            <p className={classes.innerText}>잔여 포인트</p>
            <p className={classes.innerText}>{restPoint()} P</p>
          </div>
          <div
            className={classes.innerBox}
            style={{ borderTop: 2, borderColor: borderColor, borderTopStyle: 'solid' }}
          >
            <p className={classes.innerText} style={{ color: mainRedColor }}>
              부족 포인트
            </p>
            <p className={classes.innerText} style={{ color: mainRedColor }}>
              {notEnoughPoint()} P
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
            onClick={payHandler}
          >
            결제하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default PointPayModal;
