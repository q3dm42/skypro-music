'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addTrackToFavorites,
  removeTrackFromFavorites,
} from '@/api/favorites';
import type { Track } from '@/types/track';
import { getStoredUser } from '@/utils/authStorage';

type FavoritePayload = {
  trackId: number;
  staredUser: number[];
};

const FAVORITE_EVENT = 'skypro-music-favorite-updated';

function dispatchFavoriteUpdate(payload: FavoritePayload): void {
  window.dispatchEvent(
    new CustomEvent<FavoritePayload>(FAVORITE_EVENT, { detail: payload }),
  );
}

export function useFavoriteTrack(track: Track) {
  const user = useMemo(() => getStoredUser(), []);
  const [favoriteState, setFavoriteState] = useState<{
    trackId: number;
    staredUser: number[];
  }>(() => ({
    trackId: track._id,
    staredUser: track.staredUser,
  }));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const staredUser =
    favoriteState.trackId === track._id
      ? favoriteState.staredUser
      : track.staredUser;
  const isLiked = user ? staredUser.includes(user._id) : false;

  useEffect(() => {
    const handleFavoriteUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<FavoritePayload>;

      if (customEvent.detail.trackId === track._id) {
        setFavoriteState({
          trackId: customEvent.detail.trackId,
          staredUser: customEvent.detail.staredUser,
        });
      }
    };

    window.addEventListener(FAVORITE_EVENT, handleFavoriteUpdate);

    return () => {
      window.removeEventListener(FAVORITE_EVENT, handleFavoriteUpdate);
    };
  }, [track._id]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [error]);

  const toggleFavorite = useCallback(async () => {
    setError('');

    if (!user) {
      setError('Войдите в аккаунт, чтобы добавлять треки в избранное');
      return;
    }

    setIsLoading(true);

    try {
      const updatedTrack = isLiked
        ? await removeTrackFromFavorites(track._id)
        : await addTrackToFavorites(track._id);

      setFavoriteState({
        trackId: updatedTrack._id,
        staredUser: updatedTrack.staredUser,
      });
      dispatchFavoriteUpdate({
        trackId: updatedTrack._id,
        staredUser: updatedTrack.staredUser,
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Не удалось обновить избранное',
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, track._id, user]);

  return {
    error,
    isLiked,
    isLoading,
    likesCount: staredUser.length,
    toggleFavorite,
  };
}
