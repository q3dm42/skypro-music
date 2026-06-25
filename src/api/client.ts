export const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type ApiErrorBody = {
  message?: string;
  detail?: string;
};

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === 'object' && value !== null;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...init?.headers,
    },
  });

  const data = (await response.json().catch(() => null)) as
    | ApiErrorBody
    | T
    | null;

  if (!response.ok) {
    const message = isApiErrorBody(data)
      ? data.message || data.detail || `Ошибка запроса: ${response.status}`
      : `Ошибка запроса: ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return data as T;
}
