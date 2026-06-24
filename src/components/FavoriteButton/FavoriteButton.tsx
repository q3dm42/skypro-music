'use client';

import type { MouseEvent } from 'react';
import type { Track } from '@/types/track';
import { useFavoriteTrack } from '@/hooks/useFavoriteTrack';
import styles from './FavoriteButton.module.css';

type FavoriteButtonVariant = 'track' | 'bar';

type FavoriteButtonProps = {
  track: Track;
  variant: FavoriteButtonVariant;
  showCount?: boolean;
};

export default function FavoriteButton({
  track,
  variant,
  showCount = false,
}: FavoriteButtonProps) {
  const { error, isLiked, isLoading, likesCount, toggleFavorite } =
    useFavoriteTrack(track);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    void toggleFavorite();
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${styles[variant]} ${
          isLiked ? styles.active : ''
        }`}
        type="button"
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
      >
        <svg className={styles.icon}>
          <use href="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        {showCount && <span className={styles.count}>{likesCount}</span>}
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
