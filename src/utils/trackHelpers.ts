import type { Track } from '@/types/track';

export function formatTrackTime(secondsTotal: number): string {
  const safeSecondsTotal = Number.isFinite(secondsTotal)
    ? Math.floor(secondsTotal)
    : 0;
  const minutes = Math.floor(safeSecondsTotal / 60);
  const seconds = safeSecondsTotal % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getUniqueTrackValues(
  tracks: Track[],
  selector: (track: Track) => string | string[],
): string[] {
  const values = new Set<string>();

  tracks.forEach((track) => {
    const selectedValue = selector(track);
    const selectedValues = Array.isArray(selectedValue)
      ? selectedValue
      : [selectedValue];

    selectedValues.forEach((value) => values.add(value));
  });

  return Array.from(values).sort((first, second) =>
    first.localeCompare(second, 'ru'),
  );
}

export function getUniqueReleaseYears(tracks: Track[]): string[] {
  const years = tracks
    .map((track) => track.release_date.slice(0, 4))
    .filter(Boolean);

  return Array.from(new Set(years)).sort((first, second) =>
    second.localeCompare(first),
  );
}
