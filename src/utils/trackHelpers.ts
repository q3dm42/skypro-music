import type { Track } from '@/data';

export function formatTrackTime(secondsTotal: number): string {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;

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
  const years = tracks.map((track) => track.releaseDate.slice(0, 4));

  return Array.from(new Set(years)).sort((first, second) =>
    second.localeCompare(first),
  );
}
