import { useEffect } from 'react';
import classes from '../../pages/mainPage/mainPageComponents/MainPageLargeManuscript.module.css';
import modalClasses from './FontResultModal.module.css';
import ReactModal from 'react-modal';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resultModalActions } from 'store/resultModalSlice';
import { pointPayModalActions } from 'store/pointPayModalSlice';

import { mainRedColor } from 'common/colors/CommonColors';
import { AiOutlineClose } from 'react-icons/ai';



interface ResultModalState {
  resultModal: {
    resultIsVisible: boolean;
  };
}

const FontResultModal: React.FC = () => {
  // redux
  const dispatch = useDispatch();
  const clickResultHandler = () => {
    dispatch(resultModalActions.toggle());
  };
  const showResultModal = useSelector(
    (state: ResultModalState) => state.resultModal.resultIsVisible,
  );



  // 모달을 닫을 때 onRequestClose 함수 호출
  const closeModal = () => {
    clickResultHandler();
  };

  // 결제 모달 열기
  const clickPayHandler = () => {
    dispatch(pointPayModalActions.toggle())
  }



  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
  }, []);
  return (
    <ReactModal
      isOpen={showResultModal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={modalClasses.overLay}
      style={{
        content: {
          zIndex: 10001, // NavBar보다 2 높게 설정
          // ... other styles
        },
        overlay: {
          zIndex: 10000, // NavBar보다 1 높게 설정
          // ... other styles
        }
      }}
    >
        <div className={modalClasses.modalContainer}>
          <div className={modalClasses.modalBox} style={{ justifyContent: 'flex-end' }}>
            <AiOutlineClose
              size={40}
              onClick={clickResultHandler}
              className={modalClasses.closeIcon}
            />
          </div>
          {/* 원고지 헤더 시작 */}
          <div className={classes.headerBox}>
            <div className={classes.headerTextBox}>
              <p className={classes.headerNoText}>No.</p>
              <div className={classes.headerDiv}>
                <p className={classes.headerBigText}>1</p>
              </div>
            </div>
          </div>
          {/* 원고지 헤더 끝 */}
          {/* 원고지 시작 */}
          <div className={classes.largeBox}>
            {/* 빈칸 */}
            <div className={classes.blankLineBox}>{renderTopBlank()}</div>
            {/* 빈칸 끝 */}
            <div className={classes.lineBox}>
              {/* 1 */}
              <TextSmallBox innerText="또" />
              <TextSmallBox innerText="박" />
              <TextSmallBox innerText="또" />
              <TextSmallBox innerText="박" />
              <TextSmallBox innerText="이" />
              <TextSmallBox innerText="태" />
              <TextSmallBox innerText="성" />
              <TextSmallBox innerText="체" />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
              <TextSmallBox />
            </div>

            <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
            {renderLineBoxes(1)}
            {/* 빈칸 */}
            <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
            {/* 빈칸 끝 */}
            {/* 라인 시작 */}
            <div className={classes.lineBox}>
              {/* 1 */}
              <TextSmallBox />
              <TextSmallBox innerText="가" />
              <TextSmallBox innerText="나" />
              <TextSmallBox innerText="다" />
              <TextSmallBox innerText="라" />
              <TextSmallBox innerText="마" />
              <TextSmallBox innerText="바" />
              <TextSmallBox innerText="사" />
              <TextSmallBox innerText="아" />
              <TextSmallBox innerText="자" />
              <TextSmallBox innerText="차" />
              <TextSmallBox innerText="카" />
              <TextSmallBox innerText="타" />
              <TextSmallBox innerText="파" />
              <TextSmallBox innerText="하" />
              <TextSmallBox />
            </div>
            {/* 라인 끝 */}
            {/* 빈칸 */}
            <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
            {/* 빈칸 끝 */}
            {/* 세번 째 줄 */}
            {/* 라인 시작 */}
            <div className={classes.lineBox}>
              {/* 1 */}
              <TextSmallBox />
              <TextSmallBox innerText="다" />
              <TextSmallBox innerText="람" />
              <TextSmallBox innerText="쥐" />
              <TextSmallBox />
              <TextSmallBox innerText="헌" />
              <TextSmallBox />
              <TextSmallBox innerText="쳇" />
              <TextSmallBox innerText="바" />
              <TextSmallBox innerText="퀴" />
              <TextSmallBox innerText="에" />
              <TextSmallBox />
              <TextSmallBox innerText="타" />
              <TextSmallBox innerText="고" />
              <TextSmallBox innerText="파" />
              <TextSmallBox />
            </div>
            {/* 라인 끝 */}
            {/* 빈칸 */}
            <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
            {/* 빈칸 끝 */}
            {renderLineBoxes(2)}
            {/* 빈칸 */}
            <div className={classes.blankLineBox}>{renderBottomBlank()}</div>
            {/* 빈칸 끝 */}
          </div>
          {/* 원고지 끝 */}
          {/* 원고지 푸터 시작 */}
          <div className={classes.footerBox}>
            <div className={classes.footerTextBox}>
              <p className={classes.footerText}>16 X 6</p>
            </div>
          </div>
          {/* 원고지 푸터 끝 */}
          <div className={modalClasses.modalBox} style={{ justifyContent: 'center' }}>
            <button
              className={modalClasses.modalBtn}
              style={{ backgroundColor: mainRedColor, color: 'white' }}
              onClick={clickResultHandler}
            >
              제작취소
            </button>
            <button
              className={modalClasses.modalBtn}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              onClick={clickPayHandler}
            >
              결제하기
            </button>
          </div>
        </div>
    </ReactModal>
  );
};
export default FontResultModal;

// 내부 smallBox를 생성할 상수
const NUMBER_OF_SMALLBOXES = 16;

// smallBox를 생성하는 함수
const renderSmallBoxes = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SMALLBOXES; i++) {
    boxes.push(
      <div key={i + 'a'} className={classes.smallBox}>
        <div className={classes.content}></div>
      </div>,
    );
  }
  return boxes;
};

// lineBox 내부의 smallBox들을 포함하여 lineBox를 생성하는 함수
const renderLineBoxes = (line: number) => {
  let lineBoxes = [];
  for (let i = 0; i < line; i++) {
    lineBoxes.push(
      <div key={i + 'b1'} className={classes.lineBox}>
        {renderSmallBoxes()}
      </div>,
    );
    if (i === 0) {
      lineBoxes.push(
        <div key={i + 'b2'} className={classes.blankMiddleLine}>
          {renderLineBlank()}
        </div>,
      );
    }
  }
  return lineBoxes;
};

const renderLineBlank = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SMALLBOXES; i++) {
    if (i === 0) {
      boxes.push(
        <div key={i + 'c1'} className={classes.blankBoxleft}>
          <div className={classes.blankContent}></div>
        </div>,
      );
    } else if (i === NUMBER_OF_SMALLBOXES - 1) {
      boxes.push(
        <div key={i + 'c2'} className={classes.blankBoxRight}>
          <div className={classes.blankContent}></div>
        </div>,
      );
    } else {
      boxes.push(
        <div key={i + 'c3'} className={classes.blankBox}>
          <div className={classes.blankContent}></div>
        </div>,
      );
    }
  }
  return boxes;
};

const renderTopBlank = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SMALLBOXES; i++) {
    boxes.push(
      <div key={i + 'd'} className={classes.blankTopBox}>
        <div className={classes.blankContent}></div>
      </div>,
    );
  }
  return boxes;
};
const renderBottomBlank = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SMALLBOXES; i++) {
    boxes.push(
      <div key={i + 'e'} className={classes.blankBottomBox}>
        <div className={classes.blankContent}></div>
      </div>,
    );
  }
  return boxes;
};

interface TextSmallBoxProps {
  innerText?: string;
}

const TextSmallBox: React.FC<TextSmallBoxProps> = ({ innerText }) => {
  return (
    <div className={classes.smallBox}>
      <div className={classes.content}>
        <p className={modalClasses.modalContentText}>{innerText}</p>
      </div>
    </div>
  );
};
