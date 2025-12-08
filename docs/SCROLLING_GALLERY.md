# Scrolling Gallery Component

## Overview
An animated photo gallery with three horizontal rows that scroll in alternating directions (left-right-left), featuring smooth fade effects at the edges and hover interactions.

## Features

### Visual Design
- **Three Rows**: Images distributed across 3 horizontal scrolling rows
- **Alternating Directions**: 
  - Row 1: Scrolls left (40s duration)
  - Row 2: Scrolls right (40s duration)
  - Row 3: Scrolls left (50s duration - slower)
- **Edge Fade Effect**: Gradient overlays on left and right edges
- **Hover Effects**: 
  - Images scale 110% on hover
  - Gradient overlay appears with accent color
  - Animation pauses when hovering over any row

### Animation Specifications

#### Scroll Animations
```css
/* Row 1 & 3 - Scroll Left */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

/* Row 2 - Scroll Right */
@keyframes scroll-right {
  0% { transform: translateX(-33.333%); }
  100% { transform: translateX(0); }
}
```

#### Timing
- **Row 1**: 40s linear infinite
- **Row 2**: 40s linear infinite (opposite direction)
- **Row 3**: 50s linear infinite (slower pace)
- **Hover**: Animation pauses on hover

#### Infinite Scroll
- Images are duplicated 3x to create seamless loop
- Animation resets at 33.333% (1/3 of total width)
- No visible jump or gap in the scroll

### Image Cards

#### Dimensions
- **Mobile Width**: 320px (20rem)
- **Desktop Width**: 384px (24rem)
- **Mobile Height**: 224px (14rem)
- **Desktop Height**: 256px (16rem)
- **Gap**: 24px between cards
- **Border Radius**: 16px (rounded-2xl)

#### Styling
- Border: 3px solid with accent color at 25% opacity
- Shadow: Large shadow for depth (shadow-lg)
- Hover scale: 110%
- Transition: 700ms ease for smooth scaling

#### Hover Overlay
- Gradient from accent color (70% opacity) to transparent at 60%
- Fades in over 500ms
- Positioned from bottom to top
- More prominent and dramatic effect

### Edge Fade Overlays

#### Left Edge
```css
position: absolute;
left: 0;
width: 192px mobile / 256px desktop (12rem / 16rem);
background: linear-gradient(to right, background, background/80, transparent);
z-index: 10;
```

#### Right Edge
```css
position: absolute;
right: 0;
width: 192px mobile / 256px desktop (12rem / 16rem);
background: linear-gradient(to left, background, background/80, transparent);
z-index: 10;
```

### Full-Screen Layout
The gallery uses viewport width (100vw) to break out of the container:
```css
width: 100vw;
left: 50%;
right: 50%;
margin-left: -50vw;
margin-right: -50vw;
```
This creates a true edge-to-edge experience.

## Component Props

```typescript
interface ScrollingGalleryProps {
  images: string[];      // Array of Cloudinary image URLs
  accentColor: string;   // Hex color for theming (borders, overlays)
}
```

## Usage

### 1. Add Gallery Images to Member Data
```typescript
{
  id: '1',
  name: 'Alexandra Chen',
  // ... other fields
  gallery: [
    'cloudinary-url-1',
    'cloudinary-url-2',
    'cloudinary-url-3',
    // ... 6-12 images recommended
  ]
}
```

### 2. Integration in Page
```tsx
{member.gallery && member.gallery.length > 0 && (
  <div className="mb-20">
    <ScrollingGallery 
      images={member.gallery} 
      accentColor={organization.color.primary} 
    />
  </div>
)}
```

### 3. Full-Screen Implementation
The component automatically breaks out of its container using viewport width calculations. No negative margins needed - it handles full-screen layout internally with:
- Background gradient for visual separation
- Larger fade overlays for smooth edges
- Responsive padding and spacing

## Image Distribution

The component automatically distributes images across three rows:

```typescript
// Row 1: First third of images
const row1Images = images.slice(0, Math.ceil(images.length / 3));

// Row 2: Middle third of images
const row2Images = images.slice(
  Math.ceil(images.length / 3), 
  Math.ceil(images.length * 2 / 3)
);

// Row 3: Last third of images
const row3Images = images.slice(Math.ceil(images.length * 2 / 3));
```

## Recommended Image Count
- **Minimum**: 6 images (2 per row)
- **Optimal**: 9-12 images (3-4 per row)
- **Maximum**: No limit, but 15-18 images work best

## Performance Optimizations

### Cloudinary Integration
- Uses `next-cloudinary` for optimized image loading
- Automatic format selection (WebP, AVIF)
- Responsive sizing with `sizes="256px"`
- Lazy loading for off-screen images

### CSS Animations
- GPU-accelerated transforms
- No layout thrashing
- Efficient infinite loop with duplication
- Smooth 60fps animations

### Interaction
- Pause on hover prevents motion sickness
- Smooth transitions for accessibility
- No JavaScript scroll calculations

## Accessibility

### Motion Preferences
Consider adding:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-scroll-left,
  .animate-scroll-right,
  .animate-scroll-left-slow {
    animation: none;
  }
}
```

### Keyboard Navigation
- Images are not interactive by default
- Can be enhanced with click handlers for lightbox
- Focus indicators if made interactive

## Responsive Behavior

### Mobile
- Gallery extends full width with negative margins
- Fade overlays scale proportionally
- Touch devices: Scroll continues (no hover pause)

### Tablet & Desktop
- Full-width gallery with edge fades
- Hover interactions work smoothly
- Multiple rows visible simultaneously

## Customization Options

### Speed Adjustment
Change animation duration in the component:
```tsx
animation: scroll-left 40s linear infinite;  // Faster
animation: scroll-left 60s linear infinite;  // Slower
```

### Row Count
Currently 3 rows, can be modified to 2 or 4 by adjusting the distribution logic.

### Image Dimensions
Current responsive dimensions:
```tsx
className="w-80 h-56 md:w-96 md:h-64"  // Current: 320x224px mobile, 384x256px desktop
```

Alternative sizes:
```tsx
className="w-72 h-48 md:w-80 md:h-56"  // Smaller: 288x192px mobile, 320x224px desktop
className="w-96 h-64 md:w-[28rem] md:h-72"  // Larger: 384x256px mobile, 448x288px desktop
```

## Example Members with Gallery
- **Alexandra Chen**: 9 images
- **Marcus Rodriguez**: 9 images  
- **Sarah Kim**: 9 images

## Future Enhancements
- Add lightbox/modal for full-size image viewing
- Add image captions on hover
- Add filtering by event/category
- Add manual scroll controls
- Add progress indicators
- Add image upload interface for admins
- Add lazy loading for better performance
- Add skeleton loaders while images load
