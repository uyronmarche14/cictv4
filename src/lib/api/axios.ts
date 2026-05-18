import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const shouldForceAdminLogout =
      error.response?.status === 401 ||
      (error.response?.status === 403 &&
        ['Your account has been deactivated', 'User no longer exists', 'Your assigned role is no longer valid'].includes(
          error.response?.data?.message
        ));

    if (shouldForceAdminLogout) {
      // Only redirect to admin login if we are actually in the admin section
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
