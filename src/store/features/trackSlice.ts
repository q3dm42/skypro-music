import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/types/track';

type TrackState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  shuffledPlaylist: Track[];
  isShuffle: boolean;
  isLoop: boolean;
};

const initialState: TrackState = {
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isLoop: false,
};

const shuffleTracks = (tracks: Track[]): Track[] =>
  [...tracks].sort(() => Math.random() - 0.5);

const getActivePlaylist = (state: TrackState) =>
  state.isShuffle ? state.shuffledPlaylist : state.playlist;

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = shuffleTracks(action.payload);
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setNextTrack: (state) => {
      if (!state.currentTrack) {
        return;
      }

      const activePlaylist = getActivePlaylist(state);
      const currentIndex = activePlaylist.findIndex(
        (track) => track._id === state.currentTrack?._id,
      );

      if (currentIndex >= 0 && currentIndex < activePlaylist.length - 1) {
        state.currentTrack = activePlaylist[currentIndex + 1];
        state.isPlaying = true;
      }
    },
    setPrevTrack: (state) => {
      if (!state.currentTrack) {
        return;
      }

      const activePlaylist = getActivePlaylist(state);
      const currentIndex = activePlaylist.findIndex(
        (track) => track._id === state.currentTrack?._id,
      );

      if (currentIndex > 0) {
        state.currentTrack = activePlaylist[currentIndex - 1];
        state.isPlaying = true;
      }
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;

      if (state.isShuffle) {
        const shuffledTracks = shuffleTracks(state.playlist);

        if (state.currentTrack) {
          state.shuffledPlaylist = [
            state.currentTrack,
            ...shuffledTracks.filter(
              (track) => track._id !== state.currentTrack?._id,
            ),
          ];
        } else {
          state.shuffledPlaylist = shuffledTracks;
        }
      }
    },
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  toggleLoop,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
