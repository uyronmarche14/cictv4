import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  logoutUser,
  requestPasswordReset,
  resetPassword,
} from '@/lib/api/authAPI';
import { useAuthStore, AuthState } from '@/lib/store/authStore';

// Logout
export const useLogout = () => {
  const accessToken = useAuthStore((state: AuthState) => state.accessToken);
  const clearAuth = useAuthStore((state: AuthState) => state.clearAuth);
  const router = useRouter();

  const queryClient = useQueryClient();

  // Create the mutation without immediately navigating
  const mutation = useMutation({
    mutationFn: () => {
      // If there's no access token, just return a resolved promise
      if (!accessToken) {
        return Promise.resolve();
      }
      return logoutUser(accessToken);
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear(); // Clear the query cache
      router.replace('/');
      // Clear browser history to prevent back navigation to protected routes
      window.history.replaceState(null, '', '/');
    },
    onError: (error: Error) => {
      // Handle errors, but still clear auth and redirect on logout errors
      const errorMessage = error.message || 'Logout failed';
      toast.error(errorMessage, { position: 'top-center' });
      clearAuth();
      queryClient.clear();
      router.replace('/');
      // Clear browser history to prevent back navigation to protected routes
      window.history.replaceState(null, '', '/');
    },
  });

  // Return the mutation controls
  return mutation;
};

// Request Password Reset
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message || 'Password reset email sent successfully!', {
        position: 'top-center',
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to send password reset email';
      toast.error(errorMessage, { position: 'top-center' });
    },
  });
};

// Reset Password
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: { message: string }) => {
      toast.success(data.message || 'Password reset successfully!', {
        position: 'top-center',
      });
      router.push('/auth/login');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to reset password';
      toast.error(errorMessage, { position: 'top-center' });
    },
  });
};
