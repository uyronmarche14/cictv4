# Timeline Component - Design Specification

## Design Philosophy
The timeline component follows a **professional dark card design** inspired by modern e-commerce order tracking interfaces, providing a clean, detailed view of member achievements and milestones.

## Visual Hierarchy

### 1. Year Badge (Left Side)
```
┌─────────────┐
│             │
│    2025     │  ← Bold year text
│             │
└─────────────┘
```
- **Size**: 64px × 64px circle
- **States**:
  - Default: White background, accent border, accent text
  - Hover: Accent background, white text, 15% scale + 5° rotation
- **Shadow**: Subtle → Glowing accent shadow on hover

### 2. Card Structure
```
┌────────────────────────────────────────────────────┐
│  [Icon]  Title                        [Chevron]    │
│          Year • Category                           │
│          Description text...                       │
├────────────────────────────────────────────────────┤ ← Expands on hover
│  KEY ACHIEVEMENTS & IMPACT                         │
│  ─────────────────────────────────────────────     │
│                                                    │
│  ✓  Achievement detail 1                          │
│  ✓  Achievement detail 2                          │
│  ✓  Achievement detail 3                          │
│  ✓  Achievement detail 4                          │
│  ✓  Achievement detail 5                          │
│                                                    │
│  ─────────────────────────────────────────────     │
│  5 key highlights              [Category Badge]    │
└────────────────────────────────────────────────────┘
```

## Component Sections

### Header (Always Visible)
1. **Icon Box** (Left)
   - 56px × 56px rounded square
   - Accent color background (15% opacity)
   - Category-specific icon
   - Rotates 8° and scales on hover

2. **Content** (Center)
   - **Title**: Large, bold, foreground color
   - **Meta**: Small text with calendar icon, year, and category
   - **Description**: Muted text, concise overview

3. **Expand Indicator** (Right)
   - Chevron down icon
   - Rotates 180° on hover
   - Gets accent background on hover

### Details Section (Expands on Hover)
1. **Section Header**
   - Trending up icon + "KEY ACHIEVEMENTS & IMPACT" label
   - Gradient divider line (accent → transparent)

2. **Achievement Cards**
   - Individual bordered containers
   - Check circle icon (accent color)
   - Detailed achievement text
   - Slide in from top with stagger

3. **Footer Stats**
   - Count of highlights
   - Category badge

## Animation Specifications

### Timing
- **Duration**: 500ms for all transitions
- **Easing**: ease-out for natural feel
- **Stagger**: 100ms between detail items

### Transforms
```css
/* Year Badge */
scale(1) → scale(1.15)
rotate(0deg) → rotate(5deg)

/* Card */
translateX(0) translateY(0) → translateX(16px) translateY(-4px)

/* Icon */
rotate(0) scale(1) → rotate(8deg) scale(1.1)

/* Chevron */
rotate(0deg) → rotate(180deg)

/* Details */
maxHeight: 0 → maxHeight: 600px
opacity: 0 → opacity: 1
```

### Shadows
```css
/* Default */
box-shadow: 0 2px 8px rgba(0,0,0,0.04)

/* Hover */
box-shadow: 
  0 24px 48px -12px ${accent}25,
  0 0 0 1px ${accent}30,
  inset 0 1px 0 0 ${accent}10
```

## Color System

### Accent Color Usage
- **10% opacity**: Borders, subtle backgrounds
- **15% opacity**: Icon backgrounds, hover states
- **20-30% opacity**: Shadows, glows
- **40% opacity**: Gradient stops
- **100% opacity**: Text, filled states

### Text Hierarchy
- **Foreground**: Titles, important text
- **Muted**: Descriptions, metadata
- **Accent**: Category labels, icons

## Responsive Behavior
- Timeline maintains vertical layout on all screens
- Cards stack naturally with consistent spacing
- Text wraps appropriately in narrow viewports
- Touch devices: Tap to expand instead of hover

## Content Guidelines

### Title (Required)
- Clear, action-oriented
- 3-8 words ideal
- Example: "Elected as ICT-SF President"

### Description (Required)
- Brief overview, 10-20 words
- Provides context without details
- Example: "Led organization to unprecedented growth..."

### Details (Optional, 3-5 items)
- Specific, measurable achievements
- Include numbers, percentages, impact
- Each item: 10-25 words
- Example: "Increased active membership from 250 to 350 members (40% growth)"

## Category Icons
- `achievement`: Star ⭐
- `project`: Briefcase 💼
- `milestone`: Rocket 🚀
- `award`: Award 🏆
- `education`: Graduation Cap 🎓

## Accessibility
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels for interactive elements
- Sufficient color contrast ratios
- Focus indicators on interactive elements

## Performance
- CSS transforms for smooth animations
- GPU-accelerated properties (transform, opacity)
- No layout thrashing
- Efficient re-renders with React state
- Lazy loading for images (if added)
