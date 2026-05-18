'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { eventAPI } from '@/lib/api/event';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Loader2, ArrowLeft, Info } from 'lucide-react';
import { format } from 'date-fns';
import MeshGradientBg from '@/components/ripplebg';
import Image from 'next/image';
import { StructuredContent } from '@/components/StructuredContent';
import ScrollingGallery from '@/components/ScrollingGallery';
import { getOwnershipLabel } from '@/lib/content-ownership';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventAPI.getById(eventId),
    enabled: !!eventId,
    staleTime: 0,
  });

  const event = data?.data.event;
  const isPast = event && new Date(event.endDate) < new Date();
  const heroImage = event?.coverImage?.imageUrl || event?.imageUrl;
  const bodyHtml = event?.bodyHtml || event?.description || '';

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
              The event you&apos;re looking for doesn&apos;t exist or has been removed.
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
          {heroImage && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={heroImage}
                alt={event.coverImage?.alt || event.title}
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
              <div className="flex flex-col items-end gap-2">
                <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                  {event.status}
                </Badge>
                <Badge variant="outline">
                  {getOwnershipLabel(event)}
                </Badge>
              </div>
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
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="font-medium">
                    {event.attendees.length}
                    {event.maxAttendees > 0 ? ` / ${event.maxAttendees}` : ''} Interested
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <StructuredContent bodyHtml={bodyHtml} sections={event.sections} />
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

            {event.schedule && event.schedule.length > 0 ? (
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Program Flow</h3>
                <div className="space-y-3">
                  {event.schedule.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-primary">{item.label}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.description ? (
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {event.gallery && event.gallery.length > 0 ? (
              <div className="pt-6 border-t">
                <ScrollingGallery
                  images={event.gallery.map((image) => image.imageUrl)}
                  accentColor="#2563eb"
                />
              </div>
            ) : null}

            <div className="pt-6 border-t">
              <div className="rounded-xl border bg-secondary/20 p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  Event participation
                </div>
                <p>
                  {isPast
                    ? 'This event has ended. Public registration is not part of the current MVP.'
                    : 'Public event registration is not part of the current MVP yet. Please contact the event organizer or CICT admin for participation details.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
