import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '@/types/track';

type TrackState = {
  currentTrack: Track | null;
  isPlaying: boolean;
};

const initialState: TrackState = {
  currentTrack: null,
  isPlaying: false,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPlaying } = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
