import { useAuthStore } from '../lib/store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const auth = useAuthStore.getState();
  let accessToken = auth.accessToken;

  // first attempt
  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  // try to refresh token and retry
  if (res.status === 401 && auth.refreshToken) {
    const refreshSuccess = await auth.refreshAccessToken();

    if (refreshSuccess) {
      accessToken = await useAuthStore.getState().accessToken;

      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...options.headers,
        },
      });
    } else {
      // Refresh token failed, clear auth and redirect to login
      auth.clearAuth();
      window.location.href = '/auth/login';
      throw new Error('Authentication failed. Please login again.');
    }
  }

  if (!res.ok) {
    // If we get here after a refresh attempt, it means the request still failed
    // Clear auth state and redirect to login
    if (res.status === 401) {
      auth.clearAuth();
      window.location.href = '/auth/login';
      throw new Error('Authentication failed. Please login again.');
    }

    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return res.json();
}
