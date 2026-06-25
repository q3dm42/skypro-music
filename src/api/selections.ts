import type {
  Selection,
  SelectionResponse,
  SelectionsResponse,
  Track,
} from '@/types/track';
import { API_BASE_URL } from './client';
import { getTracks } from './tracks';

export async function getSelections(): Promise<Selection[]> {
  const response = await fetch(`${API_BASE_URL}/catalog/selection/all/`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Selections request failed with status ${response.status}`);
  }

  const result = (await response.json()) as SelectionsResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error('Selections response has unexpected shape');
  }

  return result.data;
}

export async function getSelection(id: number): Promise<Selection> {
  const response = await fetch(`${API_BASE_URL}/catalog/selection/${id}/`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Selection request failed with status ${response.status}`);
  }

  const result = (await response.json()) as SelectionResponse;

  if (!result.success || !result.data) {
    throw new Error('Подборка не найдена');
  }

  return result.data;
}

export async function getSelectionTracks(id: number): Promise<{
  selection: Selection;
  tracks: Track[];
}> {
  const [selection, tracks] = await Promise.all([getSelection(id), getTracks()]);
  const trackIds = new Set(selection.items);

  return {
    selection,
    tracks: tracks.filter((track) => trackIds.has(track._id)),
  };
}
