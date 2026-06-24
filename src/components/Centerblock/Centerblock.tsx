'use client';

import { useMemo, useState } from 'react';
import type { Track } from '@/types/track';
import {
  applyTrackFilters,
  defaultTrackFilters,
  type TrackFilters,
} from '@/utils/filterTracks';
import Filter from '../Filter/Filter';
import Playlist from '../Playlist/Playlist';
import Search from '../Search/Search';
import styles from './Centerblock.module.css';

type CenterblockProps = {
  tracks: Track[];
  title: string;
};

export default function Centerblock({ tracks, title }: CenterblockProps) {
  const [filters, setFilters] = useState<TrackFilters>(defaultTrackFilters);
  const filteredTracks = useMemo(
    () => applyTrackFilters(tracks, filters),
    [filters, tracks],
  );

  const handleSearchChange = (search: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search,
    }));
  };

  return (
    <section className={styles.centerblock}>
      <Search value={filters.search} onChange={handleSearchChange} />
      <h1 className={styles.h2}>{title}</h1>
      <Filter filters={filters} onFilterChange={setFilters} tracks={tracks} />

      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={`${styles.playlistTitleCol} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col04}`}>
            <svg className={styles.playlistTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        {filteredTracks.length > 0 ? (
          <Playlist tracks={filteredTracks} />
        ) : (
          <div className={styles.empty}>Нет подходящих треков</div>
        )}
      </div>
    </section>
  );
}
