import styles from './Filter.module.css';

const filters = ['исполнителю', 'году выпуска', 'жанру'];

export default function Filter() {
  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <div className={styles.filterWrapper} key={filter}>
          <button className={styles.filter__button} type="button">
            {filter}
          </button>
        </div>
      ))}
    </div>
  );
}
