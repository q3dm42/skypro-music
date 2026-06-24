import type { TokenResponse, User } from '@/types/auth';

const USER_KEY = 'skypro-music-user';
const ACCESS_KEY = 'skypro-music-access';
const REFRESH_KEY = 'skypro-music-refresh';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getStoredUser(): User | null {
  if (!isBrowser()) {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return isBrowser() ? localStorage.getItem(ACCESS_KEY) : null;
}

export function getRefreshToken(): string | null {
  return isBrowser() ? localStorage.getItem(REFRESH_KEY) : null;
}

export function saveAuthData(user: User, tokens: TokenResponse): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ACCESS_KEY, tokens.access);
  localStorage.setItem(REFRESH_KEY, tokens.refresh);
}

export function saveAccessToken(access: string): void {
  if (isBrowser()) {
    localStorage.setItem(ACCESS_KEY, access);
  }
}

export function clearAuthData(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
