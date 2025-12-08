# Timeline Feature Documentation

## Overview
A professional, dark-themed timeline component inspired by modern order tracking interfaces. Displays member achievements, milestones, and career progression with smooth hover animations and detailed expandable cards.

## Features

### Visual Design
- **Professional Dark Card Style**: Inspired by modern e-commerce order details
- **Vertical Timeline**: Year badges on the left with connecting gradient line
- **Smooth Animations**: 500ms transitions with scale, translate, and rotate effects
- **Expandable Details**: Rich content sections that expand smoothly on hover
- **Sectioned Content**: Clear hierarchy with headers, stats, and detailed breakdowns

### Timeline Categories
Each event can be categorized as:
- `achievement` - Personal accomplishments (Star icon)
- `project` - Major projects completed (Briefcase icon)
- `milestone` - Career milestones (Rocket icon)
- `award` - Awards and recognitions (Award icon)
- `education` - Educational achievements (GraduationCap icon)

### Hover Interactions
When hovering over a timeline event:
1. **Year Badge**: Scales to 115%, rotates 5°, fills with accent color, and adds glow shadow
2. **Card Movement**: Slides right 16px and up 4px for depth effect
3. **Border & Shadow**: Changes to accent color with multi-layer shadow and inner glow
4. **Icon Animation**: Rotates 8°, scales to 110%, and adds shadow
5. **Chevron Indicator**: Rotates 180° and gets accent background
6. **Details Section**: Expands to show full content with gradient divider
7. **Detail Items**: Slide in from top with 100ms stagger, each in bordered container
8. **Footer Stats**: Shows count and category badge

### Card Structure (Expanded)
- **Header Section**: Icon, title, year, category, and expand indicator
- **Description**: Brief overview of the achievement
- **Details Section** (on hover):
  - Section header with icon and gradient divider
  - Individual achievement cards with check icons
  - Footer with statistics and category badge

## Usage

### 1. Add Timeline Data to Member
In `organizationData.ts`, add timeline array to any member:

```typescript
{
  id: '1',
  name: 'Alexandra Chen',
  // ... other fields
  timeline: [
    {
      year: '2025',
      title: 'Elected as President',
      description: 'Led organization to new heights',
      category: 'milestone',
      details: [
        'Increased membership by 40%',
        'Launched 3 new programs',
        'Secured $50K in sponsorships'
      ]
    },
    // ... more events
  ]
}
```

### 2. Timeline Component Props
```typescript
interface TimelineProps {
  events: TimelineEvent[];
  accentColor: string; // Hex color for theming
}
```

### 3. Integration
The timeline is automatically displayed on member profile pages when timeline data exists.

## Data Structure

```typescript
interface TimelineEvent {
  year: string;              // Display year (e.g., '2025')
  title: string;             // Event title
  description: string;       // Brief description
  category: 'achievement' | 'project' | 'milestone' | 'award' | 'education';
  details?: string[];        // Optional detailed points (shown on hover)
}
```

## Styling
- Responsive design works on all screen sizes
- Uses Tailwind CSS for styling
- Inline styles for dynamic theming with organization colors
- CSS-in-JS for keyframe animations

## Animation Details
- **Duration**: 300ms for most transitions
- **Easing**: ease-out for natural feel
- **Stagger**: 100ms delay between detail items
- **Transform**: translateX, scale, and rotate effects

## Example Members with Timeline
Currently implemented with detailed, organization-focused content:

### Alexandra Chen (ICT-SF President) - 5 events
- 2025: Elected as President (40% membership growth, $50K sponsorships)
- 2024: National Hackathon Champion (AI sustainability platform)
- 2023: ML Research Publication (15+ citations, ICML presentation)
- 2022: Joined ICT-SF (Built mentorship program, 60% engagement growth)
- 2021: Started CS Degree (3.95 GPA, full scholarship, founded study group)

### Marcus Rodriguez (ICT-SF VP) - 4 events
- 2025: VP Operations & Security (60% incident reduction, ISO 27001)
- 2024: Cybersecurity Certifications (CompTIA Security+, CEH)
- 2023: Campus Security Audit (30+ vulnerabilities fixed, $200K saved)
- 2022: Joined Security Committee (CTF competition, 500+ students trained)

### Sarah Kim (ICT-SF Technical Lead) - 4 events
- 2025: Technical Lead (12 workshops, 400+ students, modern tech stack)
- 2024: AWS Cloud Migration (40% cost reduction, 99.9% uptime)
- 2023: Full-Stack Intern (5 production features, 50K+ users)
- 2022: Started CS Degree (3.9 GPA, founded Web Dev Club)

## Design Inspiration
Based on modern dark-themed order tracking interfaces with:
- Professional card layouts
- Clear information hierarchy
- Sectioned content with dividers
- Stats and metadata display
- Smooth, polished interactions

## Future Enhancements
- Add filtering by category (achievement, project, milestone, award, education)
- Add search functionality across all timeline events
- Add date ranges and specific dates instead of just years
- Add images/media attachments to timeline events
- Add export to PDF feature for portfolio use
- Add timeline comparison between members
- Add interactive timeline visualization
