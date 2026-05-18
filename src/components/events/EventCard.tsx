'use client';

import { Event } from '@/lib/api/event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getOwnershipLabel } from '@/lib/content-ownership';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const isPast = new Date(event.endDate) < new Date();

  const handleCardClick = () => {
    router.push(`/events/${event._id}`);
  };

  return (
    <Card
      className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full bg-gray-100">
        {event.coverImage?.imageUrl || event.imageUrl ? (
          <Image
            src={event.coverImage?.imageUrl || event.imageUrl || ''}
            alt={event.coverImage?.alt || event.title}
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
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
            {getOwnershipLabel(event)}
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
          {event.excerpt || event.description || event.bodyHtml.replace(/<[^>]+>/g, ' ')}
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
              {event.maxAttendees > 0 ? ` / ${event.maxAttendees}` : ''} Interested
            </span>
          </div>
        </div>

        {event.gallery?.length ? (
          <p className="text-xs text-muted-foreground">
            {event.gallery.length} gallery image{event.gallery.length > 1 ? 's' : ''}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="pt-4 border-t">
        <Button className="w-full" variant="outline">
          <Info className="w-4 h-4 mr-2" />
          {isPast ? 'View Event Summary' : 'Registration Coming Soon'}
        </Button>
      </CardFooter>
    </Card>
  );
}
