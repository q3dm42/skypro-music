'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFavoriteTracks } from '@/api/favorites';
import type { Track } from '@/types/track';
import { getAccessToken } from '@/utils/authStorage';
import Centerblock from '../Centerblock/Centerblock';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './FavoritesContent.module.css';

export default function FavoritesContent() {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setError('');

    if (!getAccessToken()) {
      setIsLoading(false);
      router.replace('/signin');
      return;
    }

    setIsLoading(true);

    try {
      const favoriteTracks = await getFavoriteTracks();
      setTracks(favoriteTracks);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось загрузить избранные треки',
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void Promise.resolve().then(loadFavorites);
  }, [loadFavorites]);

  useEffect(() => {
    const handleFavoriteUpdate = () => {
      void loadFavorites();
    };

    window.addEventListener('skypro-music-favorite-updated', handleFavoriteUpdate);

    return () => {
      window.removeEventListener(
        'skypro-music-favorite-updated',
        handleFavoriteUpdate,
      );
    };
  }, [loadFavorites]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <Centerblock title="Мой плейлист" tracks={tracks} />;
}
