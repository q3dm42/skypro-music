'use client';

import type { Track as TrackType } from '@/types/track';
import { setCurrentTrack, setIsPlaying } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { formatTrackTime } from '@/utils/trackHelpers';
import styles from './Track.module.css';

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);

  const isCurrentTrack = currentTrack?._id === track._id;

  const handleTrackClick = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  return (
    <button
      className={styles.playlistItem}
      type="button"
      onClick={handleTrackClick}
    >
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrentTrack ? (
              <div
                className={`${styles.playingDot} ${
                  isPlaying ? styles.playingDotActive : ''
                }`}
              ></div>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div
            className={`${styles.trackTitleText} ${
              isCurrentTrack ? styles.activeTrackText : ''
            }`}
          >
            <span className={styles.trackTitleLink}>{track.name}</span>
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
          <span className={styles.trackTimeText}>
            {formatTrackTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </button>
  );
}
