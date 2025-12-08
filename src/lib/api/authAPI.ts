import { User } from '@/types/User';
import { apiFetch } from './apiFetch';

const ROUTE_PREFIX = '/auth';

export function loginUser(data: { email: string; password: string }) {
  return apiFetch<{ user: User; accessToken: string; refreshToken: string }>(
    `${ROUTE_PREFIX}/login`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

export function logoutUser(accessToken: string) {
  return apiFetch(`${ROUTE_PREFIX}/logout`, {
    method: 'POST',
    headers: [['Authorization', `Bearer ${accessToken}`]],
  });
}

export function requestPasswordReset(data: { email: string }) {
  return apiFetch<{ message: string }>(
    `${ROUTE_PREFIX}/request-password-reset`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

export function resetPassword(data: { token: string; password: string }) {
  return apiFetch<{ message: string }>(`${ROUTE_PREFIX}/reset-password`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function googleLogin(data: { token: string }) {
  return apiFetch<{ user: User; accessToken: string; refreshToken: string }>(
    `${ROUTE_PREFIX}/google`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}
