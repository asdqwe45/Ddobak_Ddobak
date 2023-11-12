import React, { CSSProperties } from 'react';
import classes from './RadioBtn.module.css';

interface RadioButtonsProps {
  options: string[];
  name: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
}

const RadioBtn: React.FC<RadioButtonsProps> = ({
  options,
  name,
  onChange,
  style,
}) => {
  return (
    <div style={{ display: 'flex', ...style }}>
      {' '}
      {options.map((option) => (
        <div key={option} className={classes.radioContainer}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            className={classes.radioInput}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={option} className={classes.radioLabel}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioBtn;
