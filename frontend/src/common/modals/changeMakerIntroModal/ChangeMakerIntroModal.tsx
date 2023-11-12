import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeMakerIntroModalActions } from 'store/changeMakerIntroSlice';
import classes from './ChangeMakerIntroModal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { mainRedColor } from 'common/colors/CommonColors';
// import { userChangeInfoAPI } from 'https/utils/AuthFunction';
import { useState } from 'react';
import { changeMakerIntroRequest } from 'https/utils/FontFunction';

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

  const LoadMakerIntro = useSelector(
    (state: ChangeMakerIntroType) => state.changeMakerIntro.makerIntro,
  );

  const showMakerIntroModal = useSelector(
    (state: ChangeMakerIntroType) => state.changeMakerIntro.wantChange,
  );

  const [makerIntroInput, setMakerIntroInput] = useState<string>(LoadMakerIntro);

  const changeMakerIntro = () => {
    changeMakerIntroRequest(makerIntroInput);
    dispatch(changeMakerIntroModalActions.loadMakerIntro({ changeMakerIntro: makerIntroInput }));
    dispatch(changeMakerIntroModalActions.toggle());
  };
  
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
          <div className={classes.innerBox}>
            <textarea
              onChange={(e) => {
                setMakerIntroInput(e.target.value);
              }}
              className={classes.makerIntroArea}
            >
              {LoadMakerIntro}
            </textarea>
          </div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={changeMakerIntro}
          >
            수정하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ChangeMakerIntroModal;
