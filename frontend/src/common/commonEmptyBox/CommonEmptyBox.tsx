import classes from './CommonEmptyBox.module.css';
import EmptyBox2 from './commonEmptyBoxAssets/EmptyBox2.svg';

interface CommonEmptyBoxType {
  text: string;
}

const CommonEmptyBox: React.FC<CommonEmptyBoxType> = ({ text }) => {
  return (
    <div className={classes.container}>
      <div className={classes.innerBox}>
        <img src={EmptyBox2} alt="" className={classes.innerIcon} />
        <h1 className={classes.innerHeader}>{text}</h1>
      </div>
    </div>
  );
};
export default CommonEmptyBox;
