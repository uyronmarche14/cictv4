import api from './axios';
import { DashboardSummary } from '@/types';

export const adminAPI = {
  getDashboardSummary: async () => {
    const response = await api.get<{ success: boolean; data: DashboardSummary }>(
      '/admin/dashboard/summary'
    );
    return response.data.data;
  },
};
