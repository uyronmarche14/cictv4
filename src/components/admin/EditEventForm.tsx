'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventAPI, Event } from '@/lib/api/event';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { ContentSectionsEditor } from '@/components/admin/ContentSectionsEditor';
import { EventScheduleEditor } from '@/components/admin/EventScheduleEditor';
import {
  ContentOwnerType,
  ContentSection,
  EventScheduleItem,
  MediaAsset,
  Organization,
  Permission,
} from '@/types';
import { uploadsAPI } from '@/lib/api/uploads';
import { organizationService } from '@/services/organizationService';
import { useAuth } from '@/context/AuthContext';
import { usePermissions } from '@/hooks/permissions/use-permissions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sanitizeCoverAndGallery } from '@/lib/media';

const parseDateTimeLocalValue = (value: string): number => new Date(value).getTime();

const formatDateTimeLocal = (value: string | Date): string => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formSchema = z
  .object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    bodyHtml: z.string().min(10, 'Description must be at least 10 characters'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(200, 'Excerpt too long'),
    startDate: z.string().refine((val) => !isNaN(parseDateTimeLocalValue(val)), 'Invalid start date'),
    endDate: z.string().refine((val) => !isNaN(parseDateTimeLocalValue(val)), 'Invalid end date'),
    location: z.string().min(2, 'Location is required'),
    maxAttendees: z.string().transform((val) => (val === '' ? undefined : parseInt(val, 10))).optional(),
    tags: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const start = parseDateTimeLocalValue(values.startDate);
    const end = parseDateTimeLocalValue(values.endDate);

    if (!isNaN(start) && !isNaN(end) && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endDate'],
        message: 'End date/time must be the same as or later than the start date/time',
      });
    }
  });

interface EditEventFormProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
type InputFieldProps = React.ComponentProps<typeof Input>;
type RichTextFieldProps = { value: string; onChange: (value: string) => void };
type NumericFieldProps = Omit<React.ComponentProps<typeof Input>, 'onChange'> & {
  onChange: (value: string) => void;
};

export function EditEventForm({ event, open, onOpenChange, onSuccess }: EditEventFormProps) {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const canManageSystemOwnedContent = hasPermission(Permission.EDIT_EVENT);
  const scopedManageOrganizationIds = useMemo(
    () =>
      Array.from(
        new Set(
          (user?.organizationAssignments ?? [])
            .filter((assignment) => assignment.permissions.includes(Permission.EDIT_EVENT))
            .map((assignment) => assignment.organizationId)
        )
      ),
    [user?.organizationAssignments]
  );
  const [ownerType, setOwnerType] = useState<ContentOwnerType>(event.ownerType);
  const [organizationId, setOrganizationId] = useState(event.organizationId ?? '');
  const [coverImage, setCoverImage] = useState<MediaAsset | undefined>(
    event.coverImage ?? (event.imageUrl ? { imageUrl: event.imageUrl, alt: event.title } : undefined)
  );
  const [gallery, setGallery] = useState<MediaAsset[]>(event.gallery ?? []);
  const [sections, setSections] = useState<ContentSection[]>(event.sections ?? []);
  const [schedule, setSchedule] = useState<EventScheduleItem[]>(event.schedule ?? []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      bodyHtml: event.bodyHtml || event.description || '',
      excerpt: event.excerpt,
      startDate: formatDateTimeLocal(event.startDate),
      endDate: formatDateTimeLocal(event.endDate),
      location: event.location,
      maxAttendees: event.maxAttendees || undefined,
      tags: event.tags.join(', '),
    },
  });
  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchOrganizations = async () => {
      try {
        const data = await organizationService.getAll();
        setOrganizations(data);
      } catch (error) {
        console.error('Failed to fetch organizations for event ownership:', error);
      }
    };

    fetchOrganizations();
  }, [open]);

  const availableOrganizations = useMemo(() => {
    if (canManageSystemOwnedContent) {
      return organizations;
    }

    const allowedIds = new Set(scopedManageOrganizationIds);

    return organizations.filter((organization) => allowedIds.has(organization.id));
  }, [canManageSystemOwnedContent, organizations, scopedManageOrganizationIds]);

  const selectedOrganizationName =
    organizations.find((organization) => organization.id === organizationId)?.name ?? 'selected organization';

  useEffect(() => {
    form.reset({
      title: event.title,
      bodyHtml: event.bodyHtml || event.description || '',
      excerpt: event.excerpt,
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      location: event.location,
      maxAttendees: event.maxAttendees || undefined,
      tags: event.tags.join(', '),
    });
    setCoverImage(event.coverImage ?? (event.imageUrl ? { imageUrl: event.imageUrl, alt: event.title } : undefined));
    setGallery(event.gallery ?? []);
    setSections(event.sections ?? []);
    setSchedule(event.schedule ?? []);
    setOwnerType(event.ownerType);
    setOrganizationId(event.organizationId ?? '');
  }, [event, form]);

  useEffect(() => {
    if (ownerType === ContentOwnerType.SYSTEM) {
      setOrganizationId('');
      return;
    }

    if (!organizationId && availableOrganizations.length > 0) {
      setOrganizationId(availableOrganizations[0].id);
    }
  }, [ownerType, organizationId, availableOrganizations]);

  useEffect(() => {
    if (!coverImage || gallery.length === 0) {
      return;
    }

    const { gallery: sanitizedGallery, removedDuplicates } = sanitizeCoverAndGallery(
      coverImage,
      gallery
    );

    if (removedDuplicates > 0) {
      setGallery(sanitizedGallery);
      toast.info('Matching gallery images were removed because the cover image is reserved for the page hero.');
    }
  }, [coverImage, gallery]);

  const handleCoverImageChange = async (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
    const file = inputEvent.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const [uploadedImage] = await uploadsAPI.uploadImages([file]);
      setCoverImage(uploadedImage);
    } catch (error) {
      console.error('Failed to upload cover image:', error);
    } finally {
      setUploadingCover(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (ownerType === ContentOwnerType.ORGANIZATION && !organizationId) {
        toast.error('Select the organization that should own this event.');
        setIsLoading(false);
        return;
      }

      const { gallery: sanitizedGallery, removedDuplicates } = sanitizeCoverAndGallery(
        coverImage,
        gallery
      );
      if (removedDuplicates > 0) {
        setGallery(sanitizedGallery);
        toast.info('Duplicate gallery images matching the cover image were removed automatically.');
      }

      await eventAPI.update(event._id, {
        title: values.title,
        bodyHtml: values.bodyHtml,
        description: values.bodyHtml,
        excerpt: values.excerpt,
        ownerType,
        organizationId: ownerType === ContentOwnerType.ORGANIZATION ? organizationId : null,
        startDate: values.startDate,
        endDate: values.endDate,
        location: values.location,
        maxAttendees: typeof values.maxAttendees === 'number' ? values.maxAttendees : undefined,
        tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
        coverImage,
        imageUrl: coverImage?.imageUrl,
        imageId: coverImage?.imageId,
        gallery: sanitizedGallery,
        sections,
        schedule,
      });
      toast.success('Event updated successfully');
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Failed to update event:', error);
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
          ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
          : 'Failed to update event';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: InputFieldProps }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech Summit 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel>Content Ownership</FormLabel>
                <Select
                  value={ownerType}
                  onValueChange={(value) => setOwnerType(value as ContentOwnerType)}
                  disabled={!canManageSystemOwnedContent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    {canManageSystemOwnedContent ? (
                      <SelectItem value={ContentOwnerType.SYSTEM}>System-owned</SelectItem>
                    ) : null}
                    <SelectItem value={ContentOwnerType.ORGANIZATION}>Organization-owned</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Organization pages only surface published organization-owned events. Use system-owned only for college-wide events.
                </p>
              </div>
              {ownerType === ContentOwnerType.ORGANIZATION ? (
                <div className="space-y-2">
                  <FormLabel>Publish To Organization</FormLabel>
                  <Select value={organizationId} onValueChange={setOrganizationId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableOrganizations.map((organization) => (
                        <SelectItem key={organization.id} value={organization.id}>
                          {organization.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm">
              <p className="font-medium text-foreground">
                {ownerType === ContentOwnerType.SYSTEM
                  ? 'This event will appear as a system-wide CICT event after approval and publication.'
                  : `This event will appear under ${selectedOrganizationName} after approval and publication.`}
              </p>
              <p className="mt-1 text-muted-foreground">
                Pick organization-owned content for events that should show up on student organization tabs and organization homepages.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }: { field: InputFieldProps }) => (
                  <FormItem>
                    <FormLabel>Start Date/Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }: { field: InputFieldProps }) => (
                  <FormItem>
                    <FormLabel>End Date/Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }: { field: InputFieldProps }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Auditorium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAttendees"
                render={({ field }: { field: NumericFieldProps }) => (
                  <FormItem>
                    <FormLabel>Max Attendees</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0 for unlimited"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(changeEvent) => field.onChange(changeEvent.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }: { field: InputFieldProps }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bodyHtml"
              render={({ field }: { field: RichTextFieldProps }) => (
                <FormItem>
                  <FormLabel>Event Body</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write the event details..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }: { field: InputFieldProps }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="career, workshop, seminar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ContentSectionsEditor sections={sections} onChange={setSections} />
            <EventScheduleEditor schedule={schedule} onChange={setSchedule} />
            <div className="space-y-3">
              <FormLabel>Cover Image</FormLabel>
              <p className="text-xs text-muted-foreground">
                The cover image is the hero image used on cards and detail pages. Do not reuse it as a gallery image.
              </p>
              <Input type="file" accept="image/*" onChange={handleCoverImageChange} />
              {uploadingCover ? <p className="text-sm text-muted-foreground">Uploading cover image...</p> : null}
              {coverImage ? (
                <div className="overflow-hidden rounded-md border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage.imageUrl} alt={coverImage.alt} className="h-56 w-full object-cover" />
                </div>
              ) : null}
            </div>
            <GalleryManager
              label="Supporting Gallery"
              coverImage={coverImage}
              gallery={gallery}
              onChange={setGallery}
              onDuplicateRemoval={() =>
                toast.info('Matching gallery images were removed because the cover image is reserved for the page hero.')
              }
            />
            <p className="text-xs text-muted-foreground">
              Gallery images appear below the event details as supporting media only. The system removes any gallery image that duplicates the cover image.
            </p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Update Event
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
