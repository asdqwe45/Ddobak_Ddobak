import { useEffect, useState } from 'react';
import classes from '../../../pages/mainPage/mainPageComponents/MainPageLargeManuscript.module.css';
import modalClasses from './FontResultModal.module.css';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { resultModalActions } from 'store/resultModalSlice';
import { RotatingLines } from 'react-loader-spinner';

import { mainRedColor } from 'common/colors/CommonColors';
import { AiOutlineClose } from 'react-icons/ai';

import GaImg from './fontResultModalAssets/가.png';

interface ResultModalState {
  resultModal: {
    resultIsVisible: boolean;
  };
}

const FontResultModal: React.FC = () => {
  const BaseFonts = [
    { name: '고딕체', value: 'NanumGothic' },
    { name: '굴림체', value: 'NanumGolim' },
    { name: '돋움체', value: 'NanumDodum' },
    { name: '바탕체', value: 'NanumBatang' },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [baseFont, setBaseFont] = useState<string>('');
  const [fontSelected, setFontSelected] = useState<boolean>(false);
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

  const clickCloseIcon = () => {
    return alert('제작취소 또는 정보입력을 선택해주세요.');
  };

  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.
    // 30초 후에 isLoading을 false로 설정
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 30000ms = 30s

    // 1초마다 elapsedTime 업데이트
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000); // 1000ms = 1s

    // 컴포넌트가 언마운트될 때 타이머와 인터벌을 취소
    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, [fontSelected]);

  // 제작 취소
  const cancleHandler = async () => {
    window.location.reload();
  };

  // 폰트 정보 입력페이지 이동
  const goToFontOptionStep = () => {
    dispatch(resultModalActions.setStep(3));
    dispatch(resultModalActions.toggle());
  };

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
        },
      }}
    >
      <div className={modalClasses.modalContainer}>
        {isLoading ? (
          <>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            <p className={modalClasses.justASecond}>잠깐만 기다려주세요... {elapsedTime}초 경과</p>
          </>
        ) : (
          <>
            <div className={modalClasses.modalBox} style={{ justifyContent: 'flex-end' }}>
              <AiOutlineClose
                size={40}
                onClick={clickCloseIcon}
                className={modalClasses.closeIcon}
              />
            </div>
            {fontSelected ? (
              <>
                <div className={classes.headerBox}>
                  <div className={classes.headerTextBox}>
                    <p className={classes.headerNoText}>No.</p>
                    <div className={classes.headerDiv}>
                      <p className={classes.headerBigText}>1</p>
                    </div>
                  </div>
                </div>
                <div className={classes.largeBox}>
                  <div className={classes.blankLineBox}>{renderTopBlank()}</div>
                  <div className={classes.lineBox}>
                    <TextSmallBox innerText="폰" />
                    <TextSmallBox innerText="트" />
                    <TextSmallBox />
                    <TextSmallBox innerText="미" />
                    <TextSmallBox innerText="리" />
                    <TextSmallBox innerText="보" />
                    <TextSmallBox innerText="기" />
                    <TextSmallBox />
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
                  <div className={classes.lineBox}>
                    <TextSmallBox />
                    <div className={classes.smallBox}>
                      <div className={classes.content}>
                        <img src={GaImg} alt="가" className={modalClasses.fontImg} />
                      </div>
                    </div>
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
                  <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
                  <div className={classes.lineBox}>
                    <TextSmallBox />
                    <TextSmallBox innerText="A" />
                    <TextSmallBox innerText="B" />
                    <TextSmallBox innerText="C" />
                    <TextSmallBox innerText="D" />
                    <TextSmallBox innerText="E" />
                    <TextSmallBox innerText="F" />
                    <TextSmallBox innerText="G" />
                    <TextSmallBox innerText="H" />
                    <TextSmallBox innerText="I" />
                    <TextSmallBox innerText="J" />
                    <TextSmallBox innerText="K" />
                    <TextSmallBox innerText="L" />
                    <TextSmallBox innerText="M" />
                    <TextSmallBox innerText="N" />
                    <TextSmallBox />
                  </div>
                  <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
                  {renderLineBoxes(2)}
                  <div className={classes.blankLineBox}>{renderBottomBlank()}</div>
                </div>
                <div className={classes.footerBox}>
                  <div className={classes.footerTextBox}>
                    <p className={classes.footerText}>16 X 6</p>
                  </div>
                </div>
              </>
            ) : (
              <div className={modalClasses.baseFonts}>
                {BaseFonts.map((font) => {
                  return (
                    <div key={font.value} className={modalClasses.baseFont}>
                      <div className={modalClasses.label}>
                        <input
                          onChange={(e) => {
                            setBaseFont(font.value);
                          }}
                          checked={font.value === baseFont ? true : false}
                          type="radio"
                          value={font.value}
                        />
                        <label>{font.name}</label>
                      </div>
                      <div>다람쥐 헌 쳇바퀴 굴리고파</div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={modalClasses.buttonBox} style={{ justifyContent: 'center' }}>
              <button
                className={modalClasses.modalBtn}
                style={{ backgroundColor: mainRedColor, color: 'white' }}
                onClick={cancleHandler}
              >
                제작취소
              </button>
              {fontSelected ? (
                <button
                  className={modalClasses.modalBtn}
                  style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  onClick={goToFontOptionStep}
                >
                  정보입력
                </button>
              ) : (
                <button
                  className={modalClasses.modalBtn}
                  style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  onClick={() => {
                    if (baseFont === '') {
                      alert('폰트를 선택해주세요.');
                    } else {
                      setFontSelected(true);
                    }
                  }}
                >
                  샘플보기
                </button>
              )}
            </div>
          </>
        )}
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
