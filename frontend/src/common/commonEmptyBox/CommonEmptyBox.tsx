import classes from './CommonEmptyBox.module.css';
import EmptyBox from "./commonEmptyBoxAssets/EmptyBox.svg"

const CommonEmptyBox: React.FC = () => {
  return <div className={classes.container}>
    <div className={classes.innerBox}>
        <img src={EmptyBox} alt="" className={classes.innerIcon} />
        <h1 className={classes.innerHeader}>Empty</h1>
        <p className={classes.innerContext}>아무것도 들어있지 않습니다.</p>
    </div>
  </div>;
};
export default CommonEmptyBox;
