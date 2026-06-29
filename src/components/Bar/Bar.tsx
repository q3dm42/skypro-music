'use client';

import Link from 'next/link';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { formatTrackTime } from '@/utils/trackHelpers';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './Bar.module.css';

export default function Bar() {
  const {
    audioRef,
    currentTime,
    currentTrack,
    duration,
    handleCanPlay,
    handleLoadedMetadata,
    handleLoopToggle,
    handleNextTrack,
    handlePlayToggle,
    handlePrevTrack,
    handleProgressChange,
    handleShuffleToggle,
    handleTimeUpdate,
    handleTrackEnd,
    handleVolumeChange,
    isLoop,
    isPlaying,
    isShuffle,
    volume,
  } = useAudioPlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLoop}
        onCanPlay={handleCanPlay}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      <div className={styles.barContent}>
        <div className={styles.barTiming}>
          <span>{formatTrackTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTrackTime(duration)}</span>
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.1}
          disabled={duration === 0}
          onChange={handleProgressChange}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <button
                className={styles.playerBtnPrev}
                type="button"
                onClick={handlePrevTrack}
                aria-label="Предыдущий трек"
              >
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
              <button
                className={styles.playerBtnNext}
                type="button"
                onClick={handleNextTrack}
                aria-label="Следующий трек"
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button
                className={`${styles.playerBtnRepeat} ${
                  isLoop ? styles.btnActive : ''
                }`}
                type="button"
                onClick={handleLoopToggle}
                aria-label="Зациклить трек"
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </button>
              <button
                className={`${styles.playerBtnShuffle} ${
                  isShuffle ? styles.btnActive : ''
                }`}
                type="button"
                onClick={handleShuffleToggle}
                aria-label="Перемешать плейлист"
              >
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
              <FavoriteButton track={currentTrack} variant="bar" showCount />
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
