import React, { useState } from 'react';
import classes from './RangeSlider.module.css';

const RangeSlider: React.FC = () => {
  const [value, setValue] = useState<number>(50);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.value}>{value}px</div>
      <input
        type="range"
        min="10"
        max="80"
        value={value}
        onChange={handleChange}
        className={classes.slider}
      />
    </div>
  );
};

export default RangeSlider;
