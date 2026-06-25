import type { Track } from '@/types/track';

export function createTrack(track: Partial<Track> & { _id: number }): Track {
  return {
    _id: track._id,
    name: track.name ?? `Track ${track._id}`,
    author: track.author ?? 'Author',
    release_date: track.release_date ?? '2020-01-01',
    genre: track.genre ?? ['Pop'],
    duration_in_seconds: track.duration_in_seconds ?? 120,
    album: track.album ?? 'Album',
    logo: track.logo ?? null,
    track_file: track.track_file ?? 'https://example.com/track.mp3',
    staredUser: track.staredUser ?? [],
  };
}
