
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';
import { News, NewsStatus } from '@/types';

interface NewsResponse {
  success: boolean;
  data: {
    news: News[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export const useNews = (page = 1, limit = 10, status?: NewsStatus) => {
  return useQuery({
    queryKey: ['news', page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (status) {
        params.append('status', status);
      }
      
      const { data } = await api.get<NewsResponse>(`/news?${params.toString()}`);
      return data.data;
    },
  });
};

export const useLatestNews = () => {
  return useQuery({
    queryKey: ['latest-news'],
    queryFn: async () => {
      const { data } = await api.get<NewsResponse>('/news?page=1&limit=1&status=published');
      return data.data.news[0];
    },
  });
};
