import { User } from '@/types/User';

const BASE_URL = import.meta.env.VITE_API_URL;
export async function refreshToken(
  currentRefreshToken: string
): Promise<{ accessToken: string; refreshToken: string; user: User } | null> {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: currentRefreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to refresh access token', error);
    return null;
  }
}
