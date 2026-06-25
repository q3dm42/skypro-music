import type { Track, TracksResponse } from '@/types/track';
import { withReAuth } from './authorized';

export async function getFavoriteTracks(): Promise<Track[]> {
  const response = await withReAuth<TracksResponse>(
    '/catalog/track/favorite/all/',
  );

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error('Favorite tracks response has unexpected shape');
  }

  return response.data;
}

export async function addTrackToFavorites(trackId: number): Promise<void> {
  await withReAuth<unknown>(
    `/catalog/track/${trackId}/favorite/`,
    {
      method: 'POST',
    },
  );
}

export async function removeTrackFromFavorites(trackId: number): Promise<void> {
  await withReAuth<unknown>(
    `/catalog/track/${trackId}/favorite/`,
    {
      method: 'DELETE',
    },
  );
}
