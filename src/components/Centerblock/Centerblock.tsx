import Filter from '../Filter/Filter';
import Playlist from '../Playlist/Playlist';
import Search from '../Search/Search';
import styles from './Centerblock.module.css';

export default function Centerblock() {
  return (
    <section className={styles.centerblock}>
      <Search />
      <h1 className={styles.h2}>Треки</h1>
      <Filter />

      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={`${styles.playlistTitleCol} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col04}`}>
            <svg className={styles.playlistTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <Playlist />
      </div>
    </section>
  );
}
