import api from './axios';

export interface Event {
  _id: string;
  title: string;
  description: string;
  excerpt: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  location: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  attendees: string[]; // IDs of attendees
  maxAttendees: number;
  imageUrl?: string;
  tags: string[];
  isRegistrationOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  success: boolean;
  data: {
    events: Event[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface SingleEventResponse {
  success: boolean;
  data: {
    event: Event;
  };
}

export const eventAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; search?: string; upcoming?: boolean }) => {
    const response = await api.get<EventsResponse>('/events', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<SingleEventResponse>(`/events/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    // For FormData (image upload)
    const response = await api.post<SingleEventResponse>('/events', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put<SingleEventResponse>(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  join: async (id: string) => {
    const response = await api.post<SingleEventResponse>(`/events/${id}/join`);
    return response.data;
  },

  leave: async (id: string) => {
    const response = await api.post<SingleEventResponse>(`/events/${id}/leave`);
    return response.data;
  },

  publish: async (id: string) => {
       // Assuming publish is just an update to status, but if there's a specific endpoint:
       // For now using update
       return eventAPI.update(id, { status: 'published' });
  }
};
