import React from 'react';
import classes from './RangeSlider.module.css';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, onChange }) => {

  const handleSliderChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.value}>{value}px</div>
      <input
        type="range"
        value={value}
        onChange={handleSliderChange}
        className={classes.slider}
        min="10"
        max="80"
      />
    </div>
  );
};

export default RangeSlider;
