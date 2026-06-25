'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  toggleLoop,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { formatTrackTime } from '@/utils/trackHelpers';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './Bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);
  const isShuffle = useAppSelector((state) => state.track.isShuffle);
  const isLoop = useAppSelector((state) => state.track.isLoop);
  const playlist = useAppSelector((state) => state.track.playlist);
  const shuffledPlaylist = useAppSelector(
    (state) => state.track.shuffledPlaylist,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<{
    trackId: number | null;
    currentTime: number;
    duration: number;
  }>({
    trackId: null,
    currentTime: 0,
    duration: 0,
  });
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

  const handleCanPlay = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setProgress({
      trackId: currentTrack?._id ?? null,
      currentTime: 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
    });
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (audio) {
      setProgress((currentProgress) => ({
        ...currentProgress,
        trackId: currentTrack?._id ?? currentProgress.trackId,
        currentTime: audio.currentTime,
      }));
    }
  };

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);

    if (!audio) {
      return;
    }

    audio.currentTime = nextTime;
    setProgress((currentProgress) => ({
      ...currentProgress,
      currentTime: nextTime,
    }));
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleNextTrack = () => {
    dispatch(setNextTrack());
  };

  const handlePrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const handleTrackEnd = () => {
    if (isLoop || !currentTrack) {
      return;
    }

    const activePlaylist = isShuffle ? shuffledPlaylist : playlist;
    const currentIndex = activePlaylist.findIndex(
      (track) => track._id === currentTrack._id,
    );

    if (currentIndex >= 0 && currentIndex < activePlaylist.length - 1) {
      dispatch(setNextTrack());
    } else {
      dispatch(setIsPlaying(false));
    }
  };

  if (!currentTrack) {
    return null;
  }

  const isCurrentTrackLoaded = progress.trackId === currentTrack._id;
  const currentTime = isCurrentTrackLoaded ? progress.currentTime : 0;
  const duration = isCurrentTrackLoaded ? progress.duration : 0;

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
                onClick={() => dispatch(toggleLoop())}
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
                onClick={() => dispatch(toggleShuffle())}
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
