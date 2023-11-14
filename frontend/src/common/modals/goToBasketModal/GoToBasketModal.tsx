import { useEffect } from 'react';
import ReactModal from 'react-modal';
import classes from './GoToBasketModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { goToBasketModalActions } from 'store/goToBasketModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor, likeCountColor } from 'common/colors/CommonColors';
import { useNavigate } from 'react-router-dom';
interface GoToBasketModalState {
  goToBasket: {
    basketVisible: boolean;
  };
}
const GoToBasketModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(goToBasketModalActions.toggle());
  };
  const showBasketModal = useSelector(
    (state: GoToBasketModalState) => state.goToBasket.basketVisible,
  );
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);

  const goToBasketHandler = () => {
    closeModal();
    navigate('/myPage', {
      state: { pageValue: 'fontBasket' },
    });
    window.location.reload();
  };
  return (
    <ReactModal
      isOpen={showBasketModal}
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
        <div className={classes.middleBox}>
          <p className={classes.innerText}>
            장바구니에 폰트를 잘 담았어요.
          </p>
        </div>
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
export default GoToBasketModal;
