import type { ChangeEvent } from 'react';
import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  max: number;
  value: number;
  step: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export default function ProgressBar({
  max,
  value,
  step,
  onChange,
  disabled,
}: ProgressBarProps) {
  return (
    <input
      className={styles.progress}
      type="range"
      min="0"
      max={max}
      value={value}
      step={step}
      onChange={onChange}
      disabled={disabled}
      aria-label="Прогресс трека"
    />
  );
}
