'use client';

import { useState } from 'react';
import type { Track } from '@/types/track';
import {
  getUniqueReleaseYears,
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
  tracks: Track[];
};

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const filters: FilterConfig[] = [
    {
      name: 'author',
      title: 'исполнителю',
      values: getUniqueTrackValues(tracks, (track) => track.author),
    },
    {
      name: 'year',
      title: 'году выпуска',
      values: getUniqueReleaseYears(tracks),
    },
    {
      name: 'genre',
      title: 'жанру',
      values: getUniqueTrackValues(tracks, (track) => track.genre),
    },
  ];

  const handleFilterClick = (filterName: FilterName) => {
    setActiveFilter((currentFilter) =>
      currentFilter === filterName ? null : filterName,
    );
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => {
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
                    <FilterItem key={value} value={value} />
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
