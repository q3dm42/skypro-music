import type { Track as TrackType } from '@/data';
import styles from './Track.module.css';

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>{track.title}</span>
          </div>
        </div>

        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{track.author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{track.album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use href="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>{track.duration}</span>
        </div>
      </div>
    </div>
  );
}
