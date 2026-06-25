import type { Track, TracksResponse } from '@/types/track';

const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export async function getTracks(): Promise<Track[]> {
  const response = await fetch(`${API_BASE_URL}/catalog/track/all/`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Tracks request failed with status ${response.status}`);
  }

  const result = (await response.json()) as TracksResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error('Tracks response has unexpected shape');
  }

  return result.data;
}
