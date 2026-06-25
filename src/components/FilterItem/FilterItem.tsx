import styles from './FilterItem.module.css';

type FilterItemProps = {
  isSelected?: boolean;
  onSelect: (value: string) => void;
  value: string;
};

export default function FilterItem({
  isSelected = false,
  onSelect,
  value,
}: FilterItemProps) {
  return (
    <li>
      <button
        className={`${styles.filterItem} ${isSelected ? styles.selected : ''}`}
        type="button"
        onClick={() => onSelect(value)}
      >
        {value}
      </button>
    </li>
  );
}
