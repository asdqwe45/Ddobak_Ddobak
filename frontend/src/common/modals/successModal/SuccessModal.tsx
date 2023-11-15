import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { successModalActions } from 'store/successModalSlice';
import { mainRedColor } from 'common/colors/CommonColors';
import classes from './SuccessModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheck2Circle, BsCartCheck, BsCartXFill, BsFillCartCheckFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';

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
  const successVisible = useSelector((state: SuccessType) => state.successModal.successVisible);
  const successHeader = useSelector((state: SuccessType) => state.successModal.successHeader);
  const successContext = useSelector((state: SuccessType) => state.successModal.successContext);

  const dispatch = useDispatch();
  const closeModal = async () => {
    if (successContext === '장바구니 구매를 완료했어요!') {
      dispatch(successModalActions.showSomething({ successHeader: '', successContext: '' }));
      window.location.reload();
    } else if (successHeader === '인출 요청') {
      dispatch(successModalActions.showSomething({ successHeader: '', successContext: '' }));
      window.location.reload();
    } else if (successHeader === '충전 완료') {
      dispatch(successModalActions.showSomething({ successHeader: '', successContext: '' }));
      window.location.reload();
    } else {
      dispatch(successModalActions.showSomething({ successHeader: '', successContext: '' }));
    }
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
        {successContext === '장바구니 구매를 완료했어요!' ? (
          <>
            <BsCartCheck size={100} color={mainRedColor} style={{ marginBottom: 10 }} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '폰트 구매' ? (
          <>
            <BsCheck2Circle size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '폰트 제작 결제' ? (
          <>
            <FaHeart size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '인출 요청' ? (
          <>
            <FaMoneyBillTransfer size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '충전 완료' ? (
          <>
            <GiReceiveMoney size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '담기 완료' ? (
          <>
            <BsFillCartCheckFill size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}
        {successHeader === '담기 실패' ? (
          <>
            <BsCartXFill size={100} color={mainRedColor} />
          </>
        ) : (
          <></>
        )}

        <h1 className={classes.innerHeader}>{successHeader}</h1>
        <p className={classes.innerText}>{successContext}</p>

        <div className={classes.bottomBox}>
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
