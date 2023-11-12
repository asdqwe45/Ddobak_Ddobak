import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { basketErrorModalActions } from 'store/basketErrorModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import classes from './BasketErrorModal.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface BasketType {
  basketError: {
    basketVisible: boolean;
  };
}

const BasketErrorModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  const navigate = useNavigate();
  const basketVisible = useSelector((state: BasketType) => state.basketError.basketVisible);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(basketErrorModalActions.toggle());
  };
  const goToBasketHandler = () => {
    closeModal();
    navigate('/myPage', {
      state: { pageValue: 'fontBasket' },
    });
    window.location.reload();
  };
  return (
    <ReactModal
      isOpen={basketVisible}
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
        <FaCartPlus size={100} color={mainRedColor} />
        <h1 className={classes.innerHeader}>장바구니 중복</h1>
        <p className={classes.innerText}>이미 장바구니에 들어있어요.</p>

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
            onClick={goToBasketHandler}
          >
            장바구니 확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default BasketErrorModal;
