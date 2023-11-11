import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeMakerIntroModalActions } from 'store/changeMakerIntroSlice';
import classes from './ChangeMakerIntroModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';
// import { userChangeInfoAPI } from 'https/utils/AuthFunction';


interface ChangeMakerIntroType {
  changeMakerIntro: {
    wantChange: boolean;
    makerIntro: string;
  };
}

const ChangeMakerIntroModal: React.FC = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(changeMakerIntroModalActions.toggle());
  };

//   const changeMakerIntro = () => {
//     userChangeInfoAPI
//   }

  const showMakerIntroModal = useSelector(
    (state: ChangeMakerIntroType) => state.changeMakerIntro.wantChange,
  );
  return (
    <ReactModal
      isOpen={showMakerIntroModal}
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
          <div className={classes.innerBox}></div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            // onClick={changeMakerIntro}
          >
            수정하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ChangeMakerIntroModal;
