import classes from '../../pages/mainPage/mainPageComponents/MainPageLargeManuscript.module.css';
import modalClasses from "./FontResultModal.module.css"

const FontResultModal: React.FC = () => {
  return (
    <div className={modalClasses.modalContainer}>
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
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 당 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>당</p>
            </div>
          </div>
          {/* 신 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>신</p>
            </div>
          </div>
          {/* 의 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>의</p>
            </div>
          </div>
          {/* 빈칸 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 손 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>손</p>
            </div>
          </div>
          {/* 글 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>글</p>
            </div>
          </div>
          {/* 씨 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>씨</p>
            </div>
          </div>
          {/* 를 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>를</p>
            </div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
        </div>

        <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
        {renderLineBoxes(1)}
        {/* 빈칸 */}
        <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
        {/* 빈칸 끝 */}
        {/* 라인 시작 */}
        <div className={classes.lineBox}>
          {/* 1 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 당 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>당</p>
            </div>
          </div>
          {/* 신 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>신</p>
            </div>
          </div>
          {/* 의 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>의</p>
            </div>
          </div>
          {/* 빈칸 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 손 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>손</p>
            </div>
          </div>
          {/* 글 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>글</p>
            </div>
          </div>
          {/* 씨 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>씨</p>
            </div>
          </div>
          {/* 를 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>를</p>
            </div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
        </div>
        {/* 라인 끝 */}
        {/* 빈칸 */}
        <div className={classes.blankMiddleLine}>{renderLineBlank()}</div>
        {/* 빈칸 끝 */}
        {/* 세번 째 줄 */}
        {/* 라인 시작 */}
        <div className={classes.lineBox}>
          {/* 1 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 폰 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>폰</p>
            </div>
          </div>
          {/* 트 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>트</p>
            </div>
          </div>
          {/* 로 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>로</p>
            </div>
          </div>
          {/* 빈칸 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 만 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>만</p>
            </div>
          </div>
          {/* 들 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>들</p>
            </div>
          </div>
          {/* 어 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>어</p>
            </div>
          </div>
          {/* 빈칸 */}
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          {/* 드 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>드</p>
            </div>
          </div>
          {/* 립 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>립</p>
            </div>
          </div>
          {/* 니 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>니</p>
            </div>
          </div>
          {/* 다 */}
          <div className={classes.smallBox}>
            <div className={classes.content}>
              <p className={classes.contentText}>다</p>
            </div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
          <div className={classes.smallBox}>
            <div className={classes.content}></div>
          </div>
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
    </div>
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
