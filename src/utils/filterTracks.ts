import type { Track } from '@/types/track';

export type SortOrder = 'default' | 'new' | 'old';

export type TrackFilters = {
  author: string | null;
  genre: string | null;
  sortOrder: SortOrder;
  search: string;
};

export const defaultTrackFilters: TrackFilters = {
  author: null,
  genre: null,
  sortOrder: 'default',
  search: '',
};

function getTrackTime(releaseDate: string): number {
  const time = new Date(releaseDate).getTime();

  return Number.isFinite(time) ? time : 0;
}

export function searchTracks(tracks: Track[], search: string): Track[] {
  const query = search.trim().toLowerCase();

  if (!query) {
    return tracks;
  }

  return tracks.filter((track) => track.name.toLowerCase().startsWith(query));
}

export function filterTracksByAuthor(
  tracks: Track[],
  author: string | null,
): Track[] {
  if (!author) {
    return tracks;
  }

  return tracks.filter((track) => track.author === author);
}

export function filterTracksByGenre(
  tracks: Track[],
  genre: string | null,
): Track[] {
  if (!genre) {
    return tracks;
  }

  return tracks.filter((track) => track.genre.includes(genre));
}

export function sortTracks(tracks: Track[], sortOrder: SortOrder): Track[] {
  if (sortOrder === 'default') {
    return tracks;
  }

  return [...tracks].sort((firstTrack, secondTrack) => {
    const firstTrackTime = getTrackTime(firstTrack.release_date);
    const secondTrackTime = getTrackTime(secondTrack.release_date);

    return sortOrder === 'new'
      ? secondTrackTime - firstTrackTime
      : firstTrackTime - secondTrackTime;
  });
}

export function applyTrackFilters(
  tracks: Track[],
  filters: TrackFilters,
): Track[] {
  const searchedTracks = searchTracks(tracks, filters.search);
  const authorFilteredTracks = filterTracksByAuthor(
    searchedTracks,
    filters.author,
  );
  const genreFilteredTracks = filterTracksByGenre(
    authorFilteredTracks,
    filters.genre,
  );

  return sortTracks(genreFilteredTracks, filters.sortOrder);
}
