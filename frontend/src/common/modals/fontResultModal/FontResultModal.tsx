import { useEffect, useState } from 'react';
import modalClasses from './FontResultModal.module.css';
import classes from 'pages/mainPage/mainPageComponents/MainPageLargeManuscript.module.css';
import ReactModal from 'react-modal';

import { useSelector, useDispatch } from 'react-redux';
import { resultModalActions } from 'store/resultModalSlice';
import type { RootState } from 'store';

import { AiOutlineClose } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import { mainRedColor } from 'common/colors/CommonColors';
import { makeFontPreveiwReqeust, makeFontSettingRequest } from 'https/utils/FontFunction';

interface ResultModalState {
  resultModal: {
    resultIsVisible: boolean;
  };
}

interface PreviewImgType {
  [name: string]: string;
}

const FontResultModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [previewImgs, setPreviewImgs] = useState<PreviewImgType>({});
  const hangeul = [
    '가.png',
    '나.png',
    '다.png',
    '라.png',
    '마.png',
    '바.png',
    '사.png',
    '아.png',
    '자.png',
    '차.png',
    '카.png',
    '파.png',
    '타.png',
  ];

  const english = [
    '0041.png',
    '0042.png',
    '0043.png',
    '0044.png',
    '0045.png',
    '0046.png',
    '0047.png',
    '0048.png',
    '0049.png',
    '004A.png',
    '004B.png',
    '004C.png',
    '004D.png',
    '004E.png',
  ];

  // redux
  const dispatch = useDispatch();
  const sortedUrl = useSelector((state: RootState) => state.resultModal.sortUrl);

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
    clickResultHandler();
    // return alert('제작취소 또는 정보입력을 선택해주세요.');
  };

  useEffect(() => {
    if (sortedUrl) {
      makeFontPreveiwReqeust(sortedUrl).then((r) => {
        setPreviewImgs(r);
        setIsLoading(false);
      });

      ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.

      // 1초마다 elapsedTime 업데이트
      const interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000); // 1000ms = 1s

      // 컴포넌트가 언마운트될 때 타이머와 인터벌을 취소
      return () => {
        clearInterval(interval);
      };
    }
  }, [sortedUrl]);

  // 제작 취소
  const cancleHandler = async () => {
    window.location.reload();
  };

  // 폰트 정보 입력페이지 이동
  const goToFontOptionStep = () => {
    makeFontSettingRequest(sortedUrl)
      .then((r) => {
        dispatch(resultModalActions.setFontId(r.fontId));
      })
      .then(() => {
        dispatch(resultModalActions.setStep(3));
        dispatch(resultModalActions.toggle());
      });
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
                {renderLineBoxes(1)}
                <div className={classes.lineBox}>
                  <TextSmallBox />
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
                </div>
                <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
                {renderLineBoxes(1)}
                <div className={classes.lineBox}>
                  <TextSmallBox />
                  {hangeul.map((value) => {
                    // console.log('여기4', value);
                    return (
                      <div key={value} className={classes.smallBox}>
                        <div className={classes.content}>
                          <img
                            src={previewImgs[value]}
                            alt={value}
                            className={modalClasses.fontImg}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <TextSmallBox />
                </div>
                <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
                <div className={classes.lineBox}>
                  <TextSmallBox />
                  {english.map((value) => {
                    return (
                      <div key={value} className={classes.smallBox}>
                        <div className={classes.content}>
                          <img
                            src={previewImgs[value]}
                            alt={value}
                            className={modalClasses.fontImg}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <TextSmallBox />
                </div>
                <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
                {renderLineBoxes(1)}
                <div className={classes.blankLineBox}>{renderTopBlank()}</div>
                <div className={classes.blankLineBox}></div>
              </div>
              <div className={classes.footerBox}>
                <div className={classes.footerTextBox}>
                  <p className={classes.footerText}>16 X 6</p>
                </div>
              </div>
            </>
            <div className={modalClasses.buttonBox} style={{ justifyContent: 'center' }}>
              <button
                className={modalClasses.modalBtn}
                style={{ backgroundColor: mainRedColor, color: 'white' }}
                onClick={cancleHandler}
              >
                제작취소
              </button>

              <button
                className={modalClasses.modalBtn}
                style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                onClick={goToFontOptionStep}
              >
                정보입력
              </button>
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
