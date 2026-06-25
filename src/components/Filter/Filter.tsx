'use client';

import { useMemo, useState } from 'react';
import type { Track } from '@/types/track';
import type { SortOrder, TrackFilters } from '@/utils/filterTracks';
import {
  getUniqueTrackValues,
} from '@/utils/trackHelpers';
import FilterItem from '../FilterItem/FilterItem';
import styles from './Filter.module.css';

type FilterName = 'author' | 'year' | 'genre';

type FilterConfig = {
  name: FilterName;
  title: string;
  values: string[];
};

type FilterProps = {
  filters: TrackFilters;
  onFilterChange: (filters: TrackFilters) => void;
  tracks: Track[];
};

const SORT_LABELS: Record<SortOrder, string> = {
  default: 'По умолчанию',
  new: 'Сначала новые',
  old: 'Сначала старые',
};

const SORT_VALUES = Object.values(SORT_LABELS);

function getSortOrderByLabel(label: string): SortOrder {
  const sortOrder = Object.entries(SORT_LABELS).find(
    ([, currentLabel]) => currentLabel === label,
  )?.[0];

  return (sortOrder as SortOrder | undefined) ?? 'default';
}

export default function Filter({
  filters,
  onFilterChange,
  tracks,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const filterConfigs: FilterConfig[] = useMemo(
    () => [
      {
        name: 'author',
        title: 'исполнителю',
        values: getUniqueTrackValues(tracks, (track) => track.author),
      },
      {
        name: 'year',
        title: 'году выпуска',
        values: SORT_VALUES,
      },
      {
        name: 'genre',
        title: 'жанру',
        values: getUniqueTrackValues(tracks, (track) => track.genre),
      },
    ],
    [tracks],
  );

  const handleFilterClick = (filterName: FilterName) => {
    setActiveFilter((currentFilter) =>
      currentFilter === filterName ? null : filterName,
    );
  };

  const handleFilterItemSelect = (filterName: FilterName, value: string) => {
    if (filterName === 'author') {
      onFilterChange({
        ...filters,
        author: filters.author === value ? null : value,
      });
      return;
    }

    if (filterName === 'genre') {
      onFilterChange({
        ...filters,
        genre: filters.genre === value ? null : value,
      });
      return;
    }

    onFilterChange({
      ...filters,
      sortOrder: getSortOrderByLabel(value),
    });
  };

  const isSelected = (filterName: FilterName, value: string) => {
    if (filterName === 'author') {
      return filters.author === value;
    }

    if (filterName === 'genre') {
      return filters.genre === value;
    }

    return filters.sortOrder === getSortOrderByLabel(value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filterConfigs.map((filter) => {
        const isActive = activeFilter === filter.name;

        return (
          <div className={styles.filterWrapper} key={filter.name}>
            <button
              className={`${styles.filter__button} ${isActive ? styles.active : ''}`}
              type="button"
              onClick={() => handleFilterClick(filter.name)}
            >
              {filter.title}
              {isActive && (
                <span className={styles.filterCount}>
                  {filter.values.length}
                </span>
              )}
            </button>

            {isActive && (
              <div className={styles.filter__popup}>
                <ul className={styles.filter__list}>
                  {filter.values.map((value) => (
                    <FilterItem
                      key={value}
                      value={value}
                      isSelected={isSelected(filter.name, value)}
                      onSelect={(selectedValue) =>
                        handleFilterItemSelect(filter.name, selectedValue)
                      }
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
