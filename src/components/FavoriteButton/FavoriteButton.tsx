'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent } from 'react';
import type { Track } from '@/types/track';
import { useFavoriteTrack } from '@/hooks/useFavoriteTrack';
import styles from './FavoriteButton.module.css';

const ERROR_OFFSET = 12;
const ERROR_WIDTH = 240;

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [errorPosition, setErrorPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (!error) {
      return;
    }

    const updateErrorPosition = () => {
      const wrapper = wrapperRef.current;

      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const maxLeft = Math.max(
        ERROR_OFFSET,
        window.innerWidth - ERROR_WIDTH - ERROR_OFFSET,
      );
      const left = Math.min(
        Math.max(ERROR_OFFSET, rect.right - ERROR_WIDTH),
        maxLeft,
      );
      const top = Math.max(ERROR_OFFSET, rect.top - 76);

      setErrorPosition({ left, top });
    };

    updateErrorPosition();
    window.addEventListener('resize', updateErrorPosition);
    window.addEventListener('scroll', updateErrorPosition, true);

    return () => {
      window.removeEventListener('resize', updateErrorPosition);
      window.removeEventListener('scroll', updateErrorPosition, true);
    };
  }, [error]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    void toggleFavorite();
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
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
      {error &&
        errorPosition &&
        createPortal(
          <div
            className={styles.error}
            style={{
              left: errorPosition.left,
              top: errorPosition.top,
            }}
          >
            {error}
          </div>,
          document.body,
        )}
    </div>
  );
}
