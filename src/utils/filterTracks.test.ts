import { describe, expect, it } from 'vitest';
import {
  applyTrackFilters,
  filterTracksByAuthor,
  filterTracksByGenre,
  searchTracks,
  sortTracks,
} from './filterTracks';
import { formatTrackTime, getUniqueTrackValues } from './trackHelpers';
import { createTrack } from '@/test/trackFactory';

const tracks = [
  createTrack({
    _id: 1,
    name: 'Alpha',
    author: 'Nero',
    release_date: '2020-01-01',
    genre: ['Rock'],
  }),
  createTrack({
    _id: 2,
    name: 'Beta',
    author: 'Mixkit',
    release_date: '2022-01-01',
    genre: ['Jazz', 'Rock'],
  }),
  createTrack({
    _id: 3,
    name: 'Alpine',
    author: 'Nero',
    release_date: '2019-01-01',
    genre: ['Pop'],
  }),
];

describe('track helpers', () => {
  it('formats finite and invalid time values', () => {
    expect(formatTrackTime(65.8)).toBe('1:05');
    expect(formatTrackTime(Number.NaN)).toBe('0:00');
  });

  it('returns unique sorted values', () => {
    expect(getUniqueTrackValues(tracks, (track) => track.genre)).toEqual([
      'Jazz',
      'Pop',
      'Rock',
    ]);
  });
});

describe('filterTracks pure functions', () => {
  it('searches tracks by the beginning of the title', () => {
    expect(searchTracks(tracks, 'Al').map((track) => track.name)).toEqual([
      'Alpha',
      'Alpine',
    ]);
  });

  it('filters by author and genre', () => {
    expect(filterTracksByAuthor(tracks, 'Nero')).toHaveLength(2);
    expect(filterTracksByGenre(tracks, 'Rock')).toHaveLength(2);
  });

  it('sorts tracks by release date', () => {
    expect(sortTracks(tracks, 'new').map((track) => track._id)).toEqual([
      2, 1, 3,
    ]);
    expect(sortTracks(tracks, 'old').map((track) => track._id)).toEqual([
      3, 1, 2,
    ]);
  });

  it('combines search, filters and sorting', () => {
    const result = applyTrackFilters(tracks, {
      author: 'Nero',
      genre: null,
      search: 'Al',
      sortOrder: 'old',
    });

    expect(result.map((track) => track._id)).toEqual([3, 1]);
  });
});
