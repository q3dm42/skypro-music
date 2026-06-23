import styles from './FilterItem.module.css';

type FilterItemProps = {
  value: string;
};

export default function FilterItem({ value }: FilterItemProps) {
  return <li className={styles.filterItem}>{value}</li>;
}
