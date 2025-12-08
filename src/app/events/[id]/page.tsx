'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventAPI } from '@/lib/api/event';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Loader2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import MeshGradientBg from '@/components/ripplebg';
import Image from 'next/image';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const eventId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventAPI.getById(eventId),
    enabled: !!eventId,
  });

  const event = data?.data.event;

  const isJoined = isAuthenticated && user && event?.attendees.includes(user._id);
  const isFull = event && event.maxAttendees > 0 && event.attendees.length >= event.maxAttendees;
  const isPast = event && new Date(event.endDate) < new Date();

  const joinMutation = useMutation({
    mutationFn: () => eventAPI.join(eventId),
    onSuccess: () => {
      toast.success('Successfully joined the event!');
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to join event');
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => eventAPI.leave(eventId),
    onSuccess: () => {
      toast.success('Left the event.');
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to leave event');
    },
  });

  const handleAction = () => {
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

  const isActionLoading = joinMutation.isPending || leaveMutation.isPending;

  if (isLoading) {
    return (
      <div className="relative min-h-screen pt-24 pb-16">
        <MeshGradientBg variant="subtle" className="fixed inset-0" interactive={false} />
        <div className="relative z-10 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="relative min-h-screen pt-24 pb-16">
        <MeshGradientBg variant="subtle" className="fixed inset-0" interactive={false} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/events')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <MeshGradientBg variant="subtle" className="fixed inset-0" interactive={false} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => router.push('/events')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <Card className="overflow-hidden">
          {event.imageUrl && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg text-muted-foreground">{event.excerpt}</p>
              </div>
              <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                {event.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{format(new Date(event.startDate), 'MMMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Attendees</p>
                  <p className="font-medium">
                    {event.attendees.length}
                    {event.maxAttendees > 0 ? ` / ${event.maxAttendees}` : ''} Attending
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Organizer</h3>
              <p className="text-muted-foreground">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{event.organizer.email}</p>
            </div>

            <div className="pt-6 border-t">
              <Button 
                className="w-full md:w-auto md:min-w-[200px]" 
                size="lg"
                onClick={handleAction}
                disabled={isActionLoading || (isFull && !isJoined) || isPast}
                variant={isJoined ? "outline" : "default"}
              >
                {isActionLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {isPast ? "Event Ended" : 
                 isJoined ? "Leave Event" : 
                 isFull ? "Event Full" : 
                 "Join Event"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
