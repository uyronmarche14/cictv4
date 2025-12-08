'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventAPI, Event } from '@/lib/api/event';
import { EventForm } from '@/components/admin/EventForm';
import { EditEventForm } from '@/components/admin/EditEventForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Edit, MapPin, Users } from "lucide-react";
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AdminEventsPage() {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin', 'events'],
    queryFn: () => eventAPI.getAll({ limit: 100 }), // Fetch all for admin
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
        await eventAPI.delete(id);
        toast.success('Event deleted');
        refetch();
    } catch (error) {
        toast.error('Failed to delete event');
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const activeEvents = data?.data.events || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage upcoming and past events
          </p>
        </div>
        <EventForm onSuccess={refetch} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : activeEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  activeEvents.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {event.title}
                      </TableCell>
                      <TableCell>
                         <div className="flex flex-col text-sm">
                            <span>{format(new Date(event.startDate), 'MMM dd, yyyy')}</span>
                            <span className="text-muted-foreground">{format(new Date(event.startDate), 'h:mm a')}</span>
                         </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                          <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              {event.location}
                          </div>
                      </TableCell>
                      <TableCell>
                          <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              {event.attendees.length}
                          </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                            event.status === 'published' ? 'default' : 
                            event.status === 'draft' ? 'secondary' : 'outline'
                        }>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEdit(event)}
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(event._id)}
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            </div>
        </CardContent>
      </Card>

      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          open={!!editingEvent}
          onOpenChange={(open) => !open && setEditingEvent(null)}
          onSuccess={() => {
            refetch();
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}
