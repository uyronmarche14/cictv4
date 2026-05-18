/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EventCard } from './EventCard';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

describe('EventCard', () => {
  it('keeps public events browse-only in the MVP', () => {
    render(
      <EventCard
        event={{
          _id: 'event-1',
          title: 'Future Event',
          description: 'A future event description',
          excerpt: 'A future event excerpt',
          organizer: {
            _id: 'organizer-1',
            firstName: 'Pat',
            lastName: 'Organizer',
            email: 'pat@example.com',
          },
          startDate: '2030-01-01T09:00:00.000Z',
          endDate: '2030-01-01T11:00:00.000Z',
          location: 'CICT Hall',
          status: 'published',
          attendees: [],
          maxAttendees: 100,
          tags: [],
          isRegistrationOpen: false,
          createdAt: '2030-01-01T00:00:00.000Z',
          updatedAt: '2030-01-01T00:00:00.000Z',
        }}
      />
    );

    expect(screen.getByText('Registration Coming Soon')).toBeTruthy();
    expect(screen.queryByText(/join event/i)).toBeNull();
    expect(screen.queryByText(/leave event/i)).toBeNull();

    fireEvent.click(screen.getByText('Future Event'));
    expect(push).toHaveBeenCalledWith('/events/event-1');
  });
});
