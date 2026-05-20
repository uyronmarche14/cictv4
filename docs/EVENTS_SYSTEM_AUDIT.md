# Events System Audit

Last updated: 2026-05-20

## Purpose

This document captures the current event feature set across backend, admin, and public surfaces, along with the biggest data and function gaps that still block a complete student-organization event workflow.

## Current event surfaces

- Public list page: `/events`
- Public detail page: `/events/[id]`
- Admin event management: `/admin/events`
- Backend model/controller/routes: `cict-backend/src/models/Event.ts`, `cict-backend/src/controllers/event.controller.ts`, `cict-backend/src/routes/event.routes.ts`

## What already works

- Events have core editorial data:
  `title`, `content`, `excerpt`, `startDate`, `endDate`, `location`, `status`, `tags`, `sections`, `coverImage`, `gallery`, `schedule`, `maxAttendees`.
- Events support ownership fields:
  `ownerType` and `organizationId`.
- Admins can create, edit, publish, archive, and delete events.
- Public event cards and detail pages already support:
  cover image, summary text, date/time display, location, gallery, schedule blocks, and related organization labeling.
- The backend already supports `isRegistrationOpen`.

## Current code anchors

- Public list page fetch: `/home/ronmarche14/projects/CICT/cictv4/src/app/events/page.tsx`
- Public detail page: `/home/ronmarche14/projects/CICT/cictv4/src/app/events/[id]/page.tsx`
- Event card: `/home/ronmarche14/projects/CICT/cictv4/src/components/events/EventCard.tsx`
- Admin create form: `/home/ronmarche14/projects/CICT/cictv4/src/components/admin/EventForm.tsx`
- Admin edit form: `/home/ronmarche14/projects/CICT/cictv4/src/components/admin/EditEventForm.tsx`
- Schedule editor: `/home/ronmarche14/projects/CICT/cictv4/src/components/admin/EventScheduleEditor.tsx`
- Backend model: `/home/ronmarche14/projects/CICT/cict-backend/src/models/Event.ts`
- Backend controller: `/home/ronmarche14/projects/CICT/cict-backend/src/controllers/event.controller.ts`
- Backend routes: `/home/ronmarche14/projects/CICT/cict-backend/src/routes/event.routes.ts`

## Current gaps

### 1. Upcoming logic is incomplete

The public `/events` page is framed as an upcoming-events page, but it currently fetches all published events instead of future-only events. The UI can already detect whether an event is past, so the display and the data query are not aligned.

### 2. Registration flow is only partial

- The backend stores `isRegistrationOpen`.
- The admin forms do not expose that field.
- Join/leave routes exist, but the controller currently returns a disabled response.
- The public event detail page explicitly says registration is not part of the MVP.

This means the platform looks like it supports participation tracking, but that flow is not actually live end to end.

### 3. The model is still too narrow for real campus events

The current schema does not yet support many details usually needed for student organization events:

- Registration link
- Registration deadline
- Contact person
- Host and co-host organizations
- Speakers, panelists, judges, facilitators
- Target audience or eligibility
- Event fee or free/paid state
- Certificate availability
- Exact venue details such as building, room, floor
- Map link
- Livestream or meeting link
- Required materials or dress code
- Attachment support for posters, PDFs, forms, waivers, and mechanics

### 4. Admin filtering is lighter than backend support

The backend supports event query behavior such as `status`, search, and upcoming filtering, but the admin event screen still has a narrower control set. That makes event management harder as the volume grows.

### 5. Organization event presentation is not fully dynamic

There is an older organization event section that fabricates display values such as date and attendees, and the current live organization page does not render that section. Organizations therefore do not have a strong native event showcase on their own public page.

## Missing data to add next

### Event profile data

- `registrationUrl`
- `registrationDeadline`
- `contactName`
- `contactEmail`
- `contactPhone`
- `hostOrganizationIds`
- `coHostOrganizationIds`
- `speakerItems`
- `audience`
- `eligibility`
- `feeLabel`
- `certificateInfo`
- `venueDetails`
- `mapUrl`
- `meetingUrl`
- `requirements`
- `attachmentItems`
- `posterCaption`

### Event operations data

- Registration capacity by slot or ticket type
- Waitlist support
- Attendance status
- Check-in status
- RSVP source tracking
- Event visibility rules

## Missing functions

- Future-only event listing for the public page
- Real registration open/close control in admin
- Working RSVP or interested flow
- Rich event filters on public pages
- Rich event filters on admin pages
- Better event ordering in shared feeds based on event schedule, not only creation time
- Native organization event section on public organization pages

## Priority recommendations

1. Align the public `/events` query with the page promise of upcoming events.
2. Decide whether registration is truly in scope; if yes, finish it end to end.
3. Expand the event schema for real student-organization workflows.
4. Restore a real organization event showcase using live event data.
5. Improve search, filtering, and schedule-based ranking across the event surfaces.
