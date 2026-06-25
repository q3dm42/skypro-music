import { refreshUserToken } from './auth';
import { API_BASE_URL, ApiError } from './client';
import {
  clearAuthData,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from '@/utils/authStorage';

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => null)) as T | {
    message?: string;
    detail?: string;
  } | null;

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data && data.message
        ? data.message
        : data && typeof data === 'object' && 'detail' in data && data.detail
          ? data.detail
          : `Ошибка запроса: ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return data as T;
}

async function authorizedFetch(
  path: string,
  init: RequestInit = {},
  accessToken: string,
): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
  });
}

export async function withReAuth<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new ApiError('Необходимо войти в аккаунт', 401);
  }

  let response = await authorizedFetch(path, init, accessToken);

  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthData();
      throw new ApiError('Сессия истекла. Войдите снова', 401);
    }

    const refreshedToken = await refreshUserToken(refreshToken);
    saveAccessToken(refreshedToken.access);
    response = await authorizedFetch(path, init, refreshedToken.access);
  }

  if (response.status === 401) {
    clearAuthData();
  }

  return parseResponse<T>(response);
}
