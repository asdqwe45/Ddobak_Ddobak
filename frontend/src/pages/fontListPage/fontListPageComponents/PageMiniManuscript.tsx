import classes from './PageMiniManuscript.module.css'

const PageMiniManuscript: React.FC = () => {

  return (
    <div className={classes.manuscriptLargeBox}>
      {/* 상 */}
      <div className={classes.manuscriptLine}></div>
      {/* 중 */}
      <div className={classes.manuscriptMiddleBox}>
        <div className={classes.manuscriptSmallBetweenBoxLeft}></div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>1</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>2</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>3</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>4</p>
        </div>
        <div className={classes.manuscriptSmallBox}>
          <p className={classes.manuscriptText}>5</p>
        </div>
        <div className={classes.manuscriptSmallBetweenBoxRight}></div>
      </div>
      {/* 하 */}
      <div className={classes.manuscriptLine}></div>
    </div>
  );
};
export default PageMiniManuscript;
