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
import { successModalActions } from 'store/successModalSlice';
import { axiosWithAuth, getData } from 'https/http';
import AlertCustomModal from '../alertCustomModal/AlertCustomModal';
import { refreshActions } from 'store/refreshSlice';

interface PointModalState {
  pointModal: {
    pointPayVisible: false;
    howMuch: number;
    boughtSometing: string;
    isPaid: false;
    sellerId: number;
    fontId: number;
    buyAll: { sellerId: 0; fontId: 0 }[];
    makeFontRequest: {
      fontId: string;
      fontSortUrl: string;
      korFontName: string;
      engFontName: string;
      openStatus: boolean;
      freeStatus: boolean;
      price: number;
      introduceText: string;
      keywords: string[];
    };
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
    async function fetch() {
      if (await checkToken()) {
        userMypageAPI()
          .then(async (r) => {
            await setCurrentPoint(r.point);
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
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const makeFontRequest = useSelector((state: PointModalState) => state.pointModal.makeFontRequest);
  const boughtSomething = useSelector((state: PointModalState) => state.pointModal.boughtSometing);
  const buyAll = useSelector((state: PointModalState) => state.pointModal.buyAll);
  const payHandler = async () => {
    const productionStatus = await getData('bonjour');
    if (currentPoint < howMuch) {
      if (productionStatus) {
        setShowAlertModal(true);
        return null;
      } else {
        if (boughtSomething === '폰트제작') {
          await axiosWithAuth
            .put('/font/make/request', makeFontRequest)
            .then(async (r) => {
              // clickPayHandler();
              // 다음 페이지로 이동
              dispatch(resultModalActions.nextStep());
              dispatch(
                successModalActions.showSomething({
                  successHeader: '첫 번째 폰트 제작',
                  successContext: '이용해주셔서 감사합니다.❤',
                }),
              );
              return;
            })
            .catch((e) => {
              console.error(e);
            });
          return;
        }
      }
    }
    dispatch(pointPayModalActions.resetState());
    // 결제가 완료되면 순차적으로 실행
    console.log(makeFontRequest);
    if (boughtSomething === '폰트제작') {
      await axiosWithAuth
        .put('/font/make/request', makeFontRequest)
        .then(async (r) => {
          // clickPayHandler();
          // 다음 페이지로 이동
          dispatch(resultModalActions.nextStep());
          if (productionStatus) {
            dispatch(
              successModalActions.showSomething({
                successHeader: '제작 결제 완료',
                successContext: '이용해주셔서 감사합니다.',
              }),
            );
          } else {
            dispatch(
              successModalActions.showSomething({
                successHeader: '첫 번째 폰트 제작',
                successContext: '이용해주셔서 감사합니다.❤',
              }),
            );
          }
          return;
        })
        .catch((e) => {
          console.error(e);
        });
      return;
    }

    await transactionPurchaseAPI(buyAll)
      .then(async (r) => {
        if (boughtSomething === '폰트구매') {
          // 장바구니 삭제
          const data = [];
          // buyAll
          for (const bA of buyAll) {
            data.push(bA.fontId);
          }
          if (data.length > 0) {
            cartDeleteAPI(data)
              .then(async (r) => { })
              .catch((e) => {
                console.error(e);
              });
          }
          dispatch(refreshActions.detailPlus());
          closeModal();
          dispatch(pointPayModalActions.resetState());
          dispatch(
            successModalActions.showSomething({
              successHeader: '[ 구매 완료 ]',
              successContext: '마이페이지에서 ttf 파일을 다운 받을 수 있습니다.',
            }),
          );
        } else if (boughtSomething === '장바구니구매') {
          // 장바구니 삭제
          const data = [];
          // buyAll
          for (const bA of buyAll) {
            data.push(bA.fontId);
          }
          cartDeleteAPI(data)
            .then(async (r) => {
              closeModal();
              dispatch(pointPayModalActions.resetState());
              dispatch(
                successModalActions.showSomething({
                  successHeader: '구매 완료',
                  successContext: '장바구니 구매를 완료했어요!',
                }),
              );
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
    <>
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
      <AlertCustomModal
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
        message1="금액을 확인해주세요!"
        message2=""
        btnName="확인"
      />
    </>
  );
};

export default PointPayModal;
