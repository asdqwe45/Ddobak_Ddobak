import classes from './CommonEmptyBox.module.css';
import EmptyBox from './commonEmptyBoxAssets/EmptyBox.svg';

const CommonEmptyBox: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerBox}>
        <img src={EmptyBox} alt="" className={classes.innerIcon} />
        <h1 className={classes.innerHeader}>아무것도 들어있지 않습니다.</h1>
      </div>
    </div>
  );
};
export default CommonEmptyBox;
