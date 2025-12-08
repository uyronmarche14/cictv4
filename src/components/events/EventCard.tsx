'use client';

import { Event, eventAPI } from '@/lib/api/event';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isJoined = isAuthenticated && user && event.attendees.includes(user._id);
  const isFull = event.maxAttendees > 0 && event.attendees.length >= event.maxAttendees;
  const isPast = new Date(event.endDate) < new Date();

  const joinMutation = useMutation({
    mutationFn: () => eventAPI.join(event._id),
    onSuccess: () => {
      toast.success('Successfully joined the event!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to join event');
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => eventAPI.leave(event._id),
    onSuccess: () => {
      toast.success('Left the event.');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to leave event');
    },
  });

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking button
    
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (isJoined) {
      if (confirm('Are you sure you want to leave this event?')) {
        leaveMutation.mutate();
      }
    } else {
      joinMutation.mutate();
    }
  };

  const handleCardClick = () => {
    router.push(`/events/${event._id}`);
  };

  const isLoading = joinMutation.isPending || leaveMutation.isPending;

  return (
    <Card 
      className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full bg-gray-100">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/20">
            <Calendar className="w-12 h-12 opacity-50" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
            {event.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <div>
                 <Badge variant="outline" className="mb-2">
                    {format(new Date(event.startDate), 'MMM dd, yyyy')}
                 </Badge>
                <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
            </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {event.excerpt || event.description}
        </p>

        <div className="space-y-2 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
                {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>
                {event.attendees.length} 
                {event.maxAttendees > 0 ? ` / ${event.maxAttendees}` : ''} Attending
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t">
        <Button 
            className="w-full" 
            onClick={handleAction}
            disabled={isLoading || (isFull && !isJoined) || isPast}
            variant={isJoined ? "outline" : "default"}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          {isPast ? "Event Ended" : 
           isJoined ? "Leave Event" : 
           isFull ? "Event Full" : 
           "Join Event"}
        </Button>
      </CardFooter>
    </Card>
  );
}
