import classes from '../MainPage.module.css';

const MainPageMiniManuscript: React.FC = () => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    // 컴포넌트를 클릭하면 새 탭에서 링크가 열리도록 합니다.
    <div
      className={classes.manuscriptLargeBox}
      onClick={() =>
        openInNewTab(
          'https://docs.google.com/forms/d/e/1FAIpQLSf5f1bmZ3pNujhn4btVEmVxn28vw0UloKx884Iczxcs-SQZjA/viewform',
        )
      }
    >
      {/* 상 */}
      <div className={classes.manuscriptLine}></div>
      {/* 중 */}
      <div className={classes.manuscriptMiddleBox}>
        <div className={classes.manuscriptSmallBetweenBoxLeft}></div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>고</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>객</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>문</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>의</p>
        </div>
        <div className={classes.manuscriptSmallBetweenBoxRight}></div>
      </div>
      {/* 하 */}
      <div className={classes.manuscriptLine}></div>
    </div>
  );
};
export default MainPageMiniManuscript;
