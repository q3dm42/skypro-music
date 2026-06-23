'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { setIsPlaying } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './Bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audio.pause();
    }
  }, [currentTrack, dispatch, isPlaying]);

  const handlePlayToggle = () => {
    if (!currentTrack) {
      return;
    }

    dispatch(setIsPlaying(!isPlaying));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        onEnded={() => dispatch(setIsPlaying(false))}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <button className={styles.playerBtnPrev} type="button">
                <svg className={styles.playerBtnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button
                className={styles.playerBtnPlay}
                type="button"
                onClick={handlePlayToggle}
                aria-label={isPlaying ? 'Поставить на паузу' : 'Воспроизвести'}
              >
                {isPlaying ? (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 15 19">
                    <path d="M2 0H5V19H2V0Z" fill="white" />
                    <path d="M10 0H13V19H10V0Z" fill="white" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg}>
                    <use href="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                )}
              </button>
              <button className={styles.playerBtnNext} type="button">
                <svg className={styles.playerBtnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button className={styles.playerBtnRepeat} type="button">
                <svg className={styles.playerBtnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </button>
              <button className={styles.playerBtnShuffle} type="button">
                <svg className={styles.playerBtnShuffleSvg}>
                  <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </button>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <Link className={styles.trackPlayAuthorLink} href="/">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <Link className={styles.trackPlayAlbumLink} href="/">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use href="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={styles.volumeProgress}>
                <input
                  className={styles.volumeProgressLine}
                  type="range"
                  name="volume"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
