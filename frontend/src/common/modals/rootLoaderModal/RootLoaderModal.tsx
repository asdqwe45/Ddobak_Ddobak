import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { rootLoaderModalActions } from 'store/rootLoaderModalSlice';
import classes from './RootLoaderModal.module.css';
import { RotatingLines } from 'react-loader-spinner';
import { mainRedColor } from 'common/colors/CommonColors';

interface RootLoaderType {
  rootLoader: {
    isVisible: boolean;
    header: string;
    context: string;
    type: string;
    subContext: string;
  };
}

const RootLoaderModal: React.FC = () => {
  const dispatch = useDispatch();
  const closeModal = async () => {
    dispatch(
      rootLoaderModalActions.toggleModal({ type: '', header: '', context: '', subContext: '' }),
    );
  };
  const header = useSelector((state: RootLoaderType) => state.rootLoader.header);
  const context = useSelector((state: RootLoaderType) => state.rootLoader.context);
  const subContext = useSelector((state: RootLoaderType) => state.rootLoader.subContext);
  const isVisible = useSelector((state: RootLoaderType) => state.rootLoader.isVisible);
  return (
    <ReactModal
      isOpen={isVisible}
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
        <div className={classes.topBox}></div>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
        <h1 className={classes.innerHeader}>{header}</h1>
        <p className={classes.innerText} style={{ marginBottom: 0 }}>
          {context}
        </p>
        <p className={classes.innerText} style={{ color: mainRedColor }}>
          {subContext}
        </p>

        <div className={classes.bottomBox}></div>
      </div>
    </ReactModal>
  );
};
export default RootLoaderModal;
