import type { Track, TracksResponse } from '@/types/track';
import { withReAuth } from './authorized';

type FavoriteTrackResponse =
  | Track
  | {
      success: boolean;
      data: Track;
    };

function normalizeFavoriteTrackResponse(response: FavoriteTrackResponse): Track {
  if ('data' in response) {
    return response.data;
  }

  return response;
}

export async function getFavoriteTracks(): Promise<Track[]> {
  const response = await withReAuth<TracksResponse>(
    '/catalog/track/favorite/all/',
  );

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error('Favorite tracks response has unexpected shape');
  }

  return response.data;
}

export async function addTrackToFavorites(trackId: number): Promise<Track> {
  const response = await withReAuth<FavoriteTrackResponse>(
    `/catalog/track/${trackId}/favorite/`,
    {
      method: 'POST',
    },
  );

  return normalizeFavoriteTrackResponse(response);
}

export async function removeTrackFromFavorites(trackId: number): Promise<Track> {
  const response = await withReAuth<FavoriteTrackResponse>(
    `/catalog/track/${trackId}/favorite/`,
    {
      method: 'DELETE',
    },
  );

  return normalizeFavoriteTrackResponse(response);
}
