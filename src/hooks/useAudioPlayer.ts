'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  toggleLoop,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

type PlayerProgress = {
  trackId: number | null;
  currentTime: number;
  duration: number;
};

const INITIAL_PROGRESS: PlayerProgress = {
  trackId: null,
  currentTime: 0,
  duration: 0,
};

export function useAudioPlayer() {
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
  const [progress, setProgress] = useState<PlayerProgress>(INITIAL_PROGRESS);
  const [volume, setVolume] = useState(0.5);

  const stopPlayback = useCallback(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch]);

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
      audio.play().catch(stopPlayback);
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, stopPlayback]);

  const handlePlayToggle = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    dispatch(setIsPlaying(!isPlaying));
  }, [currentTrack, dispatch, isPlaying]);

  const handleCanPlay = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || !isPlaying) {
      return;
    }

    audio.play().catch(stopPlayback);
  }, [isPlaying, stopPlayback]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setProgress({
      trackId: currentTrack?._id ?? null,
      currentTime: 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
    });
  }, [currentTrack?._id]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setProgress((currentProgress) => ({
      ...currentProgress,
      trackId: currentTrack?._id ?? currentProgress.trackId,
      currentTime: audio.currentTime,
    }));
  }, [currentTrack?._id]);

  const handleProgressChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
    },
    [],
  );

  const handleVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setVolume(Number(event.target.value));
    },
    [],
  );

  const handleNextTrack = useCallback(() => {
    dispatch(setNextTrack());
  }, [dispatch]);

  const handlePrevTrack = useCallback(() => {
    dispatch(setPrevTrack());
  }, [dispatch]);

  const handleLoopToggle = useCallback(() => {
    dispatch(toggleLoop());
  }, [dispatch]);

  const handleShuffleToggle = useCallback(() => {
    dispatch(toggleShuffle());
  }, [dispatch]);

  const handleTrackEnd = useCallback(() => {
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
  }, [currentTrack, dispatch, isLoop, isShuffle, playlist, shuffledPlaylist]);

  const isCurrentTrackLoaded = progress.trackId === currentTrack?._id;

  return {
    audioRef,
    currentTime: isCurrentTrackLoaded ? progress.currentTime : 0,
    currentTrack,
    duration: isCurrentTrackLoaded ? progress.duration : 0,
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
  };
}
